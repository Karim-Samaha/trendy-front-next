"use client";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
const AccountOrder = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/subcategory/66019c0c1586ac17fd7c8917/`)
      .then((res) => res.data.data)
      .then((data) => {
        setData(
          data.productList?.map((item: any) => ({
            name: item.name,
            color: "bg-yellow-50",
            featuredImage: {
              category: 1,
              src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
              blurHeight: 8,
              blurWidth: 7,
              height: 200,
              width: 362,
              allOfSizes: ["XS", "S"],
              link: "product-detail",
              numberOfReviews: 50,
              rating: "4.9",
            },
            id: item?._id,
            price: item.price,
            description: item.nameAr,
          }))
        );
      });
  }, []);
  useEffect(() => {
    console.log({ data });
  }, [data]);
  const renderProductItem = (item: any, index: number) => {
    const { image, name } = item;

    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div
          className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
          style={{ margin: "0 20px" }}
        >
          <Image
            fill
            sizes="100px"
            src={"http://localhost:5000/public/imgs/defualt.jpg"}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
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
              <Prices className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">الكمية</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">1</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                قيم تجربتك
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (status, item) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">{item?._id}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>08-3-2024</span>
              <span className="mx-2">·</span>
              <span
                className={`${
                  status === 1
                    ? "status-deliverd"
                    : status === 2
                    ? "status-dilivery"
                    : null
                } text-primary-500`}
              >
                {status === 1 ? "تم التوصيل" : status === 2 ? "تم الشحن" : null}
              </span>
            </p>
          </div>
          {/* <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
            >
              View Order
            </ButtonSecondary>
          </div> */}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {data.slice(3, 4)?.map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12 dir-rtl">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">تاريخ الطلب</h2>
      {/* {renderOrder()} */}
      {renderOrder(2)}
      {renderOrder(1)}
    </div>
  );
};

export default AccountOrder;
