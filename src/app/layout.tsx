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
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
import HitRequest from "@/components/HitRequest";
import { facebookPixel, snapchatPixelEvent, tiktokPixel } from "@/utils/pixels";
import Script from "next/script";
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
    facebookPixel("PageView", {});
    tiktokPixel("Pageview", {});
    snapchatPixelEvent("Pageview", {});
  }, []);

  useEffect(() => {
    if (tags.head.length > 0) {
      let arrOfTags = tags.head.split(/\r?\n|\r|\n/g);
      for (let i = 0; i < arrOfTags.length; i++) {
        if (arrOfTags[i].length > 0) {
          var doc = new DOMParser().parseFromString(arrOfTags[i], "text/xml");
          console.log(doc.firstChild);
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
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
              <Script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-M57MK393')`,
                }}
                
              />
              <link rel="icon" href="/trendy.svg" />
            </head>
            <meta
              name="google-site-verification"
              content="M6yr60Rjdpx4lNhJTh8WZyFB7bjtQkdBU7SXZpS3ZAY"
            />
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
              <div className="w"></div>
              {/* <noscript
                dangerouslySetInnerHTML={{
                  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M57MK393"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
              /> */}
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-M57MK393"
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                ></iframe>
              </noscript>
            </body>
          </html>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
