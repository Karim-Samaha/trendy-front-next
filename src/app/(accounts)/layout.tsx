import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: " طلباتي",
    link: "/account-order",
  },
  {
    name: "قائمتي",
    link: "/account-savelists",
  },
  {
    name: "بينات حسابي",
    link: "/account",
  },
];
import { headers } from "next/headers";

// export const metadata: any = async () => {
//   const heads = headers()
//   const pathname = heads.get('next-url')

//   return {
//     title: " الزهرة العصرية - سياسة الاستبدال و الاسترجاع  ",
//     description: "",
//     icons: {
//       icon: "/trendy.svg",
//     },
//   };
// };
export async function generateMetadata({ params }: any) {
  const heads = headers();
  const pathname = heads.get("next-url");
  let headElem = {
    title: " الزهرة العصرية - حسابي  ",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
  if (pathname === "/account") {
    headElem.title = " الزهرة العصرية - حسابي  ";
    headElem.description = "حسابي";
  } else if (pathname === "/account-savelists") {
    headElem.title = " الزهرة العصرية - المنتجات المفضلة ";
    headElem.description = "المنتجات المفضلة";
  } else if (pathname === "/account-order") {
    headElem.title = " الزهرة العصرية - تاريخ الطلب ";
    headElem.description = "تاريخ الطلب";
  }
  return headElem;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const heads = headers();
  const pathname = heads.get("next-url");
  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar dir-rtl">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base current-account-link  ${
                    pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200 "
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
