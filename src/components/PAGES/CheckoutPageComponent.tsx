"use client";
import Label from "@/components/Label/Label";
import Prices from "@/components/Prices";
import { Product } from "@/data/data";
import { useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ContactInfo from "@/app/checkout/ContactInfo";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import Moysar from "@/components/payment/Moysar";
import Tabby from "@/app/checkout/tabby";
import TabbyIcon from "@/images/icons/Tabby.png";
import { renderTotalPrice_ } from "@/utils/adjustNames";
import _axios from "@/contains/api/axios";
import { useSession } from "next-auth/react";
import DeleveryForm from "@/components/payment/FromStorePayment";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useRouter } from "next/navigation";
import usePoints from "@/app/checkout/usePoints";
import { sendEvent } from "@/utils/firebase";
import { facebookPixel, tiktokPixel, twitterPixel } from "@/utils/pixels";
import Tamarra from "../Tamarra";

const CheckoutPageComponent = () => {
  const { items, emptyCart } = useCart();
  const getTotalQty = (list: any) => {
    let totalQty = 0;
    list.map((item) => (totalQty += item.quantity));
    return totalQty || 1;
  };
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    //@ts-ignore
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deleviryMethods, setDeleviryMethods] = useState("");
  const [paymentMethodsTag, setPaymentMethodsTag] = useState([]);
  const [deleviryMethod, setDeleviryMethod] = useState("Trendy Rose");
  const [storeDeleviryData, setStoreDeleviryData] = useState({
    name: "",
    phone: "",
    deliveryDate: "",
    valid: false,
  });
  const [userNote, setUserNote] = useState<string>("");
  const [payOnDelviery, setPayOnDelviery] = useState(false);
  const [payWithTransfer, setPayWithTransfer] = useState(false);
  const [useUserPoints, setUseUserPoints] = useState<boolean>(false);
  const {
    points,
    redeemData,
    allPaid,
    isAllPaidWithPoints,
    minToApply,
    pointsActive,
  } = usePoints();
  const handleChange = (e: any) => {
    setStoreDeleviryData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [coupon, setCoupon] = useState("");
  const [couponResponse, setCouponResponse] = useState<
    { precent: number } | any
  >({});
  let renderTotalPrice = renderTotalPrice_(
    items,
    couponResponse?.precent,
    redeemData?.amount,
    useUserPoints
  );
  useEffect(() => {
    if (+renderTotalPrice.fintalTotal <= 0 && useUserPoints) {
      isAllPaidWithPoints();
    }
  }, [renderTotalPrice.fintalTotal]);
  const { data: session } = useSession();
  const validateCoupon = async () => {
    //@ts-ignore
    const renderTotalPrice = renderTotalPrice_(items, null);
    await _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon-redeem`,
        {
          code: coupon.trim(),
          amount: +renderTotalPrice.fintalTotal,
        },
        //@ts-ignore
        { session }
      )
      .then((res) => setCouponResponse({ ...res.data, code: coupon.trim() }))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    _axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
      .then((res) => res.data.data)
      .then((data) => {
        let deleviry = data.find(
          (item: { type: string }) => item.type === "delivery"
        );
        let paymentMethods = data.find(
          (item: { type: string }) => item.type === "paymentMethods"
        );
        setDeleviryMethods(deleviry?.items);
        setPaymentMethodsTag(paymentMethods?.items);
      })
      .catch((err) => console.log(err));

    // Moyasar
  }, []);
  const getPrevCouponSession = async () => {
    //@ts-ignore
    const couponResponseSession = sessionStorage.getItem("couponResponse");
    if (couponResponseSession) {
      setCouponResponse(JSON.parse(couponResponseSession));
    }
  };
  const sendAnalticEvenet = () => {
    sendEvent("begin_checkout", {
      currency: "SAR",
      value: parseInt(renderTotalPrice.fintalTotal),
      items: items.map((product, i) => {
        return {
          item_id: `${product?._id}`,
          item_name: product?.name,
          discount: 0,
          index: i,
          item_brand: product?.brand,
          item_category: product?.brand,
          price: +product.price,
          quantity: +product?.quantity,
        };
      }),
    });
    facebookPixel("InitiateCheckout", {
      content_category: "Checkout",
      content_ids: items.map((item) => item?._id),
      contents: JSON.stringify(items),
      content_type: "product_group",
      currency: "SAR",
      num_items: items.length,
    });
    twitterPixel(`tw-${process.env.NEXT_PUBLIC_TWITTER_ID}-oe03v`, {
      value: parseInt(renderTotalPrice.fintalTotal),
      currency: "SAR",
      contents: items.map((product, i) => {
        return {
          content_type: "Product",
          content_id: `${product.id}`,
          content_name: product.name,
          content_price: +product.price,
          num_items: +product.quantity,
        };
      }),
    });
    tiktokPixel("InitiateCheckout", {
      content_category: "Purchase",
      content_id: JSON.stringify(
        items.map((item) => {
          return {
            content_id: item?._id,
          };
        })
      ),
      content_type: "product_group",
      currency: "SAR",
      quantity: items.length,
      value: parseInt(renderTotalPrice.fintalTotal),
    });
  };
  useEffect(() => {
    getPrevCouponSession();
    sendAnalticEvenet();
  }, []);

  const router = useRouter();
  const createCheckoutSession = async () => {
    const id = Math.random().toString(16).slice(2);
    _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-checkout-deleviery/${id}`,
        {
          id: id,
          status: "PROCCESSING",
          amount: +renderTotalPrice.fintalTotal,
          vat: +renderTotalPrice.vat,
          description: JSON.stringify(items),
          amount_format: +renderTotalPrice.fintalTotal.toString(),
          source:
            paymentMethod === "Transfer"
              ? "BANK_TRANSFER"
              : paymentMethod === "Points"
              ? "Points"
              : "Cash_On_Delivery",
          userId: session?.user?._id,
          couponResponse: JSON.stringify({
            ...couponResponse,
            deductedAmount: +renderTotalPrice?.deductedAmount,
          }),
          ShippingType: deleviryMethod,
          ShippingInfo: await storeDeleviryData,
          userNote: userNote,
          pointsUsed: redeemData?.point,
        },
        //@ts-ignore
        { session }
      )
      .then((res) => {
        emptyCart();
        router.push(`/account-order?from=checkout`);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (payOnDelviery) {
      setPayWithTransfer(false);
    }
    if (payWithTransfer) {
      setPayOnDelviery(false);
    }
  }, [payOnDelviery, payWithTransfer]);
  useEffect(() => {
    // Moyasar
    //@ts-ignore
    const styleScript = document.createElement("link");
    styleScript.rel = "stylesheet";
    styleScript.href = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.css";
    //@ts-ignore
    const jsScript = document.createElement("script");
    jsScript.src = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.js";
    //@ts-ignore
    const jsPayScript = document.createElement("script");
    jsPayScript.type = "application/javascript";
    jsPayScript.className = "pay";
    // tabby
    //@ts-ignore
    const tabbyScript = document.createElement("script");
    tabbyScript.async = true;
    tabbyScript.src = "https://checkout.tabby.ai/tabby-card.js";
    //@ts-ignore
    const tammarScript = document.createElement("script");
    const tammarConfigScript = document.createElement("script");
    tammarConfigScript.innerHTML = `
    window.tamaraWidgetConfig = {
      lang: "ar",
      country: "SA",
  }
    `;
    tammarScript.async = true;
    tammarScript.src = "https://cdn.tamara.co/widget-v2/tamara-widget.js";

    document.head.appendChild(styleScript);
    //@ts-ignore
    document.head.appendChild(jsScript);
    //@ts-ignore
    document.head.appendChild(tabbyScript);
    document.head.appendChild(tammarScript);
    document.head.appendChild(tammarConfigScript);
  }, []);
  const renderProduct = (item: Product, index: number) => {
    const { image, price, name, featuredImage, _id } = item;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div
          style={{ margin: "0 0 0 40px" }}
          className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${image}`}
            fill
            alt={name}
            className="h-full w-full object-contain object-center"
            sizes="300px"
          />
          <Link
            href={`/product-detail/${_id}`}
            className="absolute inset-0"
          ></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href={`/product-detail/${_id}`}>{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5"></div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                </div>
                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={price}
                  />
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* <div className="hidden sm:block text-center relative">
              <NcInputNumber className="relative z-10" />
            </div> */}

            {/* <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span>ازاله المنتج</span>
            </a> */}
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>
        <div id="PaymentMethod" className="scroll-mt-24 ">
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
            <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
              <div className="sm:ml-8">
                <h2>شركة الشحن</h2>
                <div className="font-semibold mt-1 text-sm flex-col">
                  {deleviryMethods.length > 0
                    ? deleviryMethods?.map((item, i) => {
                        if (!item?.active) return;
                        return (
                          <div key={i}>
                            <button
                              className="deleveryBtn"
                              onClick={() => setDeleviryMethod(item.name)}
                              style={{
                                border:
                                  deleviryMethod === item.name
                                    ? "3px solid #55a8b9"
                                    : "",
                              }}
                            >
                              {item.name === "Trendy Rose" ? (
                                <>
                                  من خلال
                                  {item.name}
                                  <span>داخل الرياض</span>
                                </>
                              ) : item.name === "Bosta" ? (
                                <>
                                  من خلال
                                  {item.name}
                                  <span>خارج الرياض</span>
                                </>
                              ) : item.name === "Store" ? (
                                <>استلام من المتجر</>
                              ) : null}
                            </button>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            {deleviryMethod === "Store" && (
              <DeleveryForm
                formValue={storeDeleviryData}
                handleChange={handleChange}
                setFormValue={setStoreDeleviryData}
              />
            )}
          </div>
        </div>
        <h2 style={{ textAlign: "right", fontWeight: "bold" }}>الدفع بواسطة</h2>
        {allPaid && useUserPoints ? (
          <>
            {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
              <div id="PaymentMethod" className="scroll-mt-24">
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                  <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
                    <div className="sm:ml-8">
                      <div
                        className="font-semibold mt-1 text-sm"
                        // onClick={() => setPayOnDelviery(!payOnDelviery)}
                      >
                        <input
                          type="checkbox"
                          style={{ margin: "0 10px" }}
                          checked={paymentMethod === "Points"}
                          disabled={true}
                          // onChange={(e) => setPayOnDelviery(!payOnDelviery)}
                        />
                        <button
                          onClick={() =>
                            setPaymentMethod((prev) =>
                              prev === "Points" ? "" : "Points"
                            )
                          }
                        >
                          الدفع من خلال النقاط
                        </button>{" "}
                      </div>
                      {paymentMethod === "Points" && (
                        <>
                          <div style={{ margin: "20px" }}>
                            <ButtonSecondary
                              className="flex-2 flex-shrink-0 "
                              onClick={createCheckoutSession}
                            >
                              تاكيد الطلب
                            </ButtonSecondary>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {paymentMethodsTag?.find(
              (item: { active: boolean; id: number }) => item.id === 2
            )?.active && (
              <>
                {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
                  <div id="PaymentMethod" className="scroll-mt-24 ">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row center dir-rtl">
                        <span
                          className="hidden sm:block"
                          style={{ margin: "0 20px" }}
                        >
                          <Image
                            style={{ borderRadius: "10px" }}
                            src={TabbyIcon}
                            width={40}
                            height={40}
                          />
                        </span>
                        <div className="sm:ml-8">
                          <div className="font-semibold mt-1 text-sm">
                            <button
                              onClick={() =>
                                setPaymentMethod((prev) =>
                                  prev === "tabby" ? "" : "tabby"
                                )
                              }
                            >
                              تابي
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "tabby" && (
                  <Tabby
                    fintalTotal={+renderTotalPrice.fintalTotal}
                    couponResponse={{
                      ...couponResponse,
                      deductedAmount: +renderTotalPrice?.deductedAmount,
                    }}
                    deleviryMethod={deleviryMethod}
                    deleviryInfo={storeDeleviryData}
                    vat={+renderTotalPrice.vat}
                    pointsUsed={useUserPoints ? redeemData?.point : 0}
                    userNote={userNote}
                  />
                )}
              </>
            )}
            {/* {paymentMethodsTag?.find(
              (item: { active: boolean; id: number }) => item.id === 2
            )?.active && ( */}
            {/* {true && (
              <>
                {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
                  <div id="PaymentMethod" className="scroll-mt-24 ">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row center dir-rtl">
                        <span
                          className="hidden sm:block"
                          style={{ margin: "0 20px" }}
                        >
                          <Image
                            style={{ borderRadius: "10px" }}
                            src={TabbyIcon}
                            width={40}
                            height={40}
                          />
                        </span>
                        <div className="sm:ml-8">
                          <div className="font-semibold mt-1 text-sm">
                            <button
                              onClick={() =>
                                setPaymentMethod((prev) =>
                                  prev === "tammara" ? "" : "tammara"
                                )
                              }
                            >
                              تامارا
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "tammara" && (
                  <Tamarra fintalTotal={+renderTotalPrice.fintalTotal} />
                )}
              </>
            )} */}

            {paymentMethodsTag?.find(
              (item: { active: boolean; id: number }) => item.id === 1
            )?.active && (
              <>
                {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
                  <div id="PaymentMethod" className="scroll-mt-24 ">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
                        <div className="sm:ml-8">
                          <div className="font-semibold mt-1 text-sm">
                            <button
                              onClick={() =>
                                setPaymentMethod((prev) =>
                                  prev === "card" ? "" : "card"
                                )
                              }
                              style={{ display: "flex" }}
                            >
                              <input
                                type="checkbox"
                                style={{
                                  margin: "6px 10px 0 10px",
                                  position: "relative",
                                  zIndex: "-1",
                                }}
                                checked={paymentMethod === "card"}
                              />
                              <span
                                className="hidden sm:block"
                                style={{ margin: "0 20px" }}
                              >
                                <svg
                                  className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.92969 15.8792L15.8797 3.9292"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.1013 18.2791L12.3013 17.0791"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M13.793 15.5887L16.183 13.1987"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2 21.9985H22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              بطاقة بنكية
                              <span
                                style={{
                                  opacity: ".8",
                                  marginInlineStart: "20px",
                                }}
                              >
                                (فيزا , ماستركارد , مدى)
                              </span>
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "card" && (
                  <div
                    id="PaymentMethod"
                    className="scroll-mt-24"
                    style={{ minHeight: "200px" }}
                  >
                    <Moysar
                      fintalTotal={+renderTotalPrice.fintalTotal}
                      couponResponse={{
                        ...couponResponse,
                        deductedAmount: +renderTotalPrice?.deductedAmount,
                      }}
                      deleviryMethod={deleviryMethod}
                      deleviryInfo={storeDeleviryData}
                      vat={+renderTotalPrice.vat}
                      pointsUsed={useUserPoints ? redeemData?.point : 0}
                      userNote={userNote}
                    />
                  </div>
                )}
              </>
            )}
            {paymentMethodsTag?.find(
              (item: { active: boolean; id: number }) => item.id === 3
            )?.active && (
              <>
                {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
                  <div id="PaymentMethod" className="scroll-mt-24">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
                        <div className="sm:ml-8">
                          <div
                            className="font-semibold mt-1 text-sm"
                            // onClick={() => setPayOnDelviery(!payOnDelviery)}
                          >
                            <input
                              type="checkbox"
                              style={{ margin: "0 10px" }}
                              checked={paymentMethod === "payOnDelviery"}
                              disabled={true}
                              // onChange={(e) => setPayOnDelviery(!payOnDelviery)}
                            />
                            <button
                              onClick={() =>
                                setPaymentMethod((prev) =>
                                  prev === "payOnDelviery"
                                    ? ""
                                    : "payOnDelviery"
                                )
                              }
                            >
                              الدفع عند الاستلام
                            </button>{" "}
                          </div>
                          {paymentMethod === "payOnDelviery" && (
                            <>
                              <div style={{ margin: "20px" }}>
                                <ButtonSecondary
                                  className="flex-2 flex-shrink-0 "
                                  onClick={createCheckoutSession}
                                >
                                  تاكيد الطلب
                                </ButtonSecondary>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {paymentMethodsTag?.find(
              (item: { active: boolean; id: number }) => item.id === 4
            )?.active && (
              <>
                {!(deleviryMethod === "Store" && !storeDeleviryData.valid) && (
                  <div id="PaymentMethod" className="scroll-mt-24">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                      <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
                        <div className="sm:ml-8">
                          <div
                            className="font-semibold mt-1 text-sm"
                            // onClick={() => setPayWithTransfer(!payWithTransfer)}
                          >
                            <input
                              type="checkbox"
                              style={{ margin: "0 10px" }}
                              checked={paymentMethod === "Transfer"}
                              disabled={true}
                              // onChange={(e) => setPayWithTransfer(!payWithTransfer)}
                            />
                            <button
                              onClick={() =>
                                setPaymentMethod((prev) =>
                                  prev === "Transfer" ? "" : "Transfer"
                                )
                              }
                            >
                              تحويل بنكي
                            </button>{" "}
                          </div>
                          {paymentMethod === "Transfer" && (
                            <>
                              <div style={{ margin: "15px 10px" }}>
                                <h2 style={{ fontWeight: "bold" }}>
                                  مصرف الراجحي
                                </h2>
                                <p style={{ marginTop: "10px" }}>
                                  اسم المالك:{" "}
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginInlineStart: "10px",
                                    }}
                                  >
                                    TRENDY ROSE
                                  </span>
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                  رقم الحساب:{" "}
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginInlineStart: "10px",
                                    }}
                                  >
                                    996000010006080868434
                                  </span>
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                  الأيبان:{" "}
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginInlineStart: "10px",
                                    }}
                                  >
                                    SA1280000996000010006080868434
                                  </span>
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                  السويفت:{" "}
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginInlineStart: "10px",
                                    }}
                                  >
                                    RJHISARI
                                  </span>
                                </p>
                              </div>
                              <div style={{ margin: "20px" }}>
                                <ButtonSecondary
                                  className="flex-2 flex-shrink-0 "
                                  onClick={createCheckoutSession}
                                >
                                  تاكيد الطلب
                                </ButtonSecondary>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="nc-CheckoutPage">
        <main className="container py-16 lg:pb-28 lg:pt-20 ">
          <div className="mb-16" style={{ direction: "rtl" }}>
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
              اتمام الدفع
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link href={"/"} className="">
                الرئيسية
              </Link>

              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline"> اتمام الدفع</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[36%] " style={{ direction: "rtl" }}>
              <h3 className="text-lg font-semibold">سلة الشراء</h3>
              <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                {items.length > 0 ? items.map(renderProduct) : null}
              </div>
              <div style={{ marginTop: "20px" }}>
                <p className="text-sm font-bold">سياسة الاستبدال والاسترجاع</p>
                <div className="flex mt-1.5 justify-center">
                  <p style={{ fontSize: "12px" }}>
                    سياسة الإستبدال والإسترجاع: يحق للعميل الاستبدال قبل البدء
                    بتجهيز المنتج ، لكن بعد خروج الطلب للتوصيل لا يمكن الاستبدال
                    أو الاسترجاع وفقاً لطبيعة المنتج و الخدمة المقدمة. في حال
                    وجود خلل أو تلف بعد التوصيل فيحق للعميل انطلاقاً من مبدأ
                    الثقة المتبادلة إستبدال المنتج او الحصول على كامل القيمه
                    المدفوعه. آلية ارجاع المبالغ: يتم ارجاع المبلغ بنفس طريقة
                    الدفع التي تمت .
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <p className="text-sm font-bold">هل لديك ملاحظات</p>
                <div className="flex mt-1.5 justify-center">
                  <textarea
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    name="userNote"
                    style={{ height: "100px" }}
                    className="rounded-2xl mt-1.5 text-sm font-normal h-11 px-4 py-3 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800"
                  ></textarea>
                </div>
              </div>
              <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                <div>
                  <Label className="text-sm">هل لديك كوبون خصم؟</Label>
                  {couponResponse?.redeemed ? (
                    <div className="flex mt-1.5 justify-center">
                      <h3 className="text-lg font-semibold">
                        تم تفيعل كوبون {couponResponse?.code}
                      </h3>
                      <h3 className="text-lg font-semibold">
                        خصم {couponResponse?.precent}%
                      </h3>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div className="flex mt-1.5">
                        <Input
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setCouponResponse({});
                          }}
                          sizeClass="h-10 px-4 py-3"
                          className="flex-1 coupon-field"
                        />
                        <button
                          onClick={validateCoupon}
                          className="nc-Button coupon-btn text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors"
                        >
                          تفعيل
                        </button>
                      </div>
                      {couponResponse?.valid === false &&
                      !couponResponse?.minimumAmount ? (
                        <span style={{ color: "red" }}>الكود خاطئ</span>
                      ) : couponResponse?.valid === false &&
                        couponResponse?.minimumAmount ? (
                        <span style={{ color: "red" }}>
                          الحد الادني لاستخدام الكوبون{" "}
                          {couponResponse?.minimumAmount}رس
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
                {pointsActive &&
                redeemData?.point &&
                minToApply > +renderTotalPrice.total ? (
                  <div className="mt-4 flex justify-between py-2.5">
                    <span>
                      <input
                        type="checkbox"
                        style={{ marginLeft: "5px", cursor: "not-allowed" }}
                        checked={false}
                        onChange={(e) => null}
                      />
                      استخدام النقاط (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "12px",
                        }}
                      ></span>
                      {` `}
                      {
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "10px",
                            color: "#000",
                          }}
                        >
                          الحد الادني للطلب لتفعيل النقاط {minToApply} رس
                        </span>
                      }
                      )
                    </span>
                  </div>
                ) : redeemData?.point === 0 && pointsActive ? (
                  <div className="mt-4 flex justify-between py-2.5">
                    <span>
                      <input
                        type="checkbox"
                        style={{ marginLeft: "5px", cursor: "not-allowed" }}
                        checked={false}
                        onChange={(e) => null}
                      />
                      استخدام النقاط (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "12px",
                        }}
                      ></span>
                      {` `}
                      {
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "10px",
                            color: "#000",
                          }}
                        >
                          رصيدك الحالي من النقاط 0
                        </span>
                      }
                      )
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>المجموع الفرعي ({getTotalQty(items)} منتج)</span>
                  <span style={{ minWidth: "100px" }}>
                    {renderTotalPrice.totalBeforeVat} ر.س
                  </span>
                </div>
                {couponResponse?.precent && (
                  <div className="flex justify-between py-2.5">
                    <span>قسيمة التخفيض {couponResponse.precent}%</span>
                    <span
                      style={{ minWidth: "100px", color: "red" }}
                      className="font-semibold text-slate-900 dark:text-slate-200"
                    >
                      -{renderTotalPrice.deductedAmount} ر.س
                    </span>
                  </div>
                )}
                {/* <div className="mt-4 flex justify-between py-2.5">
                  <span>المجموع الخاضع للضريبة</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.totalBeforeVat} ر.س
                  </span>
                </div> */}
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>ضريبة القيمة المضافة</span>
                  <span style={{ minWidth: "100px" }} className="">
                    {renderTotalPrice.vat} ر.س
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>تكلفه الشحن مجاناً</span>
                  {/* <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span> */}
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span style={{ color: "#55a8b9" }}>تفاصيل الفاتورة</span>
                </div>
                {pointsActive &&
                redeemData?.point &&
                minToApply < +renderTotalPrice.total ? (
                  <div className="mt-4 flex justify-between py-2.5">
                    <span>
                      <input
                        type="checkbox"
                        style={{ marginLeft: "5px" }}
                        checked={useUserPoints}
                        onChange={(e) => setUseUserPoints(e.target.checked)}
                      />
                      استخدام النقاط (
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "12px",
                        }}
                      >
                        {redeemData?.point || points} نقطه
                      </span>
                      {` `}
                      {!allPaid && (
                        <span style={{ fontWeight: "bold", fontSize: "10px" }}>
                          سيتم خصم الحد الاقصي {redeemData.amount} رس
                        </span>
                      )}
                      )
                    </span>
                    {allPaid ? (
                      <span
                        style={{ minWidth: "100px", color: "red" }}
                        className="font-semibold text-slate-900 dark:text-slate-200"
                      >
                        -
                        {(
                          +renderTotalPrice.total + +renderTotalPrice.vat
                        ).toFixed(2)}{" "}
                        ر.س
                      </span>
                    ) : (
                      <span
                        style={{ minWidth: "100px", color: "red" }}
                        className="font-semibold text-slate-900 dark:text-slate-200"
                      >
                        -{redeemData.amount} ر.س
                      </span>
                    )}
                  </div>
                ) : null}

                {/* <div className="flex justify-between py-2.5">
                  <span>نص بطاقه</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.cards} ر.س
                  </span>
                </div> */}
                {/* <div className="flex justify-between py-2.5">
                  <span>كروت اهداء</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.giftCards} ر.س
                  </span>
                </div> */}
                {/* <div className="flex justify-between py-2.5">
                  <span>الضريبة</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span>
                </div> */}
                {+renderTotalPrice.giftCards.length > 0 && (
                  <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                    <span style={{ fontSize: "14px" }}>
                      مجموع اضافات الورود
                    </span>
                    <span style={{ minWidth: "100px" }}>
                      {" "}
                      {renderTotalPrice.giftCards} ر.س
                    </span>
                  </div>
                )}
                {+renderTotalPrice.cards.length > 0 && (
                  <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                    <span style={{ fontSize: "14px" }}>مجموع نص البطاقة</span>
                    <span style={{ minWidth: "100px" }}>
                      {" "}
                      {renderTotalPrice.cards} ر.س
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span style={{ fontSize: "14px" }}>مجموع المنتجات</span>
                  <span style={{ minWidth: "100px" }}>
                    {" "}
                    {renderTotalPrice.fintalTotalWithNoAdds} ر.س
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>المجموع الكلي</span>
                  <span style={{ minWidth: "100px", color: "green" }}>
                    {" "}
                    {renderTotalPrice.fintalTotal} ر.س
                  </span>
                </div>
              </div>
              {/* <ButtonPrimary className="mt-8 w-full">تاكيد الطلب</ButtonPrimary> */}
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center"></div>
            </div>
            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

            <div className="flex-1">{renderLeft()}</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutPageComponent;
