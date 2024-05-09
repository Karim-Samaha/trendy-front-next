export const revalidate = 1;
export const fetchCache = "force-no-store";

import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
// import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionPromo2 from "@/components/SectionPromo2";
import { Product, PRODUCTS, DummyData } from "@/data/data";
import axios from "axios";
import { Metadata } from "next";
import Partners from "@/components/Partners";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
// import DiscoverMoreReviews from "@/components/DiscoverMoreReviews";
const DiscoverMoreSlider = dynamic(
  () => import("@/components/DiscoverMoreSlider"),
  { ssr: false }
);
const DiscoverMoreReviews = dynamic(
  () => import("@/components/DiscoverMoreReviews"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Trendy Store",
  description: "",
  icons: {
    icon: "/trendy.svg",
  },
};
async function getCategories() {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`)
    .then((res) => res.data.data)
    .then((data) => {
      return data
        .filter((item: { active: boolean }) => item.active)
        .map((item: any) => ({
          name: item.name,
          desc: item.name,
          _id: item._id,
          // featuredImage: CATS_DISCOVER[0].featuredImage,
          color: "bg-yellow-50",
          featuredImage: {
            src:
              item?.image &&
              `${process.env.NEXT_PUBLIC_ASSETS_URL}${item.image}`,
            blurHeight: 8,
            blurWidth: 7,
            height: 200,
            width: 362,
          },
        }));
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

async function PageCategories() {
  const categories = await getCategories();
  // const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
  //   useState(false);
  return (
    <div className="nc-PageHome relative overflow-hidden dir-rtl">
      <div className="mt-24 lg:mt-32 categories-page">
        <h1 className="title">كل التصنيفات</h1>
        <div className="container">
          {categories.map((item: any) => {
            return (
              <div key={item._id} className="ctg-item">
                <Link
                  // ref={`/category${id}`}
                  className={`nc-CardCategory3 block`}
                  href={`/category/${item._id}`}
                >
                  <Image
                    alt=""
                    src={item.featuredImage || ""}
                    className=" drop-shadow-xl"
                    style={{ borderRadius: "20px" }}
                  />
                  <h3>{item.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PageCategories;
