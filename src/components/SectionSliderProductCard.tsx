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
  _id: string;
  title: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = DummyData,
  themeData = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  order = 1,
  modal = false,
  selectCard,
  title = "",
}) => {
  const sliderRef = useRef(null);
  //
  const [isShow, setIsShow] = useState(false);
  const [data_, setData_] = useState([...data]);
  const [fav, setFav] = useState([]);
  const { data: session } = useSession();
  const [category, setCategory] = useState<any>({});
  useEffect(() => {
    if (session) {
      _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorite?id=true`,
          {},
          //@ts-ignore
          { session }
        )
        .then((res) => setFav(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [session]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory?isHomeSection=${order}`
      )
      .then((res) => res.data.data)
      .then((data) => {
        setCategory({ ...data[0], productList: [] });
        setData_(
          data[0].productList
            .reverse()
            .filter((item: { active: boolean }) => item.active)
            .map((item: any) => ({
              ...themeData[0],
              name: item.name,
              id: item?._id,
              _id: item?._id,
              color: "bg-yellow-50",
              featuredImage: {
                id: item?._id,
                category: 1,
                src: `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${item.image}`,
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
              isOffer: item.isOffer,
              priceBefore: item.priceBefore,
              description: item.nameAr,
              rates: item.rates,
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

  return (
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
          rightDescText={title ? title : category?.name}
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
              // marginRight: modal ? "-54% " : "-54%",
              // width: "100%"
            }}
            className="glide__slides prouct-slide"
          >
            {data_.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard
                  // @ts-ignore
                  data={{ ...item, fav: fav.includes(item?._id) }}
                  featuredImage={undefined}
                  _id={""}
                  modal={modal}
                  selectCard={selectCard}
                />
              </li>
            ))}
            {/* {data_.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard
                  // @ts-ignore
                  data={{ ...item, fav: fav.includes(item?._id) }}
                  featuredImage={undefined}
                  _id={""}
                  modal={modal}
                  selectCard={selectCard}
                />
              </li>
            ))} */}
          </ul>
        </div>
      </div>
      {!modal && (
        <div className="show-more">
          <Link href={`/category/${category?._id}/${category?._id}`}>
            عرض المزيد
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionSliderProductCard;
