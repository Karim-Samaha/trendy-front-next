"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/shared/Logo/Logo";
import axios from "axios";
import { useCart } from "react-use-cart";

const CheckoutCheck = ({ id, gateway, tabbyId }) => {
  const router = useRouter();
  //   const searchParams = useSearchParams();
  const { emptyCart } = useCart();
  //   const id = searchParams.get("id");
  //   const gateway = searchParams.get("gateway");
  const [status, setStatus] = useState({});
  const [failed, setFailed] = useState(false);

  const handleTabby = async () => {
    const tabbyPaymenId = tabbyId;
    const tamaraSessionId = sessionStorage.getItem("tabbyId");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-tabby-status/${tabbyPaymenId}?session=${tamaraSessionId}`
      );
      setStatus(response.data);
      if (response?.data?.data === "wrong") {
        setFailed(true);
      }
    } catch (err) {
      console.error(err);
      setFailed(true);
    }
  };
  const handleTamara = async () => {
    const tamaraId = sessionStorage.getItem("tamaraId");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-tamara-status/${tamaraId}`
      );
      setStatus(response.data);
      if (response?.data?.data === "wrong") {
        setFailed(true);
      }
    } catch (err) {
      console.error(err);
      setFailed(true);
    }
  };

  useEffect(() => {
    if (gateway === "tabby") {
      handleTabby();
    } else if (gateway === "tamara") {
      handleTamara();
    } else if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/check-payment-status/${id}`
        )
        .then((response) => {
          setStatus(response.data);
          if (response?.data?.data === "wrong") {
            setFailed(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setFailed(true);
        });
    }
  }, [id, gateway]);

  useEffect(() => {
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
          ) : failed ? (
            <span
              style={{ color: "#000", fontWeight: "bold" }}
              className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium dir-rtl"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                xmlSpace="preserve"
                fill="#000000"
                width="50px"
                height="50px"
                style={{ margin: "0px auto 50px auto" }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <circle
                    style={{ fill: "#D75A4A" }}
                    cx="25"
                    cy="25"
                    r="25"
                  ></circle>{" "}
                  <polyline
                    style={{
                      fill: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeMiterlimit: "10",
                    }}
                    points="16,34 25,25 34,16 "
                  ></polyline>{" "}
                  <polyline
                    style={{
                      fill: "none",
                      stroke: "#FFFFFF",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeMiterlimit: "10",
                    }}
                    points="16,16 25,25 34,34 "
                  ></polyline>{" "}
                </g>
              </svg>
              حدث خطأ في عملية الدفع
              <p style={{ marginTop: "10px", fontWeight: "500" }}>
                يمكنك التواصل معنا{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=966539123890"
                  style={{ color: "green" }}
                >
                  من خلال الواتس
                </a>
              </p>
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
