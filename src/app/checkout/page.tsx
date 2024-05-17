"use client";
import Label from "@/components/Label/Label";
import Prices from "@/components/Prices";
import { Product } from "@/data/data";
import { useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import Moysar from "@/components/payment/Moysar";
import Tabby from "./tabby";
import TabbyIcon from "@/images/icons/Tabby.png";
import { renderTotalPrice_ } from "@/utils/adjustNames";
import _axios from "@/contains/api/axios";
import { useSession } from "next-auth/react";
const CheckoutPage = () => {
  const { items } = useCart();

  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deleviryMethods, setDeleviryMethods] = useState("");
  const [deleviryMethod, setDeleviryMethod] = useState("Trendy Rose");
  const [coupon, setCoupon] = useState("");
  const [couponResponse, setCouponResponse] = useState({});
  const renderTotalPrice = renderTotalPrice_(items, couponResponse?.precent);
  const { data: session } = useSession();
  const validateCoupon = async () => {
    const renderTotalPrice = renderTotalPrice_(items, null);
    await _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon-redeem`,
        {
          code: coupon,
          amount: +renderTotalPrice.fintalTotal,
        },
        //@ts-ignore
        { session }
      )
      .then((res) => setCouponResponse({ ...res.data, code: coupon }))
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
        console.log("!!!!!!!!!!!!!!!!!!");
        console.log({ deb1: data, deb2: deleviry });
        setDeleviryMethods(deleviry?.items);
      })
      .catch((err) => console.log(err));

    // Moyasar
    const styleScript = document.createElement("link");
    styleScript.rel = "stylesheet";
    styleScript.href = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.css";
    const jsScript = document.createElement("script");
    jsScript.src = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.js";
    const jsPayScript = document.createElement("script");
    jsPayScript.type = "application/javascript";
    jsPayScript.className = "pay";
    // tabby
    const tabbyScript = document.createElement("script");
    tabbyScript.async = true;
    tabbyScript.src = "https://checkout.tabby.ai/tabby-card.js";

    document.head.appendChild(styleScript);
    document.head.appendChild(jsScript);
    document.head.appendChild(tabbyScript);
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
                              {" "}
                              من خلال {`  `}
                              {item.name}{" "}
                              {item.name === "Trendy Rose" ? (
                                <span>داخل الرياض</span>
                              ) : (
                                <span>خارج الرياض</span>
                              )}
                            </button>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="PaymentMethod" className="scroll-mt-24 ">
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
            <div className="p-6 flex flex-col sm:flex-row center dir-rtl">
              <span className="hidden sm:block" style={{ margin: "0 20px" }}>
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
        {paymentMethod === "tabby" && (
          <Tabby fintalTotal={+renderTotalPrice.fintalTotal} />
        )}

        <div id="PaymentMethod" className="scroll-mt-24 ">
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
            <div className="p-6 flex flex-col sm:flex-row items-start dir-rtl">
              <span className="hidden sm:block" style={{ margin: "0 20px" }}>
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
              <div className="sm:ml-8">
                <div className="font-semibold mt-1 text-sm">
                  <button
                    onClick={() =>
                      setPaymentMethod((prev) =>
                        prev === "card" ? "" : "card"
                      )
                    }
                  >
                    بطافة بنكية
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div
            id="PaymentMethod"
            className="scroll-mt-24"
            style={{ minHeight: "200px" }}
          >
            <Moysar
              fintalTotal={+renderTotalPrice.fintalTotal}
              couponResponse={couponResponse}
              deleviryMethod={deleviryMethod}
            />
          </div>
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
              اتمام عملية الدفع
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link href={"/"} className="">
                الرئيسية
              </Link>

              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline"> اتمام عملية الدفع</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[36%] " style={{ direction: "rtl" }}>
              <h3 className="text-lg font-semibold">سلة الشراء</h3>
              <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                {items.length > 0 ? items.map(renderProduct) : null}
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
                          className="flex-1"
                        />
                        <button
                          onClick={validateCoupon}
                          className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors"
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

                <div className="mt-4 flex justify-between py-2.5">
                  <span>المجموع</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.total} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>تكاليف الشحن</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>نص بطاقه</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.cards} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>كروت اهداء</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.giftCards} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>الضريبة</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span>
                </div>
                {couponResponse?.precent && (
                  <div className="flex justify-between py-2.5">
                    <span>خصم كوبون</span>
                    <span
                      style={{ minWidth: "100px" }}
                      className="font-semibold text-slate-900 dark:text-slate-200"
                    >
                      {couponResponse.precent}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>مجموع الفاتورة</span>
                  <span style={{ minWidth: "100px" }}>
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

export default CheckoutPage;
