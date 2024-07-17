export const revalidate = 1;
export const fetchCache = "force-no-store";

import React from "react";
// import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
// import SectionHero2 from "@/components/SectionHero/SectionHero2";
// import SectionSliderProductCard from "@/components/SectionSliderProductCard";
// import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
// import SectionPromo2 from "@/components/SectionPromo2";
// import { Product, PRODUCTS, DummyData } from "@/data/data";
import axios from "axios";
// import Partners from "@/components/Partners";
import dynamic from "next/dynamic";
// import Alert from "@/components/Alert";
// import ArticleSlider from "@/components/ArticleSlider";
import Logo from "@/shared/Logo/Logo";
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
    <div
      className="nc-PageHome relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo />
      <h1 style={{fontSize: "35px", padding: "30px 10px", lineHeight: "57px", textAlign: "center"}} >
        عملائنا الكرام: المتجر في وضع الصيانة مؤقتا لتحسين تجربتكم , ويمكنكم الطلب من 
        <a href="https://wa.me/966539123890" target="_blank" style={{color: "#77E377"}}>
          {" "}
        خلال الواتس
        {" "}
        </a>
        وشكرا
      </h1>
    </div>
  );
}

export default PageHome;
