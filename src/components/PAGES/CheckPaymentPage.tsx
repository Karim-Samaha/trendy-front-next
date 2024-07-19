"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/shared/Logo/Logo";
import axios from "axios";
import { useCart } from "react-use-cart";

const CheckoutCheck = ({ id, gateway }) => {
  const router = useRouter();
  //   const searchParams = useSearchParams();
  const { emptyCart } = useCart();
  //   const id = searchParams.get("id");
  //   const gateway = searchParams.get("gateway");
  const [status, setStatus] = useState({});

  const handleTabby = async () => {
    const tabbyId = sessionStorage.getItem("tabbyId");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-tabby-status/${tabbyId}`
      );
      setStatus(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (gateway === "tabby") {
      handleTabby();
    } else if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-payment-status/${id}`
        )
        .then((response) => setStatus(response.data))
        .catch((err) => console.error(err));
    }
  }, [id, gateway]);

  useEffect(() => {
    console.log({ status: status?.data?.status });
    let isPayed =
      status?.data?.status === "paid" ||
      status?.data?.status === "CREATED" ||
      status?.data?.status === "AUTHORIZED" ||
      status?.data?.status === "CLOSED";
    if (isPayed) {
      emptyCart();
      router.replace(`/account-order?from=checkout`);
      //   setTimeout(() => router.replace(`/account-order?from=checkout`), 3000);
    }
  }, [status, emptyCart, router]);

  return (
    <div className="nc-Page404">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
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
        </header>
      </div>
    </div>
  );
};

export default CheckoutCheck;
