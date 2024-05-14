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
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
// import DiscoverMoreReviews from "@/components/DiscoverMoreReviews";
const DiscoverMoreSlider = dynamic(
  () => import("@/components/DiscoverMoreSlider"),
  { ssr: false }
);
const DiscoverMoreReviews = dynamic(
  () => import("@/components/DiscoverMoreReviews"),
  { ssr: false }
);

async function getCategories() {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`)
    .then((res) => res.data.data)
    .then((data) => {
      return data
        .reverse()
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

async function getBanners() {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banners`)
    .then((res) => res.data.data)
    .then((data) => {
      return data.reverse().map((item: any) => ({
        btnLink: item?.route,
        btnText: item?.name,
        heading: item?.name,
        type: item.type,
        what: item.imageSrc,
        route: item.route,
        name: item.name,
        image: {
          src: `${process.env.NEXT_PUBLIC_ASSETS_URL}${item.imageSrc}`,
          height: 1001,
          width: 1000,
          blurDataURL:
            "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-right-2.dc1c84f6.png&w=8&q=70",
          blurWidth: 8,
          blurHeight: 8,
        },
        subHeading: "",
      }));
    })
    .catch((err) => console.log(err));
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}
async function getReviews() {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}
async function getHeadTags() {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
    .then((res) => res.data.data)
    .then((data) => data.find((item: any) => item.type === "HEAD"))
    .catch((err) => console.log(err));
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}
const headTags = { decb: getHeadTags().then((rs) => rs) };
console.log(headTags);
export const metadata: any = async () => {
  return {
    title: "Trendy Store",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
};

async function PageHome() {
  const categories = await getCategories();
  const reviews = await getReviews();
  const banners: [{ type: string }] = await getBanners();

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Alert
        text={
          banners.find((item: { type: string }) => item.type === "ALERT")?.name
        }
      />
      <SectionHero2
        data_={banners.filter(
          (item: { type: string }) => item.type === "HERO_IMG"
        )}
      />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider categories={categories} />
      </div>
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          data={DummyData}
          order={1}
          selectCard={undefined}
        />
        <SectionPromo2
          image={
            banners.filter(
              (item: { type: string }) => item.type === "BANNER"
            )[0]
          }
        />

        <SectionSliderProductCard
          data={DummyData}
          order={2}
          selectCard={undefined}
        />
        <SectionPromo2
          image={
            banners.filter(
              (item: { type: string }) => item.type === "BANNER"
            )[1]
          }
        />

        <SectionSliderProductCard
          data={PRODUCTS}
          order={3}
          selectCard={undefined}
        />

        <div className="why-trendy py-24 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <Partners />

        <div className="web-rates container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <DiscoverMoreReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
