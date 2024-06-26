"use client";
import React, { FC, useState, useEffect } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import HeaderFilterSearchPage from "@/components/HeaderFilterSearchPage";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import axios from "axios";
const PageSearch = ({ params }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search/${params.keyword}`
      )
      .then((res) => res.data.data)
      .then((data) => {
        setData(
          data.map((item: any) => ({
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
            description: item.nameAr,
          }))
        );
        setLoaded(true);
      });
  }, []);
  return (
    <div className={`nc-PageSearch`} data-nc-id="PageSearch">
      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
      />
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7"></header>
      </div>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}

          {/* LOOP ITEMS */}
          {data.length <= 0 && loaded && (
            <div className="flex-1 dir-rtl">
              <h3 className="hint-err">
                لا يوجد نتائج للبحث : <span>{params.keyword}</span>
              </h3>{" "}
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10 dir-rtl">
            {data.length > 0 && loaded ? (
              <>
                {" "}
                {data.map((item, index) => (
                  <ProductCard
                    data={item}
                    key={index}
                    featuredImage={undefined}
                    _id={""}
                    modal={false}
                    selectCard={undefined}
                  />
                ))}{" "}
              </>
            ) : null}
          </div>

          {/* PAGINATION */}
          {data.length > 10 && loaded ? (
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>اعرض المزيد</ButtonPrimary>
            </div>
          ) : null}
        </main>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />
        {/* <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* SUBCRIBES */}
      </div>
    </div>
  );
};

export default PageSearch;
