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
const DiscoverMoreReviews: FC<any> = ({ reviews }) => {
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  let sortedReviews = listOf4(reviews);
  // console.log({ format: data });
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
          <h2 className="title">التقيمات</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
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
