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
          description: item.description,
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
          description: item.description,
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
  const [requestedAmount, setRequestedAmount] = useState<number>(20);
  const [currentSort, setCurrentSort] = useState("");
  const [sortMenu, setSortMenu] = useState(false);
  const priceFrom = searchParams.get("from");
  const priceTo = searchParams.get("to");
  const offer = searchParams.get("offer");

  const handleShowMoreButton = () => {
    setRequestedAmount((prev) => (prev += 10));
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
  const handleFilteration = async () => {
    if (!priceFrom || !priceTo) return;
    setRequestedAmount(30);
    await getDataBasedOnRequest();
    let filteredData = products.filter(
      (item: any) => item.price >= priceFrom && item.price <= priceTo
    );
    if (offer) {
      let willBeWithOffer = JSON.parse(offer);
      if (willBeWithOffer) {
        filteredData = filteredData.filter((item) => item.priceBefore > 0);
      }
    }
    setRenderedData(filteredData);
  };
  useEffect(() => {
    handleFilteration();
  }, [priceFrom, priceTo, offer]);
  useEffect(() => {
    if (requestedAmount !== 12) {
      getDataBasedOnRequest();
    }
  }, [requestedAmount]);
  const sortOptions = [
    { name: "الاحدث", value: "new" },
    { name: "الاكثر شعبية", value: "purchase" },
    { name: "الاقل سعر", value: "lowPrice" },
    { name: "الاكثر سعر", value: "highPrice" },
  ];
  const handleSort = (sortValue: string) => {
    setCurrentSort(sortValue);
    setSortMenu(false);
    let sortedData;
    if (sortValue === "new") {
      sortedData = renderdData.sort((a, b) => {
        if (a.condition === b.condition) {
          return 0; // no change in order
        } else if (a.condition) {
          return -1; // a comes before b
        } else {
          return 1; // b comes before a
        }
      });
    } else if (sortValue === "purchase") {
      sortedData = renderdData.sort(
        (a, b) => b.purchaseCount - a.purchaseCount
      );
    } else if (sortValue === "highPrice") {
      sortedData = renderdData.sort((a, b) => b.price - a.price);
    } else if (sortValue === "lowPrice") {
      sortedData = renderdData.sort((a, b) => a.price - b.price);
    }
    setRenderedData(sortedData);
  };
  return (
    <>
      <div className="flex-1 ">
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>
            النتائج : {renderdData.length} منتج
          </h3>
          <div className="filter">
            <p onClick={() => setSortMenu(!sortMenu)}>
              {currentSort
                ? sortOptions.find((item) => item.value === currentSort)?.name
                : "ترتيب حسب"}
            </p>
            {sortMenu && (
              <div className="menu">
                {sortOptions.map((item) => {
                  return (
                    <p
                      className="listItem"
                      key={item.value}
                      onClick={() => {
                        handleSort(item.value);
                      }}
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
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
          {renderdData.length >= 8 && (
            <ButtonPrimary onClick={handleShowMoreButton}>
              عرض المزيد
            </ButtonPrimary>
          )}
        </div>
      </div>
      {renderdData?.length <= 0 ? (
        <h4 className="no-product">لا يوجد منتجات حاليا</h4>
      ) : null}
    </>
  );
};

export default ProductSection;
