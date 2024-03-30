"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import axios from "axios";
import Link from "next/link";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  themeData?: Product[];
  order: number;
  modal?: true;
  selectCard: any;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  themeData = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  order = 1,
  modal = false,
  selectCard
}) => {
  const sliderRef = useRef(null);
  //
  const [isShow, setIsShow] = useState(false);
  const [data_, setData_] = useState([...data]);
  const [category, setCategory] = useState<any>({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/subcategory?isHomeSection=${order}`)
      .then((res) => res.data.data)
      .then((data) => {
        setCategory({ ...data[0], productList: [] });
        setData_(
          data[0].productList.reverse().map((item: any) => ({
            ...themeData[0],
            name: item.name,
            id: item?._id,
            _id: item?._id,
            color: "bg-yellow-50",
            featuredImage: {
              id: item?._id,
              category: 1,
              src: "http://localhost:5000/public/imgs/Ramdan Gifts.jpeg",
              blurHeight: 8,
              blurWidth: 7,
              height: 200,
              width: 362,
              allOfSizes: ["XS", "S"],
              link: "product-detail",
              numberOfReviews: 50,
              rating: "4.9",
            },
            price: item.price,
            description: item.nameAr,
          }))
        );
      });
  }, []);

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
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
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

  return (
    <div className={`nc-SectionSliderProductCard ${className} ${modal && 'modalSlider'}`} >
      <div
        ref={sliderRef}
        className={`flow-root ${isShow ? "" : "invisible"}`}
        style={{ direction: "rtl" }}
      >
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={category?.nameAr}
          hasNextPrev
        >
          {/* {heading || `New Arrivals`} */}
        </Heading>
        <div
          style={{ direction: "rtl" }}
          className="glide__track"
          data-glide-el="track"
        >
          <ul
            style={{
              direction: "ltr",
              marginRight: modal ? "-514px " : "-688px",
            }}
            className="glide__slides prouct-slide"
          >
            {data_.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} featuredImage={undefined} _id={""} modal={modal} selectCard={selectCard} />
              </li>
            ))}
            {data_.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} featuredImage={undefined} _id={""} modal={modal} selectCard={selectCard} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!modal && (
        <div className="show-more">
          <Link href="/">عرض المزيد</Link>
        </div>
      )}
    </div>
  );
};

export default SectionSliderProductCard;
