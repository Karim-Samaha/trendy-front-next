"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";
import { useSearchParams } from "next/navigation";
const Moysar = ({
  fintalTotal,
  couponResponse = {},
  deleviryMethod,
  deleviryInfo,
  vat,
  userNote,
  pointsUsed,
}: {
  fintalTotal: number;
  couponResponse: any;
  deleviryMethod: string;
  deleviryInfo: any;
  vat: number;
  userNote: string;
  pointsUsed: number;
}) => {
  const [init, setInit] = useState(false);
  const { data: session }: any = useSession();
  const { items } = useCart();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const amount: string | null = searchParams.get("amount");
  console.log(userId, amount);
  useEffect(() => {
    if (init) {
      const script = document.createElement("script");
      script.async = true;
      script.innerHTML = `  
        Moyasar.init({
          element: '.mysr-form',
          // Amount in the smallest currency unit.
          // For example:
          // 10 SAR = 10 * 100 Halalas
          // 10 KWD = 10 * 1000 Fils
          // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
          amount: ${+amount * 100},
          currency: 'SAR',
          language: "ar",   
          description: '[]',
          userId: '${userId}',
          publishable_api_key: 'pk_test_A4Ae74mFrkjuhhzovBc3KrYVE6Nc9u8YEryNe6dv',
          callback_url: '${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/check-payment',
          methods: ['creditcard'],
        })
        `;
      console.log({ window: document.body });
      setTimeout(() => {
        document.body.appendChild(script);
      }, 1000);
    }
    // }
  }, [init]);
  useEffect(() => {
    const styleScript = document.createElement("link");
    styleScript.rel = "stylesheet";
    styleScript.href = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.css";
    const jsScript = document.createElement("script");
    jsScript.src = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.js";
    const jsPayScript = document.createElement("script");
    jsPayScript.type = "application/javascript";
    jsPayScript.className = "pay";
    // tabby
    const tabbyScript = document.createElement("script");
    tabbyScript.async = true;
    tabbyScript.src = "https://checkout.tabby.ai/tabby-card.js";

    document.head.appendChild(styleScript);
    document.head.appendChild(jsScript);
    document.head.appendChild(tabbyScript);
    setInit(true);
  }, []);
  return (
    <>
      <div
        className="mysr-form"
        style={{
          maxWidth: "515px !important",
          direction: "rtl",
          marginTop: "50px",
        }}
      ></div>
      <script type="application/javascript" className="pay"></script>
    </>
  );
};

export default Moysar;
