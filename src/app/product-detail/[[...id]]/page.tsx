import React, { FC, useEffect, useMemo, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import { PRODUCTS } from "@/data/data";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "../Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "../ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import axios from "axios";
import AdressForm from "@/app/product-detail/AdressForm";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import { useCart } from "react-use-cart";
import ModalCards from "@/components/ModalCards";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductNcNumber from "@/components/productNcNumber";
import Head from "next/head";
import Discount from "@/components/Discount";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, XIcon } from "react-share";
import ProductPage from "@/components/PAGES/ProductPage";
import { Metadata } from "next";

const getProduct = async (id: string) => {
  const product = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return product;
};

export async function generateMetadata({ params }: any) {
  const product = await getProduct(params.id[0]);
  return {
    title: product?.name,
    description: product.description,
    keywords: product?.name.split(""),
    icons: {
      icon: "/trendy.svg",
    },
  };
}

const ProductDetailPage: FC<any> = async ({ params }) => {
  const product = await getProduct(params.id[0]);
  return <ProductPage params={params} product={product} />;
};

export default ProductDetailPage;
