"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS, DummyData } from "@/data/data";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import NcImage from "@/shared/NcImage/NcImage";
import { formatDate } from "@/utils/adjustNames";
import { json } from "stream/consumers";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: any;
  themeData?: Product[];
  order: number;
  modal?: true;
  selectCard: any;
  _id: string;
  title: string;
}

const ArticleSlider: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data,
  themeData = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  order = 1,
  modal = false,
  selectCard,
  title = "",
}) => {
  const sliderRef = useRef(null);
  //
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      direction: "rtl",
      // diirection: "rtl",
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 4,
        },
        768: {
          gap: 20,
          perView: 4,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 10,
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
  useEffect(() => {
    if (data.length === 0) {
      sessionStorage.setItem("articles", 0);
    }
  }, []);
  if (data.length <= 0) return null;
  return (
    <div
      className="why-trendy py-24 lg:py-10 border-b border-slate-200 dark:border-slate-700"
      id="articles"
    >
      <div
        className={`nc-SectionSliderProductCard ${className} ${
          modal && "modalSlider"
        }`}
      >
        <div
          ref={sliderRef}
          className={`flow-root ${isShow ? "" : "invisible"}`}
          style={{ direction: "rtl" }}
        >
          <Heading
            className={headingClassName}
            fontClass={headingFontClassName}
            rightDescText={"المقالات"}
            hasNextPrev
          ></Heading>
          <div
            style={{ direction: "rtl" }}
            className="glide__track"
            data-glide-el="track"
          >
            <ul
              style={{
                direction: "rtl",
              }}
              className="glide__slides prouct-slide article-slide"
            >
              {data.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <div
                    className={`nc-ProductCard relative flex flex-col bg-transparent `}
                  >
                    <Link
                      href={`/article-detail/${item?._id}/${item?.name}`}
                      className="absolute inset-0"
                    ></Link>
                    <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                      <Link
                        href={`/article-detail/${item?._id}/${item?.name}`}
                        className="block"
                      >
                        <NcImage
                          containerClassName="flex aspect-w-10 aspect-h-10 w-full h-0"
                          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs${item?.imageSrc}`}
                          className="object-cover w-full h-full drop-shadow-xl"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          alt="product"
                        />
                      </Link>
                    </div>
                  </div>
                  <h2 style={{ marginInlineStart: "20px", marginTop: "10px" }}>
                    {item?.name}
                  </h2>
                  <p style={{ opacity: ".6", marginInlineStart: "20px" }}>
                    {formatDate(item?.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSlider;
