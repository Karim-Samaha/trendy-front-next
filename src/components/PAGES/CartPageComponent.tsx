"use client";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Key, useEffect, useState } from "react";
import { adjustNames } from "@/utils/adjustNames";
import { renderTotalPrice_ } from "@/utils/adjustNames";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import { sendEvent } from "@/utils/firebase";
const CartPageComponent = () => {
  const { items, removeItem, updateItemQuantity } = useCart();
  const { data: session } = useSession();
  const [coupon, setCoupon] = useState("");
  const [couponResponse, setCouponResponse] = useState({});
  const getTotalQty = (list: any) => {
    let totalQty = 0;
    list.map((item) => (totalQty += item.quantity));
    return totalQty || 1;
  };
  useEffect(() => {
    if (session) {
      const cartPrices = renderTotalPrice_(items);
      const total = +cartPrices.fintalTotal;
      _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
          {
            cart: items,
            amount: total,
          },
          //@ts-ignore
          { session }
        )
        .then((res) => console.log("session created"))
        .catch((err) => console.log(err));
    }
  }, [session]);
  const validateCoupon = async () => {
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
      .then((res) => {
        setCouponResponse({ ...res.data, code: coupon.trim() });
        if (res.data?.redeemed) {
          sessionStorage.setItem("couponResponse", JSON.stringify(res?.data));
        }
      })
      .catch((err) => console.log(err));
  };
  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        {/* <span className="ml-1 leading-none">Sold Out</span> */}
      </div>
    );
  };
  const colors = [
    { val: "red", text: "احمر" },
    { val: "white", text: "ابيض" },
    { val: "brown", text: "بني" },
    { val: "yellow", text: "اصفر" },
    { val: "rgba(0,0,0,0.5)", text: "شفاف" },
    { val: "green", text: "اخضر" },
    { val: "blue", text: "ازرق" },
    { val: "#0066CC", text: "كحلي" },
    { val: "black", text: "اسود" },
    { val: "pink", text: "زهري" },
    { val: "silver", text: "فضي" },
    { val: "#FFD700", text: "ذهبي" },
  ];

  const renderTotalPrice = renderTotalPrice_(items, couponResponse?.precent);

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">متاح</span>
      </div>
    );
  };
  const getTotalProductPrice = (item: any) => {
    let totalPrice = item.price * item.quantity;
    if (item.formInfo.cardText.length > 1) {
      //
      totalPrice += 6 * item.quantity;
    }
    for (let i = 0; i < item.selectedCard.length; i++) {
      totalPrice += item.selectedCard[i].price * item.selectedCard[i].quantity;
    }
    return totalPrice.toFixed();
  };

  const renderProduct = (item: any, index: Key | null | undefined) => {
    const {
      image,
      price: price_,
      name,
      featuredImage,
      _id,
      formInfo,
      selectedCard,
      quantity,
    } = item;

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div
          style={{ margin: "0 20px" }}
          className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
        >
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${image}`}
            alt={name}
            sizes="300px"
            className="h-full w-full object-cover object-center"
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
                  <Link href={`/product-detail/${_id}`}>
                    {adjustNames(name)}
                  </Link>
                </h3>
                {formInfo?.cardText?.length > 0 ? (
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-7">
                    <div className="order-info flex-1">
                      <p> نص البطاقة - اكتب إهدائك هنا ( + 6.00 ر.س )</p>
                    </div>
                  </div>
                ) : null}
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="order-info flex-1">
                    تاريخ التوصيل {formInfo?.deliveryDate} ( + 0.00 ر.س )
                  </div>
                </div>
                {formInfo?.type === "GIFT_ORDER" && (
                  <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                    <div className="order-info flex-1 font-bold">
                      سنقوم بتغليف الهدية بالنيابه عنك
                    </div>
                  </div>
                )}
                {selectedCard?.length
                  ? selectedCard.map((item: any) => {
                      return (
                        <div
                          className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300"
                          key={item?.cartId}
                        >
                          <div
                            className="order-info flex-1 font-bold"
                            style={{ flexWrap: "wrap", display: "flex", justifyContent: "center" }}
                          >
                            <span style={{ margin: "0 5px" }}>
                              اضافات الورود {`:`}
                            </span>
                            <span className="font-bold">
                              {` `}
                              {adjustNames(item?.name)}
                            </span>
                            <span
                              className="font-bold"
                              style={{ margin: "0 10px" }}
                            >
                              {item?.price} ر.س
                            </span>
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                              <span> الكمية : {item.quantity}</span>
                              {item?.color && (
                                <span> اللون : {colors.find((colorItem) => colorItem.val === item?.color)?.text}</span>
                              )}
                              {item?.text && (
                                <span> اختيار : {item?.text}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800"
                    onChange={(e) => updateItemQuantity(_id, +e.target.value)}
                    value={quantity.toString()}
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
                    price={getTotalProductPrice(item)}
                  />
                </div>
              </div>

              {/* <div className="hidden sm:block text-center relative">
                <NcInputNumber className="relative z-10" item={item} />
              </div> */}

              <div
                className="hidden flex-1 sm:flex justify-end"
                style={{ marginTop: "-12px" }}
              >
                <Prices price={getTotalProductPrice(item)} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* {Math.random() > 0.6
              ? renderStatusSoldout()
              : renderStatusInstock()} */}

            <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              <span
                onClick={() => {
                  removeItem(_id);
                  const product = items?.find((item) => item.id === _id);
                  sendEvent("remove_from_cart", {
                    currency: "SAR",
                    value: product?.price,
                    items: [
                      {
                        item_id: `${product?._id}`,
                        item_name: product?.name,
                        discount: 0,
                        item_brand: `${product?.brand}`,
                        item_category: `${product?.brand}`,
                        price: +product?.price,
                        quantity: +product?.quantity,
                      },
                    ],
                  });
                }}
              >
                ازاله المنتج
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  };
  if (items.length === 0)
    return (
      <div className="nc-CartPage" style={{ direction: "rtl" }}>
        <main className="container py-16 lg:pb-28 lg:pt-20 ">
          <div className="mb-12 sm:mb-16">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
              العربة
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link href={"/"} className="">
                الرئيسية
              </Link>
              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              {/* <Link href={"/collection"} className="">
              Clothing Categories
            </Link> */}
              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline">عربة التسوق</span>
            </div>
          </div>
        </main>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[100%] xl:w-[100%] divide-y divide-slate-200 dark:divide-slate-700 ">
            <div className="no-cart">
              <h3>لا يوجد منتجات في عربة التسوق</h3>
              <ButtonPrimary href="/" className="mt-8">
                التسوق{" "}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="nc-CartPage" style={{ direction: "rtl" }}>
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            العربة
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              الرئيسية
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            {/* <Link href={"/collection"} className="">
              Clothing Categories
            </Link> */}
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">عربة التسوق</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {items.length > 0 ? items.map(renderProduct) : null}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">سلة المشتريات</h3>
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
              </div>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>المجموع الفرعي ({getTotalQty(items)} منتج)</span>
                  <span style={{ minWidth: "100px" }}>
                    {renderTotalPrice.totalBeforeVat} ر.س
                  </span>
                </div>
                {couponResponse?.precent && (
                  <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                    <span>قسيمة التخفيض {couponResponse.precent}%</span>
                    <span
                      style={{ minWidth: "100px", color: "red" }}
                      className=""
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
                  {/* <span style={{ minWidth: "100px" }} className="">
                    0 ر.س
                  </span> */}
                </div>
                {+renderTotalPrice.giftCards > 0 && (
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
                {+renderTotalPrice.cards > 0 && (
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
                {/* <div className="flex justify-between py-4">
                  <span>تكاليف الشحن</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span>
                </div> */}
                {/* <div className="flex justify-between py-4">
                  <span>نص بطاقه</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.cards} ر.س
                  </span>
                </div> */}
                {/* <div className="flex justify-between py-4">
                  <span>كروت اهداء</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    {renderTotalPrice.giftCards} ر.س
                  </span>
                </div> */}
                {/* <div className="flex justify-between py-4">
                  <span>الضريبة</span>
                  <span
                    style={{ minWidth: "100px" }}
                    className="font-semibold text-slate-900 dark:text-slate-200"
                  >
                    0 ر.س
                  </span>
                </div> */}
                {/* {couponResponse?.precent && (
                  <div className="flex justify-between py-2.5">
                    <span>خصم كوبون</span>
                    <span
                      style={{ minWidth: "100px" }}
                      className="font-semibold text-slate-900 dark:text-slate-200"
                    >
                      {couponResponse.precent}%
                    </span>
                  </div>
                )} */}
                {/* <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>مجموع الفاتورة</span>
                  <span style={{ minWidth: "100px" }}>
                    {" "}
                    {renderTotalPrice.fintalTotal} ر.س
                  </span>
                </div> */}
              </div>
              <ButtonPrimary
                href={
                  session?.user?.accessToken
                    ? "/checkout"
                    : "/login?callback=/checkout"
                }
                className="mt-8 w-full"
              >
                إتمام عملية الشراء{" "}
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPageComponent;
