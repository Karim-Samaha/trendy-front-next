import React, { useState } from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import ModalViewAllReviews from "./product-detail/ModalViewAllReviews";
import axios from "axios";
import ReviewItem from "@/components/ReviewItem";
import { StarIcon } from "@heroicons/react/24/solid";
import { getServerAuthSession } from "../server/auth";

async function getCategories() {
  const res = axios
    .get("http://localhost:5000/api/category?isHomeCategory=true")
    .then((res) => res.data.data)
    .then((data) => {
      return (
        data
          // .filter((item: { type: string }) => item.type === "HERO_IMG")
          .map((item: any) => ({
            name: item.name,
            desc: item.name,
            _id: item._id,
            // featuredImage: CATS_DISCOVER[0].featuredImage,
            color: "bg-yellow-50",
            featuredImage: {
              src: item?.image && `http://localhost:5000${item.image}`,
              blurHeight: 8,
              blurWidth: 7,
              height: 200,
              width: 362,
            },
          }))
      );
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

async function getBanners() {
  const res = await axios
    .get("http://localhost:5000/api/banners")
    .then((res) => res.data.data)
    .then((data) => {
      return data.reverse().map((item: any) => ({
        btnLink: item?.route,
        btnText: item?.name,
        heading: item?.name,
        type: item.type,
        image: {
          src: `http://localhost:5000${item.imageSrc}`,
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

async function PageHome() {
  const session = await getServerAuthSession(); //(1)
  console.log({ session });
  const categories = await getCategories();
  const banners: [{ type: string }] = await getBanners();
  // const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
  //   useState(false);

  return (
    <div className="nc-PageHome relative overflow-hidden">
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
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
          order={1}
          selectCard={undefined}
        />
        <SectionPromo2
          image={banners.filter(
            (item: { type: string }) => item.type === "BANNER"
          )}
        />

        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
          order={2}
          selectCard={undefined}
        />
        <SectionPromo2
          image={banners.filter(
            (item: { type: string }) => item.type === "BANNER"
          )}
        />

        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
          order={2}
          selectCard={undefined}
        />

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        {/* <SectionPromo1 /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

        {/* <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        {/* <SectionSliderLargeProduct cardStyle="style2" /> */}

        {/* <SectionSliderCategories /> */}

        {/* <SectionPromo3 /> */}

        {/* <SectionGridFeatureItems /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}
        {/* <SectionClientSay /> */}
        <div className="" style={{ direction: "rtl" }}>
          {/* HEADING */}
          <h2 className="text-2xl font-semibold flex items-center">
            <StarIcon style={{ color: "#EAB308" }} className="w-7 h-7 mb-0.5" />
            <span className="ml-1.5"> تقييمات عملاؤنا</span>
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
          </div>
        </div>

        {/* <ModalViewAllReviews
        // show={isOpenModalViewAllReviews}
        // onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      /> */}
      </div>
    </div>
  );
}

export default PageHome;
