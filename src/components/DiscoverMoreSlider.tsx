"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Link from "next/link";

const DiscoverMoreSlider: FC<any> = ({ categories }) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 3,
      gap: 32,
      bound: true,
      perTouch: false,
      direction: "rtl",
      type: "slider",
      rewind: false,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 3,
        },
        1279: {
          gap: 20,
          perView: 3,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 2,
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
    <div
      ref={sliderRef}
      // style={{ direction: "rtl" }}
      className={`nc-DiscoverMoreSlider nc-p-l-container ${
        isShow ? "" : "invisible"
      }`}
      style={{ direction: "rtl" }}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        // rightDescText="التصنيفات"
        hasNextPrev
      >
        <h2 className="title">التصنيفات</h2>
      </Heading>
      <div style={{ direction: "rtl" }} className="" data-glide-el="track">
        <ul
          style={{ direction: "ltr", maxHeight: "300px" }}
          className="glide__slides"
        >
          {categories.map(
            (
              item: {
                name: string | undefined;
                desc: string | undefined;
                featuredImage: any;
                color: string | undefined;
                _id: string;
              },
              index: React.Key | null | undefined
            ) => (
              <li key={index} className={`glide__slide`}>
                <CardCategory3
                  name={item.name}
                  desc={item.desc}
                  featuredImage={item.featuredImage}
                  color={item.color}
                  id={item._id}
                  subCategories={item.subCategories}
                />
              </li>
            )
          )}
        </ul>
      </div>
      <div className="show-more" style={{ width: "100vw" }}>
        <Link href={`/categories  `}>عرض الكل</Link>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
