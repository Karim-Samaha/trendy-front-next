"use client";

import React, { FC, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { useCart } from "react-use-cart";
import { adjustNames } from "@/utils/adjustNames";
import { useSession } from "next-auth/react";
import Discount from "./Discount";
export interface ProductCardProps {
  className?: string;
  data?: any;
  isLiked?: boolean;
  featuredImage: any;
  _id: string;
  modal: boolean;
  selectCard: any;
  setImageErrorObj: any;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
  modal,
  selectCard,
  setImageErrorObj,
}) => {
  const {
    name,
    price,
    priceBefore,
    isOffer,
    description,
    variants,
    status,
    rating,
    _id,
    featuredImage,
    fav,
    purchaseCount,
  } = data;
  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const router = useRouter();
  const notifyAddTocart = ({ size }: { size?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none"></p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(_id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }: { size?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${data.image}`}
            alt={adjustNames(name)}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{adjustNames(name)}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices
                price={price}
                priceBefore={priceBefore}
                className="mt-0.5"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  // const renderVariants = () => {
  //   if (!variants || !variants.length || !variantType) {
  //     return null;
  //   }

  //   if (variantType === "color") {
  //     return (
  //       <div style={{ direction: "rtl" }} className="flex space-x-1">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
  //               variantActive === index
  //                 ? getBorderClass(variant.color)
  //                 : "border-transparent"
  //             }`}
  //             title={variant.name}
  //           >
  //             <div
  //               className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
  //             ></div>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="flex ">
  //       {variants.map((variant, index) => (
  //         <div
  //           key={index}
  //           onClick={() => setVariantActive(index)}
  //           className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
  //             variantActive === index
  //               ? "border-black dark:border-slate-300"
  //               : "border-transparent"
  //           }`}
  //           title={variant.name}
  //         >
  //           <div
  //             className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
  //             style={{
  //               backgroundImage: `url(${
  //                 // @ts-ignore
  //                 typeof variant.thumbnail?.src === "string"
  //                   ? // @ts-ignore
  //                     variant.thumbnail?.src
  //                   : typeof variant.thumbnail === "string"
  //                   ? variant.thumbnail
  //                   : ""
  //               })`,
  //             }}
  //           ></div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const renderGroupButtons = () => {
    return (
      <div className="gourp-buttons absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {modal ? null : (
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
            // onClick={() => {
            //   console.log({ data });
            //   addItem(data);
            //   notifyAddTocart({ size: "XL" });
            // }}
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />

            <Link href={`/product-detail/${data?._id}/${data?._name}`}>
              {" "}
              <span className="ms-1">اضف الى السلة</span>
            </Link>
          </ButtonPrimary>
        )}
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">تفاصيل</span>
        </ButtonSecondary>
      </div>
    );
  };

  // const renderSizeList = () => {
  //   if (!sizes || !sizes.length) {
  //     return null;
  //   }

  //   return (
  //     <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
  //       {sizes.map((size, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
  //             onClick={() => notifyAddTocart({ size })}
  //           >
  //             {size}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className} ${
          imageError && "noImgProduct"
        }`}
      >
        {!modal && (
          <Link
            href={`/product-detail/${_id}/${name}`}
            className="absolute inset-0"
          ></Link>
        )}

        <div
          className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group"
          style={{ backgroundColor: "#CCAA91" }}
        >
          {modal ? (
            <NcImage
              containerClassName="flex aspect-w-10 aspect-h-10 w-full h-0"
              src={featuredImage}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
              onError={() => {
                setImageError(true);
                setImageErrorObj((prev: any) => ({
                  ...prev,
                  [data?._id]: true,
                }));
              }}
            />
          ) : (
            <Link href={`/product-detail/${_id}/${name}`} className="block">
              <NcImage
                containerClassName="flex aspect-w-10 aspect-h-10 w-full h-0"
                src={featuredImage}
                className="object-cover w-full h-full drop-shadow-xl"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="product"
                onError={() => {
                  setImageError(true);
                  setImageErrorObj((prev: any) => ({
                    ...prev,
                    [data?._id]: true,
                  }));
                }}
              />
            </Link>
          )}

          <ProductStatus status={status} />

          <LikeButton
            fav={fav}
            id={_id}
            className="absolute top-3 end-3 z-10"
          />
          <Discount
            price={price}
            priceBefore={priceBefore}
            purchaseCount={0}
            className="absolute top-3 start-2 z-10"
          />
          {/* {sizes ? renderSizeList() : renderGroupButtons()} */}
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}
          <div>
            <h2
              style={{ height: "45px", textAlign: "right" }}
              className="dir-rtl nc-ProductCard__title text-base font-semibold transition-colors"
            >
              {adjustNames(name)}
            </h2>
          </div>

          <div className="flex justify-between items-center product-footer">
            <Prices price={price} priceBefore={priceBefore} />
            <Link
              href={
                data?.rates > 0
                  ? `/product-detail/${_id}/${name}?rate=true`
                  : `/product-detail/${_id}/${name}`
              }
              // style={{ zIndex: "9999" }}
            >
              <div className="flex items-center mb-0.5">
                <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                <span
                  className="text-sm ms-1 text-slate-500 dark:text-slate-400"
                  style={{
                    direction: "rtl",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {5}({data.rates || 0} تقيم)
                </span>
              </div>
            </Link>
            {!modal && (
              <ButtonPrimary
                className="shadow-lg buy-responsive"
                fontSize="text-xs"
                sizeClass="py-2 px-4"
                // onClick={() => {
                //   console.log({ data });
                //   addItem(data);
                //   notifyAddTocajt({ size: "XL" });
                // }}
              >
                <BagIcon className="w-3.5 h-3.5 mb-0.5" />

                <Link href={`/product-detail/${data?._id}/${data?.name}`}>
                  {" "}
                  <span className="ms-1">اضف الى السلة</span>
                </Link>
              </ButtonPrimary>
            )}
          </div>
          {modal && (
            <ButtonPrimary
              className="shadow-lg card-add"
              fontSize="text-xs"
              sizeClass="py-2 px-4"
              onClick={() => {
                selectCard(data);
              }}
            >
              <BagIcon className="w-3.5 h-3.5 mb-0.5 " />{" "}
              <span className="ms-1">اضف الى السلة</span>
            </ButtonPrimary>
          )}
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        data={data}
        modal={modal}
      />
    </>
  );
};

export default ProductCard;
