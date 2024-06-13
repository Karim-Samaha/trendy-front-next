"use client";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { CartProvider } from "react-use-cart";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { getServerAuthSession } from "../server/auth";
import logo from "@/images/trendy.svg";
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
import HitRequest from "@/components/HitRequest";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params: { session },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const [tags, setTags] = useState({ head: "", body: "" });
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    _axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
      .then((res) => res.data.data)
      .then((data) => {
        setTags((prev) => ({
          ...prev,
          head: data.find((item: any) => item.type === "HEAD")?.tag,
          body: data.find((item: any) => item.type === "BODY")?.tag,
        }));
        setFooter(
          data.filter(
            (item: { type: string }) =>
              item.type !== "BODY" || item.type !== "HEAD"
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (tags.head.length > 0) {
      let arrOfTags = tags.head.split(/\r?\n|\r|\n/g);
      for (let i = 0; i < arrOfTags.length; i++) {
        if (arrOfTags[i].length > 0) {
          var doc = new DOMParser().parseFromString(arrOfTags[i], "text/xml");
          if (doc) {
            //@ts-ignore
            document.head.appendChild(doc.firstChild);
          }
        }
      }
    }
  }, [tags.head]);

  return (
    <>
      <SessionProvider>
        <CartProvider id="cart">
          <html lang="en" dir="" className={cairo.className}>
            <head>
              {/* <meta
                name="viewport"
                content="width=device-width, initial-scale=5"
              /> */}
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            </head>
            <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
              <ProgressBar
                height="4px"
                color="#4993ab"
                options={{ showSpinner: true }}
                shallowRouting
              />
              <SiteHeader />
              {children}
              <HitRequest />
              <CommonClient />
              <Footer data={footer} />
              <div dangerouslySetInnerHTML={{ __html: tags.body }} />
            </body>
          </html>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
