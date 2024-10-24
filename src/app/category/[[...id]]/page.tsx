import React, { FC } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
import axios from "axios";
import ProductSection from "../ProductsSection";

async function getCategories() {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?subCtg=true&products=true?channel=web`
    )
    .then((res) => res.data.data)
    .then((data) => {
      return data
        .filter((item: { active: boolean }) => item.active)
        .map((item: any) => ({
          name: item.name,
          desc: item.description,
          _id: item._id,
          color: "bg-yellow-50",
          productList: item.productList,
          subCategories: item.subCategories.filter(
            (item: { active: boolean }) => item.active
          ),
          featuredImage: {
            src:
              item?.image &&
              `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs${item.image}`,
            blurHeight: 8,
            blurWidth: 7,
            height: 200,
            width: 362,
          },
        }));
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}
export async function generateMetadata({ params }: any) {
  let data;
  if (params.id.length > 1) {
    data = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${params?.id[1]}?channel=web`
      )
      .then((res) => res.data.data);
  } else {
    try {
      data = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${params?.id[0]}`)
        .then((res) => res.data.data);
    } catch (err) {
      console.log(err )
    }
  }
  return {
    title: data?.name,
    keywords: data?.keywords,
    description: data?.description,
    icons: {
      icon: "/trendy.svg",
    },
  };
}

async function getSubCategoriesProducts(subCtgId) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${subCtgId}?channel=web&limit=80`
    )
    .then((res) => res.data.data)
    .then((data) => {
      return data?.productList
        ?.filter((item: { active: boolean }) => item.active)
        .map((item: any) => ({
          name: item.name,
          color: "bg-yellow-50",
          featuredImage: {
            category: 1,
            src: `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${item.image}`,
            blurHeight: 8,
            blurWidth: 7,
            height: 200,
            width: 362,
            allOfSizes: ["XS", "S"],
            link: "product-detail",
            numberOfReviews: 50,
            rating: "5",
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${ctgId}/all-products?channel=web&limit=80`
    )
    .then((res) => res.data.data)
    .then((data) => {
      return data
        .filter((item: { active: boolean }) => item.active)
        .map((item: any) => ({
          name: item.name,
          color: "bg-yellow-50",
          featuredImage: {
            category: 1,
            src: `${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs/${item.image}`,
            blurHeight: 8,
            blurWidth: 7,
            height: 200,
            width: 362,
            allOfSizes: ["XS", "S"],
            link: "product-detail",
            numberOfReviews: 50,
            rating: "5",
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
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28 page-holder">
        <div className="space-y-10 lg:space-y-14" >
          {/* HEADING */}
          <div className="" style={{ width: "100%", direction: "rtl" }} >
            <h1
              style={{ marginTop: "-25px" }}
              className="block text-2xl sm:text-3xl lg:text-4xl font-semibold"
            >
              {currentCategory?.name}
            </h1>
            <span
              className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base"
              style={{ lineHeight: "30px" }}
            >
              {currentCategory?.desc}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700 ctg-liner" />
          <main className="ctg-page-main" >
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row" >
              <ProductSection
                products={products}
                params={params}
                category={categories.find(
                  (item: { _id: any; }) => item?._id === params?.id[0]
                )}
              />
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0 ctg-liner"></div>
              <div className="lg:w-1/3 xl:w-1/4 pr-4 ctgPage-filter">
                <SidebarFilters categories={categories} params={params} />
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default PageCollection2;
