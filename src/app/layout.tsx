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
import { analytics } from "../utils/firebase";
import Logo from "@/shared/Logo/Logo";

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
    console.log({ analytics });
    if (analytics) {
      console.log("Firebase Analytics initialized");
    }
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
              {/* <meta
                name="viewport"
                content="width=device-width, initial-scale=5"
              /> */}
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
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
              {/* <Footer data={footer} /> */}
              <div dangerouslySetInnerHTML={{ __html: tags.body }} />
              <div
                id="gb-widget-8323"
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
                <div className="text-us-msg">راسلنا</div>
                <div className="sc-q8c6tt-3 hKYcqG">
                  <div
                    color="#4dc247"
                    style={{
                      fontSize: "10px",
                 
                      backgroundColor: "#77e377",
                      borderRadius: "50%",
                      padding: '5px',
                      
                    }}
                    className="sc-q8c6tt-1 deQKmp"
                  >
                    <a
                      style={{ fontSize: "10px", backgroundColor: "green" }}
                      href="https://wa.me/966539123890"
                      target="_blank"
                      aria-label="Go to whatsapp"
                      color="#4dc247"
                      id=""
                      order="whatsapp"
                      className="sc-q8c6tt-0 hCwaxi"
                    >
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{
                          width: "50px",
                          height: "50px",
                          fill: "#fff",
                        }}
                      >
                        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </body>
          </html>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
