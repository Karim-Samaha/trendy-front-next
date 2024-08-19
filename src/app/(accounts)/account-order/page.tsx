"use client";
import Prices from "@/components/Prices";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import _axios from "@/contains/api/axios";
import { useSession } from "next-auth/react";
import { adjustNames } from "@/utils/adjustNames";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ModalAddReview from "@/components/ModalAddReview";
import { useSearchParams } from "next/navigation";
import { sendEvent } from "@/utils/firebase";
import {
  facebookPixel,
  snapchatPixelEvent,
  tiktokPixel,
  trackConversionSnapchatEvent,
  trackTikTokConversion,
  twitterPixel,
} from "@/utils/pixels";
const AccountOrder = () => {
  const [data, setData] = useState<any>([]);
  const { data: session }: any = useSession();
  const [addReview, setAddReview] = useState(false);
  const [itemToBeReviews, setItemToBeReviewd] = useState<string>("");
  const searchParams = useSearchParams();
  const isFromCheckout = searchParams?.get("from") === "checkout";
  const [events, setEvents] = useState(false);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 3,
    }
  );
  const hangleShowMore = () => {
    setPagination((prev) => ({ ...prev, limit: (prev.limit += 3) }));
  };
  useEffect(() => {
    if (session?.user?.accessToken) {
      _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-user-order?page=${pagination.page}&limit=${pagination.limit}`,
          { test: "!" },
          { session }
        )
        .then((res) => res.data.data)
        .then((data) => {
          setData(data);
        });
    }
  }, [session, pagination]);
  useEffect(() => {
    if (isFromCheckout && data.length > 0 && !events) {
      console.log({ test: data[0] });
      sendEvent("purchase", {
        transaction_id: data[0]?._id,
        affiliation: "Google Merchandise Store",
        value: ["TABBY", "TAMARA"].includes(data[0]?.source)
          ? data[0]?.amount
          : data[0]?.amount / 100,
        currency: "SAR",
        items: data[0]?.purchaseBulk.map((product, i) => {
          return {
            item_id: product?._id,
            item_name: product?.name,
            discount: 0,
            index: i,
            item_brand: product?.brand,
            item_category: product?.brand,
            price: product?.price,
            quantity: product?.quantity,
          };
        }),
      });
      facebookPixel("Purchase", {
        content_ids: data[0]?.purchaseBulk.map(
          (subItem) => subItem?._id || subItem?.id
        ),
        content_name: "Purchase",
        content_type: "product_group",
        contents: JSON.stringify(data[0]?.purchaseBulk),
        currency: "SAR",
        num_items: data[0]?.purchaseBulk.length,
        value: ["TABBY", "TAMARA"].includes(data[0]?.source)
          ? data[0]?.amount
          : data[0]?.amount / 100,
      });
      twitterPixel(`tw-${process.env.NEXT_PUBLIC_TWITTER_ID}-oe03t`, {
        value: data[0]?.amount / 100,
        currency: "SAR",
        contents: data[0]?.purchaseBulk.map((product, i) => {
          return {
            content_type: "Product",
            content_id: `${product._id}`,
            content_name: product.name,
            content_price: product?.price,
            num_items: +product.quantity,
          };
        }),
      });
      tiktokPixel("CompletePayment", {
        content_type: "product_group",
        content_id:
          JSON.stringify(
            data[0]?.purchaseBulk.map((product) => {
              return {
                content_id: product?._id,
              };
            })
          ) || "[]",
        value: ["TABBY", "TAMARA"].includes(data[0]?.source)
          ? data[0]?.amount
          : data[0]?.amount / 100,
        currency: "SAR",
      });
      snapchatPixelEvent("PURCHASE", {
        currency: "SAR",
        price: data[0]?.amount / 100,
        transaction_id: data[0]?._id,
        user_email: session?.user?.email || "",
      });
      trackTikTokConversion("Purchase", {
        value: ["TABBY", "TAMARA"].includes(data[0]?.source)
          ? data[0]?.amount
          : data[0]?.amount / 100,
        currency: "SAR",
        content_type: "product",
      });
      trackConversionSnapchatEvent("PURCHASE", {
        event: {
          currency: "SAR",
          purchase_value: ["TABBY", "TAMARA"].includes(data[0]?.source)
            ? data[0]?.amount
            : data[0]?.amount / 100,
        },
        properties: {
          currency: "SAR",
          content_type: "product",
          content_id: data[0]?._id,
          quantity: data[0]?.purchaseBulk?.length || 1,
        },
      });
      setEvents(true);
    }
  }, [isFromCheckout, data.length]);
  const renderProductItem = (
    order: any,
    amount: string,
    method: string,
    ShippingType: string,
    ShippingInfo: any,
    index: number
  ) => {
    const { image, name, _id, id } = order;
    console.log({ order: order });
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div
          className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
          style={{ margin: "0 20px" }}
        >
          <Image
            fill
            sizes="100px"
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${image}`}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div
          className="ml-4 flex flex-1 flex-col"
          style={{ minWidth: "205px" }}
        >
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {/* <span>{"Natural"}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span> */}
                </p>
              </div>
              <Prices
                className="mt-0.5 ml-2"
                price={
                  ["TABBY", "TAMARA"].includes(method) ? amount : amount / 100
                }
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">الكمية</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{order.quantity}</span>
            </p>
            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
                onClick={() => {
                  setAddReview(true);
                  setItemToBeReviewd(_id || id);
                }}
                style={{ marginTop: "15px", marginLeft: "25px" }}
              >
                قيم تجربتك
              </button>
            </div>
          </div>
          <div
            className="flex flex-1 items-end justify-between text-sm"
            style={{ marginTop: "15px" }}
          >
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">طريقة الشحن</span>
              <span
                className="ml-2"
                style={{ marginInlineStart: "10px", fontWeight: "bold" }}
              >
                {ShippingType}
              </span>
            </p>
          </div>
          <div
            className="flex flex-1 items-end justify-between text-sm"
            style={{ marginTop: "15px" }}
          >
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">عنوان الشحن</span>
              <span
                className="ml-2"
                style={{ marginInlineStart: "10px", fontWeight: "bold" }}
              >
                {order?.formInfo?.address ||
                  "لم يتم تحديد العنوان (سيقوم الدعم بالتواصل مع المستلم)"}
              </span>
            </p>
          </div>
          <div
            className="flex flex-1 items-end justify-between text-sm"
            style={{ marginTop: "15px" }}
          >
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">تاريخ التوصيل</span>
              <span
                className="ml-2"
                style={{ marginInlineStart: "10px", fontWeight: "bold" }}
              >
                {order?.formInfo?.deliveryDate}
              </span>
            </p>
          </div>
          <div
            className="flex flex-1 items-end justify-between text-sm"
            style={{ marginTop: "15px" }}
          >
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">بيانات المستلم</span>
              <span
                className="ml-2"
                style={{ marginInlineStart: "10px", fontWeight: "bold" }}
              >
                {console.log({ ShippingInfo })}
                {order?.formInfo?.sentTo ||
                  order?.formInfo?.phone ||
                  ShippingInfo?.name ||
                  ShippingInfo?.phone ||
                  session?.user?.name ||
                  session?.user?.phone ||
                  session?.user?.email ||
                  ""}
              </span>
            </p>
          </div>
          {order?.formInfo?.cardText?.length > 0 ? (
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-7">
              <div className="order-info flex-1">
                <p>
                  {" "}
                  نص البطاقة <span className="font-bold">( + 6.00 ر.س )</span>
                </p>
              </div>
            </div>
          ) : null}
          {/* <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
            <div className="order-info flex-1" style={{ minWidth: "205px" }}>
              (من الي) تاريخ التوصيل {order.formInfo?.deliveryDate}{" "}
              <span className="font-bold">( + 0.00 ر.س ) </span>
            </div>
          </div> */}
          {order?.selectedCard?.length > 0
            ? order?.selectedCard?.map((item: any) => {
                return (
                  <div
                    className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300"
                    style={{ minWidth: "205px" }}
                    key={item?._id}
                  >
                    <div className="order-info flex-1">
                      اضافات الورود :
                      <span className="font-bold">
                        {adjustNames(item?.name)}
                      </span>
                      <span className="font-bold" style={{ margin: "0 10px" }}>
                        {item?.price} ر.س
                      </span>
                    </div>
                  </div>
                );
              })
            : null}

          <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
            <div className="order-info flex-1" style={{ minWidth: "205px" }}>
              وسيله الدفع :{" "}
              {method.toUpperCase() === "BANK_TRANSFER" ? (
                <span className="font-bold">{`تحويل بنكي`}</span>
              ) : method.toUpperCase() === "CASH_ON_DELIVERY" ? (
                <span className="font-bold">{`الدفع عند الاستلام`}</span>
              ) : (
                <span className="font-bold">{`${method.toUpperCase()}`}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (item, i) => {
    {
      console.log({ item });
    }

    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <p className="text-lg font-semibold">الرقم المرجعي: {item?._id}</p>

          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>
                {new Date(item.createdAt).toISOString().substring(0, 10)}
              </span>
              <span className="mx-2">·</span>
              <span
                className={`${
                  item.orderStatus === "DELEIVERD"
                    ? "status-deliverd"
                    : item.orderStatus === "PROCCESSING" ||
                      item.orderStatus === "ON_THE_WAY" ||
                      item.orderStatus == "RETURNED"
                    ? "status-dilivery"
                    : null
                } text-primary-500`}
              >
                {item.orderStatus === "PROCCESSING" && "قيد التنفيذ"}
                {item.orderStatus === "DELEIVERD" && "تم التوصيل"}
                {item.orderStatus === "ON_THE_WAY" && "تم الشحن"}
                {item.orderStatus === "RETURNED" && "مسترجع"}
              </span>
            </p>
          </div>
        </div>
        {addReview && (
          <ModalAddReview
            show={addReview}
            id={itemToBeReviews}
            onClose={() => setAddReview(false)}
            // selectCard={handleSelectedGiftCard}
            data={undefined}
          />
        )}
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {item.purchaseBulk?.map((order: any, i: number) =>
            renderProductItem(
              order,
              item.amount,
              item.source,
              item?.ShippingType,
              item?.ShippingInfo,
              i
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12 dir-rtl">
      {/* HEADING */}
      {isFromCheckout ? (
        <h2 className="text-2xl sm:text-3xl font-semibold">
          تم استلام طلبك بنجاح
        </h2>
      ) : (
        <h2 className="text-2xl sm:text-3xl font-semibold">تاريخ الطلب</h2>
      )}
      {/* {renderOrder()} */}
      {isFromCheckout ? (
        data.slice(0, 1).map((item, i) => renderOrder(item, i))
      ) : data.length === 0 ? (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
          <div className="flex p-4 sm:p-8 bg-slate-50 ">
            <h2
              style={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
            >
              {" "}
              لا يوجد طلبات سابقة
            </h2>
          </div>
        </div>
      ) : (
        data.map((item, i) => renderOrder(item, i))
      )}
      {!isFromCheckout &&
        (data.length === 0 ? null : (
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
            <ButtonPrimary onClick={hangleShowMore}>عرض المزيد</ButtonPrimary>
          </div>
        ))}
    </div>
  );
};

export default AccountOrder;
