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
import Partners from "@/components/Partners";
import dynamic from "next/dynamic";
import Alert from "@/components/Alert";
import ArticleSlider from "@/components/ArticleSlider";
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
      console.log(data)
      return data
        .reverse()
        .filter((item: { active: boolean }) => item.active)
        .map((item: any) => ({
          name: item.name,
          desc: item.name,
          _id: item._id,
          subCategories: item?.subCategories,
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
async function getArticles() {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`)
    .then((res) => res.data.data)
    .then((data) => {
      return data.filter((item: { active: boolean }) => item.active);
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
      return data
        .filter((item) => item.active)
        .map((item: any) => {
          return {
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
          };
        });
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
async function getHomePageSectionsSettings() {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/homepage-sections-settings`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

export const metadata: any = async () => {
  return {
    title: " الزهرة العصرية - الرئيسية  ",
    keywords: "الزهرة العصرية",
    description:
      "استعد لتجربة رائعة مع الزهرة العصرية Trendy Rose في عالم الورود والهدايا. باقات الورود الفاخرة والهدايا المميزة تعكس الأناقة والتميز. اختر الخيار المثالي لأي مناسبة وأضف لمسة سحرية على لحظاتك الخاصة. خدمة التوصيل السريعة والاهتمام بأدق التفاصيل تضمن رضاك التام. استمتع بتجربة تسوق رائعة  اطلب الآن واصنع لحظات لا تنسى مع Trendy Rose.",
    icons: {
      icon: "/trendy.svg",
    },
  };
};

async function PageHome() {
  const categories = await getCategories();
  const reviews = await getReviews();
  const articles = await getArticles();
  const banners: [{ type: string }] = await getBanners();
  const sectionsSettings = await getHomePageSectionsSettings();
  const sectionsCount =
    (await sectionsSettings?.data?.homePageSettings.sectionsCount) || 3;
  const sectionsInfo = sectionsSettings?.cateoriesInfo;

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Alert
        text={
          banners.find((item: { type: string }) => item?.type === "ALERT")?.name
        }
      />
      <SectionHero2
        data_={banners.filter(
          (item: { type: string }) => item?.type === "HERO_IMG"
        )}
      />

      <div className="mt-24 lg:mt-24">
        <DiscoverMoreSlider categories={categories} />
      </div>
      <div className="container relative space-y-24 my-24 lg:space-y-24 lg:my-24 product-section">
        <SectionSliderProductCard
          data={DummyData}
          order={sectionsInfo[0]?._id}
          selectCard={undefined}
        />
        <SectionPromo2
          image={
            banners.filter(
              (item: { type: string }) => item.type === "BANNER"
            )[0]
          }
        />
        {sectionsCount > 1 && (
          <SectionSliderProductCard
            data={DummyData}
            order={sectionsInfo[1]?._id}
            selectCard={undefined}
          />
        )}

        <SectionPromo2
          image={
            banners.filter(
              (item: { type: string }) => item.type === "BANNER"
            )[1]
          }
        />
        {sectionsCount > 2 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[2]?._id}
            selectCard={undefined}
          />
        )}
        {sectionsCount > 3 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[3]?._id}
            selectCard={undefined}
          />
        )}
        {sectionsCount > 4 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[4]?._id}
            selectCard={undefined}
          />
        )}
        {sectionsCount > 5 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[5]?._id}
            selectCard={undefined}
          />
        )}
        {sectionsCount > 6 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[6]?._id}
            selectCard={undefined}
          />
        )}
        {sectionsCount > 7 && (
          <SectionSliderProductCard
            data={PRODUCTS}
            order={sectionsInfo[7]?._id}
            selectCard={undefined}
          />
        )}
        <div className="why-trendy py-24 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <ArticleSlider
          data={articles}
          order={0}
          selectCard={undefined}
          _id={""}
          title={""}
        />

        <Partners />

        <div className="web-rates container relative space-y-24 my-24 lg:space-y-32 lg:my-24">
          <DiscoverMoreReviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
