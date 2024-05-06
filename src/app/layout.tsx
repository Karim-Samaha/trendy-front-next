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
  return (
    <SessionProvider>
      <CartProvider id="cart">
        <html lang="en" dir="" className={cairo.className}>
          <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <ProgressBar
              height="4px"
              color="#4993ab"
              options={{ showSpinner: true }}
              shallowRouting
            />
            <SiteHeader />
            {children}
            <CommonClient />
            <Footer />
          </body>
        </html>
      </CartProvider>
    </SessionProvider>
  );
}
