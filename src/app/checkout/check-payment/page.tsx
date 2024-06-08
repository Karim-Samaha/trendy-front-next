"use client";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { useEffect, useState } from "react";
import I404Png from "@/images/404.png";
import NcImage from "@/shared/NcImage/NcImage";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/shared/Logo/Logo";

import axios from "axios";
import { useCart } from "react-use-cart";
const CheckoutCheck = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { emptyCart } = useCart();
  const id = searchParams.get("id");
  const gateway = searchParams.get("gateway");

  const [status, setStatus] = useState<any>({});
  const handleTabby = async () => {
    let tabbyId = await sessionStorage.getItem("tabbyId");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-tabby-status/${tabbyId}`
      )
      .then((response) => setStatus(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (gateway === "tabby") {
      handleTabby();
    } else {
      if (id) {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-payment-status/${id}`
          )
          .then((response) => setStatus(response.data))
          .catch((err) => console.log(err));
      }
    }
  }, [id]);
  useEffect(() => {
    if (status?.data?.status === "paid") {
      emptyCart();
      setTimeout(() => router.replace(`/account-order?from=checkout`), 3000);
    }
  }, [status]);
  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-2">
          <Logo />
          {status?.data?.status === "paid" ? (
            <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium dir-rtl">
              تم الدفع بنجاح...
            </span>
          ) : (
            <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium dir-rtl">
              جاري التحقق من عملية الدفع...
            </span>
          )}

          {/* <div className="pt-8">
          <ButtonPrimary href="/">Return Home Page</ButtonPrimary>
        </div> */}
        </header>
      </div>
    </div>
  );
};
export default CheckoutCheck;
