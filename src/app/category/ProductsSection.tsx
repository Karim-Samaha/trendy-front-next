"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import _axios from "@/contains/api/axios";
import Link from "next/link";
import Document from "next/document";
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
            rating: "5",
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
            rating: "5",
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

const ProductSection = ({ products, params, category }: any) => {
  const searchParams = useSearchParams();
  const [renderdData, setRenderedData] = useState<any>(products);
  const [requestedAmount, setRequestedAmount] = useState<number>(80);
  const [currentSort, setCurrentSort] = useState("");
  const [sortMenu, setSortMenu] = useState(false);
  const priceFrom = searchParams.get("from");
  const priceTo = searchParams.get("to");
  const offer = searchParams.get("offer");
  const [loaded, setLoaded] = useState(true);
  const [filterLoaded, setFilterLoaded] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [size, setSize] = useState(0);
  const [requestedMore, setRequestedMore] = useState(false);
  const [windowSize, setWindowSize] = useState(1200);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (windowSize < 700) {
      window.scrollTo(0, 420);
    }
  }, [windowSize]);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const handleShowMoreButton = () => {
    setRequestedAmount((prev) => (prev += 10));
    setRequestedMore(true);
  };
  {
    console.log(category);
  }
  const getDataBasedOnRequest = async () => {
    let products;
    if (params.id.length > 1) {
      products = await getSubCategoriesProducts(params?.id[1], requestedAmount);
    } else {
      products = await getCategoryAllProducts(params?.id[0], requestedAmount);
    }
    if (renderdData.length === products.length && requestedMore) {
      setLoadedAll(true);
    }
    setRenderedData(products);
    setLoaded(true);
  };
  const getData = async () => {
    let products;
    if (params.id.length > 1) {
      products = await getSubCategoriesProducts(params?.id[1], 50);
    } else {
      products = await getCategoryAllProducts(params?.id[0], 50);
    }
    if (renderdData.length === products.length && renderdData.length !== 20) {
      setLoadedAll(true);
    }
    setLoaded(true);
    return products;
  };
  const handleFilteration = async () => {
    if (!priceFrom || !priceTo) return;
    setFilterLoaded(false);
    setRequestedAmount(50);
    let reqProducts = await getData();
    let filteredData = reqProducts.filter(
      (item: any) => item.price >= priceFrom && item.price <= priceTo
    );
    if (offer) {
      let willBeWithOffer = JSON.parse(offer);
      if (willBeWithOffer) {
        filteredData = filteredData.filter((item) => item.priceBefore > 0);
      }
    }
    setRenderedData(filteredData);
    setSize(filteredData.length);
    setFilterLoaded(true);
    setLoaded(true);
  };

  useEffect(() => {
    if (priceFrom && priceTo) {
      setLoadedAll(true);
      handleFilteration();
    }
  }, [priceFrom, priceTo, offer]);

  const getSize = (id: string, type: string) => {
    if (priceFrom || priceTo || offer) return null;
    _axios
      .get(
        type === "category"
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/size/${id}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/size/${id}?type=subCategory`
      )
      .then((res) => {
        setSize(res.data?.size);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (params?.id[1]) {
      getSize(params?.id[1], "");
    } else {
      getSize(params?.id[0], "category");
    }
  }, []);
  useEffect(() => {
    if (requestedAmount !== 12 && !priceFrom && !priceTo) {
      setLoaded(false);
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
      <div className="flex-1 ctgPage-products">
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
          }}
          className="products-sort"
        >
          <h3 style={{ marginBottom: "30px" }}>
            النتائج : {size || renderdData.length} منتج
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

        {category?.subCategories?.length > 1 ? (
          <div className="res-subCtg">
            {category.subCategories?.map((subItem) => {
              return (
                <div
                  className="res-subCtg-item"
                  key={subItem?._id}
                  style={{
                    backgroundColor:
                      params?.id[1] === subItem?._id ? "#55a8b9" : "#fff",
                    color: params?.id[1] === subItem?._id ? "#fff" : "#55a8b9",
                  }}
                >
                  <Link href={`/category/${category?._id}/${subItem?._id}`}>
                    {subItem?.name}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}

        {filterLoaded ? (
          <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 dir-rtl category-products-section">
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
        ) : (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span
              className="loader-products"
              style={{ margin: "0 auto" }}
            ></span>
          </div>
        )}
        <span className="loader"></span>

        {/* <div
          className="flex"
          style={{ justifyContent: "center", marginTop: "50px" }}
        >
          {renderdData.length >= 8 && !loadedAll && filterLoaded && (
            <ButtonPrimary onClick={handleShowMoreButton}>
              {loaded ? "عرض المزيد" : <span className="loader"></span>}
            </ButtonPrimary>
          )}
        </div> */}
      </div>
      {renderdData?.length <= 0 ? (
        <h4 className="no-product">لا يوجد منتجات حاليا</h4>
      ) : null}

      <div
        id="gb-widget-8323"
        className="cgt-scroll-top"
        style={{
          bottom: "14px",
          right: "16px",
          boxSizing: "border-box",
          position: "fixed",
          zIndex: "99999999999",
          direction: "ltr",
          textAlign: "right",
        }}
      >
        {/* <div className="text-us-msg">راسلنا</div> */}
        <div className="sc-q8c6tt-3 hKYcqG">
          <div
            color="#4dc247"
            style={{
              fontSize: "10px",

              backgroundColor: "#55a8b9",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              display: scrollPosition >= 400 ? "flex" : "none",
            }}
            className="sc-q8c6tt-1 deQKmp"
            onClick={scrollTop}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M12 5V19M12 5L6 11M12 5L18 11"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
