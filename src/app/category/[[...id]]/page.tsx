import React, { FC } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
import axios from "axios";
import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import ProductSection from "../ProductsSection";
async function getCategories() {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?subCtg=true&products=true`
    )
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
              src:
                item?.image &&
                `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs${item.image}`,
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
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${subCtgId}/`)
    .then((res) => res.data.data)
    .then((data) => {
      return data.productList?.map((item: any) => ({
        name: item.name,
        color: "bg-yellow-50",
        featuredImage: {
          category: 1,
          src: `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/Ramdan Gifts.jpeg`,
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
        _id: item?._id,
        price: item.price,
        priceBefore: item.priceBefore,
        isOffer: item?.isOffer,
        description: item.nameAr,
      }));
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}
async function getCategoryAllProducts(ctgId) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${ctgId}/all-products`
    )
    .then((res) => res.data.data)
    .then((data) => {
      return data.map((item: any) => ({
        name: item.name,
        color: "bg-yellow-50",
        featuredImage: {
          category: 1,
          src: `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/Ramdan Gifts.jpeg`,
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
        _id: item?._id,
        price: item.price,
        priceBefore: item.priceBefore,
        isOffer: item?.isOffer,
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
  const currentCategory = await categories.find(
    (ctg) => ctg._id === params?.id[0]
  );
  let products;

  if (params.id.length > 1) {
    products = await getSubCategoriesProducts(params?.id[1]);
  } else {
    products = await getCategoryAllProducts(params?.id[0]);
  }
  return (
    <div className={`nc-PageCollection2`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="" style={{ width: "100%", direction: "rtl" }}>
            <h2
              style={{ marginTop: "-25px" }}
              className="block text-2xl sm:text-3xl lg:text-4xl font-semibold"
            >
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
              <ProductSection products={products} />
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters categories={categories} params={params} />
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
