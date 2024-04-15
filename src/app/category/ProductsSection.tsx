"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
const ProductSection = ({ products }: any) => {
  const searchParams = useSearchParams();
  const [renderdData, setRenderedData] = useState<any>(products);
  const priceFrom = searchParams.get("from");
  const priceTo = searchParams.get("to");
  useEffect(() => {
    if (!priceFrom || !priceTo) return;
    let filteredData = products.filter(
      (item: any) => item.price >= priceFrom && item.price <= priceTo
    );
    setRenderedData(filteredData);
  }, [priceFrom, priceTo]);
  return (
    <>
      <div className="flex-1 ">
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 dir-rtl">
          {products?.length > 0
            ? renderdData.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))
            : null}
        </div>
      </div>
      {products?.length <= 0 ? (
        <h4 className="no-product">لا يوجد منتجات حاليا</h4>
      ) : null}
    </>
  );
};

export default ProductSection;
