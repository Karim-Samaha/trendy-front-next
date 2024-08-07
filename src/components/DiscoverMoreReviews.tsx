"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CATS_DISCOVER } from "./CardCategories/data";
import axios from "axios";
import { listOf4 } from "@/utils/adjustNames";
import ReviewItem from "./ReviewItem";
const staticReviews = [
  {
    _id: "1",
    storeReview: "منتجات رائعه و فخمة",
    storeRating: 5,
    productReview: "",
    productRating: 5,
    shareProductReview: false,
    shareStoreReview: true,
    name: "فيصل عبد العزيز",
    user: "65f591766bd1131a8195f021",
    product: "666d781c2965c08c4d2bafef",
    createdAt: "2024-07-14T11:37:22.294Z",
    updatedAt: "2024-07-14T11:38:40.693Z",
    __v: 0,
    id: "1",
  },
  {
    _id: "2",
    storeReview: "ممتاز",
    storeRating: 5,
    productReview: "",
    productRating: 5,
    shareProductReview: false,
    shareStoreReview: true,
    name: "نور خالد",
    user: "65f591766bd1131a8195f021",
    product: "666d781c2965c08c4d2bafef",
    createdAt: "2024-07-14T11:37:22.294Z",
    updatedAt: "2024-07-14T11:38:40.693Z",
    __v: 0,
    id: "2",
  },
  {
    _id: "3",
    storeReview: "جودة المنتجات جيدة جدا",
    storeRating: 5,
    productReview: "Good",
    productRating: 5,
    shareProductReview: true,
    shareStoreReview: true,
    name: "عصمت الشعري",
    user: "65f591766bd1131a8195f021",
    product: "666d781c2965c08c4d2bafef",
    createdAt: "2024-07-14T11:37:22.294Z",
    updatedAt: "2024-07-14T11:38:40.693Z",
    __v: 0,
    id: "3",
  },
  {
    _id: "4",
    storeReview: "جودة واسعار المنتجات جيدة مقارنه بالمنافسين",
    storeRating: 5,
    productReview: "Good",
    productRating: 5,
    shareProductReview: true,
    shareStoreReview: true,
    name: "عبد الله",
    user: "65f591766bd1131a8195f021",
    product: "666d781c2965c08c4d2bafef",
    createdAt: "2024-07-14T11:37:22.294Z",
    updatedAt: "2024-07-14T11:38:40.693Z",
    __v: 0,
    id: "4",
  },
];
const DiscoverMoreReviews: FC<any> = ({ reviews }) => {
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  // let sortedReviews = listOf4(reviews);
  let sortedReviews = listOf4(staticReviews);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 1,
      gap: 0,
      bound: true,
      direction: "rtl",
      breakpoints: {
        1280: {
          gap: 500,
          perView: 1,
        },
        1279: {
          gap: 500,
          perView: 1,
        },
        1023: {
          gap: 500,
          perView: 1,
        },
        768: {
          gap: 1,
          perView: 1,
        },
        500: {
          gap: 1,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div className={`nc-SectionSliderProductCard`}>
      <div
        ref={sliderRef}
        // style={{ direction: "rtl" }}
        className={`flow-root ${isShow ? "" : "invisible"}`}
        style={{ direction: "rtl" }}
      >
        <Heading
          desc=""
          // rightDescText="التصنيفات"
          hasNextPrev
        >
          <h2 className="title">أراء العملاء</h2>
        </Heading>
        <div
          style={{ direction: "rtl" }}
          className="glide__track"
          data-glide-el="track"
        >
          {" "}
          <ul
            style={{
              marginRight: "0%",
            }}
            className="glide__slides prouct-slide"
          >
            {sortedReviews.map((reviewList: [any], i) => {
              return (
                <li key={i} className={`glide__slide`}>
                  <div className="mt-10 dir-rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-5">
                      {reviewList?.map((reviewItem: any, i) => {
                        return (
                          <ReviewItem
                            key={i}
                            data={{
                              comment: reviewItem.storeReview,
                              date: reviewItem?.createdAt?.split("T")[0],
                              name: reviewItem.name,
                              starPoint: reviewItem.storeRating,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}

            {/* */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMoreReviews;
