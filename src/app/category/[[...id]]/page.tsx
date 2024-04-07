import React, { FC } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
import axios from "axios";
import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

async function getCategories() {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category?subCtg=true&products=true`)
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
            productList: item.productList,
            subCategories: item.subCategories,
            featuredImage: {
              src: item?.image && `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`,
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
async function getSubCategoriesProducts(subCtgId) {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategory/${subCtgId}/`)
    .then((res) => res.data.data)
    .then((data) => {
      return data.productList?.map((item: any) => ({
        name: item.name,
        color: "bg-yellow-50",
        featuredImage: {
          category: 1,
          src: `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/imgs/Ramdan Gifts.jpeg`,
          blurHeight: 8,
          blurWidth: 7,
          height: 200,
          width: 362,
          allOfSizes: ["XS", "S"],
          link: "product-detail",
          numberOfReviews: 50,
          rating: "4.9",
        },
        id: item?._id,
        price: item.price,
        description: item.nameAr,
      }));
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}
const PageCollection2 = async ({ params }) => {
  const categories = await getCategories();
  console.log({ params });
  const currentCategory = await categories.find(
    (ctg) => ctg._id === params?.id[0]
  );
  let products;

  console.log(params.id.length);

  if (params.id.length > 1) {

    products = await getSubCategoriesProducts(params?.id[1]);
  } else {
    products = await currentCategory.productList?.map((item) => {
      return {
        name: item.name,
        color: "bg-yellow-50",
        featuredImage: {
          category: 1,
          src: `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/imgs/Ramdan Gifts.jpeg`,
          blurHeight: 8,
          blurWidth: 7,
          height: 200,
          width: 362,
          allOfSizes: ["XS", "S"],
          link: "product-detail",
          numberOfReviews: 50,
          rating: "4.9",
        },
        id: item?._id,
        price: item.price,
        description: item.nameAr,
      };
    });
  }
  return (
    <div className={`nc-PageCollection2`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="" style={{ width: "100%", direction: "rtl" }}>
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {currentCategory?.name}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {currentCategory?.desc}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {products?.length > 0
                    ? products.map((item, index) => (
                        <ProductCard data={item} key={index} />
                      ))
                    : PRODUCTS.map((item, index) => (
                        <ProductCard data={item} key={index} />
                      ))}
                </div>
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters categories={categories} />
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* <SectionSliderCollections /> */}
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* SUBCRIBES */}
        {/* <SectionPromo1 /> */}
      </div>
    </div>
  );
};

export default PageCollection2;
