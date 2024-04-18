"use client";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useEffect, useState } from "react";
import axios from "axios";
import _axios from "@/contains/api/axios";
import { useSession } from "next-auth/react";
const AccountSavelists = () => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!session?.user) return;
    _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorite`,
        {},
        //@ts-ignore
        { session }
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
            price: item.price,
            description: item.nameAr,
            rates: item.rates,
          }))
        );
      });
  }, [session]);

  if (data.length <= 0)
    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold dir-rtl">
            المنتجات المفضلة
          </h2>
        </div>
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          لم يتم اضافة منتجات في القائمة
        </div>
      </div>
    );
  return (
    <div className="space-y-10 sm:space-y-12">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold dir-rtl">
          المنتجات المفضلة
        </h2>
      </div>
      <div className="fav grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 dir-rtl">
        {data.map((stay) => (
          <ProductCard
            key={stay.id}
            data={{ ...stay, fav: true }}
            featuredImage={undefined}
            _id={""}
            modal={false}
            selectCard={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountSavelists;
