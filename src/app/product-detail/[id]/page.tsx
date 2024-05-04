"use client";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";

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
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductNcNumber from "@/components/productNcNumber";
import Discount from "@/components/Discount";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareCount,
} from "react-share";
import {
  FacebookIcon,
  InstapaperIcon,
  LivejournalIcon,
  TwitterIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";
//@ts-ignore
import { Snapshare } from "@thezano/react-snapshare";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const ProductDetailPage: FC<any> = ({ params }) => {
  const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];
  const { addItem, updateItemQuantity, items, setItems } = useCart();
  //
  const [qty, setQty] = useState(1);
  const [productData, setProductData] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [shopingCards, setShopingCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ _id: string } | null>(
    null
  );
  const [qualitySelected, setQualitySelected] = useState(1);
  const [tammaraReady, setTamarraReady] = useState(false);
  const [tabbyReady, setTabbyReady] = useState(false);

  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [formType, setFormType] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const isRateModalQuery = searchParams.get("rate");

  useEffect(() => {
    if (isRateModalQuery) {
      setIsOpenModalViewAllReviews(true);
    }
  }, []);
  //
  useEffect(() => {
    if (selectedCard?._id) {
      setShopingCards(false);
    }
  }, [selectedCard]);

  useEffect(() => {
    Promise.all([
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.id}`)
        .then((res) => setProductData({ ...res.data }))
        .catch((err) => console.log(err)),
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${params.id}`)
        .then((res) => setReviews(res.data.data))
        .catch((err) => console.log(err)),
    ]);
  }, []);
  useEffect(() => {
    let root = document.querySelector(".nc-ProductDetailPage ");
    const tabbyCard = document.createElement("script");
    const tammaraCard = document.createElement("script");
    if (productData?.price) {
      tabbyCard.innerHTML = `
      new TabbyPromo({
        selector: '#TabbyPromo', // required, content of tabby Promo Snippet will be placed in element with that selector.
        currency: 'SAR', // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
        price: '${productData.price}', // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
        installmentsCount: 4, // Optional, for non-standard plans.
        lang: 'ar', // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
        source: 'product', // Optional, snippet placement; \`product\` for product page and \`cart\` for cart page.
        publicKey: 'PUBLIC_API_KEY', // required, store Public Key which identifies your account when communicating with tabby.
        merchantCode: 'zid_sa'  // required
      });`;
      tammaraCard.innerHTML = `
      var tamaraWidgetConfig = {
        lang: ['ar'], // Language. Default is Arabic. We support [ar|en]
        country: ['SA'], // The ISO country code. Ex: SA 
        publicKey: ['sadsadsadsa'], // The public key is provided by Tamara
        css: [], // Optional field, It should be a string of CSS that you want to customize
        style: { // Optional to define CSS variable
            fontSize: '16px',
            borderRaduis: '7px',
            badgeRatio: 1, // The radio of logo, we can make it big or small by changing the radio.
        }
    }
      `;

      if (tabbyReady && root) {
        root.appendChild(tabbyCard);
      }

      if (tammaraReady && root) {
        root.appendChild(tabbyCard);
      }
    }
  }, [productData, tabbyReady, tammaraReady]);

  const notifyAddTocart = (item: any) => {
    toast.custom(
      (t) => (
        <Link href={"/cart"}>
          <NotifyAddTocart
            productImage={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/defualt.jpg`}
            qualitySelected={item.quantity}
            show={t.visible}
            sizeSelected={sizeSelected}
            variantActive={variantActive}
            product={{ name: item.name, price: item.price }}
          />
        </Link>
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };
  const handleSelectedGiftCard = (item: any) => {
    setSelectedCard(item);
  };
  const handleAddToCart = (formInfo: Object) => {
    let itemToBeAdded: any = {
      ...productData,
      id: productData?._id,
      quantity: qty,
      formInfo: { ...formInfo },
      selectedCard: { ...selectedCard },
    };
    if (items.some((item) => item.id === itemToBeAdded.id)) {
      let item = items.find((item) => item.id === itemToBeAdded.id);
      if (!item) return;
      updateItemQuantity(item.id, item?.quantity + qty);
      itemToBeAdded = {
        ...item,
        quantity: item.quantity + qty,
      };
    } else {
      addItem(itemToBeAdded, qty);
    }
    notifyAddTocart(itemToBeAdded);
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
              priceBefore={productData.priceBefore}
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
                    {reviews.length} تقيم
                  </span>
                </div>
              </a>
              <Discount
                price={productData.price}
                priceBefore={productData.priceBefore}
              />

              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                {/* <SparklesIcon className="w-3.5 h-3.5" />
                  <span className="ml-1 leading-none">{status}</span> */}
              </div>
            </div>
          </div>
        </div>
        <Script
          src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
          onReady={() => setTamarraReady(true)}
        />
        <Script
          src="https://checkout.tabby.ai/tabby-promo.js"
          onReady={() => setTabbyReady(true)}
        />
        {/* <Script src="https://example.com/script.js" /> */}

        <div style={{ marginBottom: "30px" }} id="TabbyPromo"></div>
        {/* // @ts-ignore */}
        {tammaraReady && productData?.price && (
          //@ts-ignore
          <tamara-widget
            type="tamara-summary"
            amount={`${productData?.price}`}
            inline-type="2"
            inline-variant="outlined"
            config='{"badgePosition":"right","showExtraContent":""}'
          ></tamara-widget>
        )}

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}
        {/* <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5 product-controls">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <ProductNcNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
              qty={qty}
              setQty={setQty}
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
            // setSelectedCard(null);
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
    if (reviews.length <= 0) return;
    return (
      <div className="" style={{ direction: "rtl" }}>
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="star w-7 h-7 mb-0.5" />
          <span className="title ml-1.5"> {reviews.length} تقيم</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="review-bg grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            {reviews.slice(0, 4).map((item, i) => {
              return (
                <ReviewItem
                  key={i}
                  data={{
                    comment: item.productReview,
                    date: item?.createdAt?.split("T")[0],
                    name: item.name,
                    starPoint: item.productRating,
                  }}
                />
              );
            })}
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
              {console.log(`http://localhost:5000/public/imgs/${productData?.image}`)}
              <div className="">
                <Image
                  width={500}
                  height={600}
                  src={
                    // productData?.image
                    //   ? `http://localhost:5000${productData?.image}`
                    //   :
                    `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${productData?.image}`
                  }
                  className=" rounded-2xl object-cover product-img"
                  alt="product detail 1"
                />
                <div
                  style={{
                    // border: "1px solid red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  <p style={{fontWeight: "bold"}}>شارك المنتج عبر:</p>
                  <div style={{ display: "flex" }}>
                    <FacebookShareButton
                      style={{ margin: "0 10px" }}
                      url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
                    >
                      <FacebookIcon borderRadius={5} />
                    </FacebookShareButton>

                    <TwitterShareButton
                      style={{ margin: "0 10px" }}
                      url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
                    >
                      <TwitterIcon borderRadius={5}/>
                    </TwitterShareButton>

                    <Snapshare
                      dataShareUrl="https://twang.dev/react-snapshare/"
                      stickerAssetURL="https://kit.snapchat.com/ckweb/test/image.png"
                      customButtonStyles={{ height: "80px" }}
                    />
                    <WhatsappShareButton
                      style={{ margin: "0 10px" }}
                      url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
                    >
                      <WhatsappIcon borderRadius={5}/>
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
              {/* {renderStatus()} */}
              {/* META FAVORITES */}
              {/* <LikeButton className="absolute right-3 top-3 " /> */}
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
            order={2}
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
        reviews={reviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
