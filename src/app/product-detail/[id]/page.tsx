"use client";
import React, { FC, useEffect, useState } from "react";
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
import Policy from "../Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "../ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import axios from "axios";
import ShippingAddress from "@/app/checkout/ShippingAddress";
import AdressForm from "@/app/product-detail/AdressForm";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import { useCart } from "react-use-cart";
import ModalCards from "@/components/ModalCards";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const ProductDetailPage: FC<any> = ({ params }) => {
  const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];
  const { addItem } = useCart();
  //
  const [productData, setProductData] = useState<any>([]);
  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [shopingCards, setShopingCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ _id: string } | null>(
    null
  );
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [formType, setFormType] = useState("");
  //
  useEffect(() => {
    if (selectedCard?._id) {
      setShopingCards(false);
    }
  }, [selectedCard]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      // .then((res) => res.data.data)
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={"http://localhost:5000/public/imgs/defualt.jpg"}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
          product={{ name: productData.name, price: productData.price }}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };
  const handleSelectedGiftCard = (item: any) => {
    setSelectedCard(item);
  };
  const handleAddToCart = (formInfo: Object) => {
    const itemToBeAdded: any = {
      ...productData,
      id: productData?._id,
      formInfo: { ...formInfo },
      selectedCard: { ...selectedCard },
    };
    addItem(itemToBeAdded);
    notifyAddTocart();
  };
  // const renderVariants = () => {
  //   if (!variants || !variants.length) {
  //     return null;
  //   }

  //   return (
  //     <div>
  //       <label htmlFor="">
  //         <span className="text-sm font-medium">
  //           Color:
  //           <span className="ml-1 font-semibold">
  //             {variants[variantActive].name}
  //           </span>
  //         </span>
  //       </label>
  //       <div className="flex mt-3">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
  //               variantActive === index
  //                 ? "border-primary-6000 dark:border-primary-500"
  //                 : "border-transparent"
  //             }`}
  //           >
  //             <div
  //               className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover"
  //               style={{
  //                 backgroundImage: `url(${
  //                   // @ts-ignore
  //                   typeof variant.thumbnail?.src === "string"
  //                     ? // @ts-ignore
  //                       variant.thumbnail?.src
  //                     : typeof variant.thumbnail === "string"
  //                     ? variant.thumbnail
  //                     : ""
  //                 })`,
  //               }}
  //             ></div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // const renderSizeList = () => {
  //   if (!allOfSizes || !sizes || !sizes.length) {
  //     return null;
  //   }
  //   return (
  //     <div>
  //       <div className="flex justify-between font-medium text-sm">
  //         <label htmlFor="">
  //           <span className="">
  //             Size:
  //             <span className="ml-1 font-semibold">{sizeSelected}</span>
  //           </span>
  //         </label>
  //         <a
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="##"
  //           className="text-primary-6000 hover:text-primary-500"
  //         >
  //           See sizing chart
  //         </a>
  //       </div>
  //       <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
  //         {allOfSizes.map((size, index) => {
  //           const isActive = size === sizeSelected;
  //           const sizeOutStock = !sizes.includes(size);
  //           return (
  //             <div
  //               key={index}
  //               className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center
  //               text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
  //                 sizeOutStock
  //                   ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
  //                   : "cursor-pointer"
  //               } ${
  //                 isActive
  //                   ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
  //                   : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
  //               }`}
  //               onClick={() => {
  //                 if (sizeOutStock) {
  //                   return;
  //                 }
  //                 setSizeSelected(size);
  //               }}
  //             >
  //               {size}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
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
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {productData.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={productData.price}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 تقيم
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                {/* <SparklesIcon className="w-3.5 h-3.5" />
                  <span className="ml-1 leading-none">{status}</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}
        {/* <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          {formType !== "NORMAL_ORDER" && (
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={() => setFormType("NORMAL_ORDER")}
            >
              <span className="ml-3">اضف الي السله</span>
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            </ButtonPrimary>
          )}
          {formType !== "GIFT_ORDER" && (
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={() => setFormType("GIFT_ORDER")}
            >
              <span className="ml-3">شراء كهديه</span>
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            </ButtonPrimary>
          )}
        </div>
        <AdressForm
          orderType={formType}
          isActive={formType === "NORMAL_ORDER" || formType === "GIFT_ORDER"}
          handleAddToCart={handleAddToCart}
          selectedCard={selectedCard}
          setShopingCards={() => {
            setShopingCards(true);
            setSelectedCard(null);
          }}
        />
        <ModalCards
          show={shopingCards}
          onClose={() => setShopingCards(false)}
          selectCard={handleSelectedGiftCard}
          data={undefined}
        />

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo allOpen={true} desc={productData.description} />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="" style={{ direction: "rtl" }}>
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 142 تقيم</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem
              data={{
                comment: `منتج رائع`,
                date: "December 22, 2021",
                name: "David  ",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `منتج رائع`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `منتج رائع`,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `منتج رائع`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            عرض كل التقيمات
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex justify-between" style={{ direction: "rtl" }}>
          {/* CONTENT */}
          <div className="w-full lg:w-[35%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="">
                <Image
                  width={500}
                  height={600}
                  src={
                    // productData?.image
                    //   ? `http://localhost:5000${productData?.image}`
                    //   :
                    `http://localhost:5000/public/imgs/defualt.jpg`
                  }
                  className=" rounded-2xl object-cover product-img"
                  alt="product detail 1"
                />
              </div>
              {renderStatus()}
              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {/* {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })} */}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[60%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {/* {renderDetailSection()} */}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            order={0}
            selectCard={undefined}
          />

          {/* SECTION */}
          <div className="pb-20 xl:pb-28 lg:pt-14">
            {/* <SectionPromo2 /> */}
          </div>
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
