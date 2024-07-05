"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
async function getSubCategoriesProducts(subCtgId: string, limit: number) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/subcategory/${subCtgId}?channel=web&limit=${limit}`
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
async function getCategoryAllProducts(ctgId: string, limit: number) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${ctgId}/all-products?channel=web&limit=${limit}`
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

const ProductSection = ({ products, params }: any) => {
  const searchParams = useSearchParams();
  const [renderdData, setRenderedData] = useState<any>(products);
  const [requestedAmount, setRequestedAmount] = useState<number>(12);
  const priceFrom = searchParams.get("from");
  const priceTo = searchParams.get("to");
  useEffect(() => {
    if (!priceFrom || !priceTo) return;
    let filteredData = products.filter(
      (item: any) => item.price >= priceFrom && item.price <= priceTo
    );
    setRenderedData(filteredData);
  }, [priceFrom, priceTo]);

  const handleShowMoreButton = () => {
    setRequestedAmount((prev) => (prev += 9));
  };

  const getDataBasedOnRequest = async () => {
    let products;
    if (params.id.length > 1) {
      products = await getSubCategoriesProducts(params?.id[1], requestedAmount);
    } else {
      products = await getCategoryAllProducts(params?.id[0], requestedAmount);
    }
    setRenderedData(products);
  };
  useEffect(() => {
    if (requestedAmount !== 12) {
      getDataBasedOnRequest();
    }
  }, [requestedAmount]);
  return (
    <>
      <div className="flex-1 ">
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 dir-rtl">
          {products?.length > 0
            ? renderdData.map((item, index) => (
                <ProductCard
                  data={item}
                  key={index}
                  featuredImage={undefined}
                  _id={""}
                  modal={false}
                  selectCard={undefined}
                  setImageErrorObj={undefined}
                />
              ))
            : null}
        </div>
        <div
          className="flex"
          style={{ justifyContent: "center", marginTop: "50px" }}
        >
          {products.length >= 8 && (
            <ButtonPrimary onClick={handleShowMoreButton}>
              عرض المزيد
            </ButtonPrimary>
          )}
        </div>
      </div>
      {products?.length <= 0 ? (
        <h4 className="no-product">لا يوجد منتجات حاليا</h4>
      ) : null}
    </>
  );
};

export default ProductSection;
