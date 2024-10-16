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
  ctgName: string;
}

const ProductAddsSliderProductCard: FC<SectionSliderProductCardProps> = ({
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
  ctgName,
}) => {
  const sliderRef = useRef(null);
  //
  const [isShow, setIsShow] = useState(false);
  const [data_, setData_] = useState([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  const [fav, setFav] = useState([...data]);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory?ctgName=${ctgName}`
      )
      .then((res) => res.data.data)
      .then((data) => {
        console.log({ data });
        if (!data || data?.productList?.length === 0) {
          setNoData(true);
        }
        setData_(
          data.productList
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
              description: item.description,
              rates: item.rates,
              purchaseCount: item.purchaseCount,
              colors: item.colors,
              textArr: item.textArr,
            }))
        );
        setLoaded(true);
      });
  }, []);

  // useEffect(() => {
  //   if (data_.length > 0) {
  //     const OPTIONS: Partial<Glide.Options> = {
  //       perView: 4,
  //       gap: 32,
  //       bound: true,
  //       direction: "rtl",
  //       breakpoints: {
  //         1280: {
  //           perView: 4,
  //         },
  //         1024: {
  //           gap: 20,
  //           perView: 4,
  //         },
  //         768: {
  //           gap: 20,
  //           perView: 4,
  //         },
  //         640: {
  //           gap: 20,
  //           perView: 1.5,
  //         },
  //         500: {
  //           gap: 10,
  //           perView: 2,
  //         },
  //       },
  //     };
  //     if (!sliderRef.current) return;

  //     let slider = new Glide(sliderRef.current, OPTIONS);
  //     slider.mount();
  //     setIsShow(true);
  //     return () => {
  //       slider.destroy();
  //     };
  //   }
  // }, [sliderRef, data_]);

  if (noData)
    return (
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        لا يوجد منتجات حاليا
      </div>
    );

  return (
    <div
      className={`nc-SectionSliderProductCard ${className} ${
        modal && "modalSlider"
      }`}
    >
      <div ref={sliderRef} className={`flow-root`} style={{ direction: "rtl" }}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={ctgName}
          // hasNextPrev
        ></Heading>
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 dir-rtl adds category-products-section ">
          {data_?.length > 0
            ? data_.map((item, index) => (
                <ProductCard
                  // @ts-ignore
                  data={{ ...item, fav: false }}
                  featuredImage={undefined}
                  _id={""}
                  modal={modal}
                  selectCard={selectCard}
                />
              ))
            : null}
        </div>
        {/* <div
          style={{ direction: "rtl" }}
          className="glide__track"
          data-glide-el="track"
        >
          <ul
            style={{
              direction: "rtl",
              maxHeight: "400px",
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
          </ul>
        </div> */}
      </div>
      {!modal && (
        <div className="show-more">
          <Link
            href={`/category/${category?.category || category?._id}/${
              category?._id
            }`}
          >
            عرض المزيد
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductAddsSliderProductCard;
