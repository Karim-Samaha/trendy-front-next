"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import NotifyAddTocart from "./NotifyAddTocart";
import Image from "next/image";
import Link from "next/link";
import AccordionInfo from "./AccordionInfo";

export interface ProductQuickView2Props {
  className?: string;
  data: any;
}

const ProductQuickView2: FC<ProductQuickView2Props> = ({
  className = "",
  data,
}) => {
  const { sizes, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");

  const renderSizeList = () => {
    if (!allOfSizes || !sizes || !sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size:
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="##"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {allOfSizes.map((size, index) => {
            const isActive = size === sizeSelected;
            const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  sizeOutStock
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  if (sizeOutStock) {
                    return;
                  }
                  setSizeSelected(size);
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    // if (status === "New in") {
    //   return (
    //     <div className={CLASSES}>
    //       <SparklesIcon className="w-3.5 h-3.5" />
    //       <span className="ml-1 leading-none">{status}</span>
    //     </div>
    //   );
    // }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div className="dir-rtl">
          <h2
            className="text-2xl 2xl:text-3xl font-semibold dir-rtl"
            style={{ textAlign: "right" }}
          >
            <Link href={`/product-detail/${data?._id}`}>{data.name}</Link>
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={data?.price}
            />

            <div className="h-6 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                {data?.rates > 0 ? (
                  <Link href={`/product-detail/${data?._id}?rate=true`}>
                    <div className="ml-1.5 flex">
                      <span>4.9</span>
                      <span className="block mx-2">·</span>
                      <span className="text-slate-600 dark:text-slate-400 underline">
                        {data?.rates} تقيم
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="ml-1.5 flex">
                    <span>4.9</span>
                    <span className="block mx-2">·</span>
                    <span className="text-slate-600 dark:text-slate-400 underline">
                      {data?.rates} تقيم
                    </span>
                  </div>
                )}
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              {/* <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex-1 dir-rtl">
          <AccordionInfo allOpen={true} desc={data.description} />
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div>
        <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            href={`/product-detail/${data?._id}`}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">اضف الي السلة</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        <div className="text-center">
          <Link
            className="text-primary-6000 hover:text-primary-500 font-medium"
            href={`/product-detail/${data?._id}`}
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView2 ${className}`}>
      {/* MAIn */}
      <div className="lg:flex justify-between">
        {/* SIDEBAR */}
        <div className="w-full lg:w-[45%] pt-6 lg:pt-0 lg:pl-7 xl:pl-10">
          {renderSectionContent()}
        </div>
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/defualt.jpg`}
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* STATUS */}
            {renderStatus()}
            {/* META FAVORITES */}
            {/* <LikeButton className="absolute right-3 top-3 " /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView2;
