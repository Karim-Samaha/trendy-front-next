"use client";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Key } from "react";
import { adjustNames } from "@/utils/adjustNames";
import { renderTotalPrice_ } from "@/utils/adjustNames";
import { useSession } from "next-auth/react";
const CartPage = () => {
  const { items, removeItem } = useCart();
  const { data: session } = useSession();
  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        {/* <span className="ml-1 leading-none">Sold Out</span> */}
      </div>
    );
  };

  const renderTotalPrice = renderTotalPrice_(items);

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">متاح</span>
      </div>
    );
  };

  const renderProduct = (item: any, index: Key | null | undefined) => {
    const { image, price, name, featuredImage, _id, formInfo, selectedCard } =
      item;
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
            src={featuredImage}
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

                {selectedCard?._id && (
                  <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                    <div className="order-info flex-1 font-bold">
                      كرت اهداء{" "}
                      <span className="font-bold">
                        {adjustNames(selectedCard.name)}
                      </span>
                      <span className="font-bold" style={{ margin: "0 10px" }}>
                        {selectedCard.price} ر.س
                      </span>
                    </div>
                  </div>
                )}
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

              <div className="hidden sm:block text-center relative">
                <NcInputNumber className="relative z-10" item={item} />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
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
              <span onClick={() => removeItem(_id)}>ازاله المنتج</span>
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
              عربة التسوق
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
            عربة التسوق
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
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>المجموع</span>
                  <span style={{minWidth: "100px"}} className="font-semibold text-slate-900 dark:text-slate-200">
                    {renderTotalPrice.total} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>تكاليف الشحن</span>
                  <span style={{minWidth: "100px"}} className="font-semibold text-slate-900 dark:text-slate-200">
                    0 ر.س
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>نص بطاقه</span>
                  <span style={{minWidth: "100px"}} className="font-semibold text-slate-900 dark:text-slate-200">
                    {renderTotalPrice.cards} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>كروت اهداء</span>
                  <span style={{minWidth: "100px"}} className="font-semibold text-slate-900 dark:text-slate-200">
                    {renderTotalPrice.giftCards} ر.س
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>الضريبة</span>
                  <span style={{minWidth: "100px"}} className="font-semibold text-slate-900 dark:text-slate-200">
                    0 ر.س
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>مجموع الفاتورة</span>
                  <span style={{minWidth: "100px"}}> {renderTotalPrice.fintalTotal} ر.س</span>
                </div>
              </div>
              <ButtonPrimary href={session?.user?.accessToken ? "/checkout" : "/login"} className="mt-8 w-full">
                إتمام عملية الشراء{" "}
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
