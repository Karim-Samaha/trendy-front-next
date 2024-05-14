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

export const metadata: Metadata = {
  title: "My Page Title",
};

const ProductDetailPage: FC<any> = ({ params }) => {
  return <ProductPage params={params} />;
};

export default ProductDetailPage;
