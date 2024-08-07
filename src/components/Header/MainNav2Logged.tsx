"use client";

import React, { createRef, FC, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import dynamic from "next/dynamic";

const CartDropdown = dynamic(() => import("./CartDropdown"), { ssr: false });

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data } = useSession();
  const rendeArticlesLink = () => {
    //@ts-ignore
    if (typeof window !== "undefined") {
      //@ts-ignore
      let articles = sessionStorage.getItem("articles");
      if (articles == 0) return null;
      return (
        <span className="articles-link">
          {" "}
          <Link href="/#articles">المقالات</Link>
        </span>
      );
    }
  };
  const userLogo = () => {
    if (!data) return;
    let nameArr: any = data?.user.name.split(" ");
    return (
      <AvatarDropdown
        // logo={nameArr[0][0].toUpperCase() + nameArr[1]?.length &&  nameArr[1][0]?.toUpperCase()}
        logo={""}
      />
    );
  };
  const userLogoEmail = () => {
    if (!data) return;
    let nameArr: any = data?.user.email?.substring(0, 2);
    return <AvatarDropdown logo={nameArr.toUpperCase()} />;
  };
  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          router.push(`/search/${search}`);
          inputRef.current?.blur();
        }}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        style={{ flex: ".94 1 0%" }}
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search/${search}`);
          inputRef.current?.blur();
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث عن المنتج"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base dir-rtl"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button> */}
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div
          className="h-20 flex justify-between"
          style={{ alignItems: "center" }}
        >
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div>
          <div
            className="lg:flex-1 flex items-center"
            style={{ maxWidth: "140px" }}
          >
            <Logo className="flex-shrink-0" />
          </div>
          <div
            className="flex-[5] hidden lg:flex justify-center mx-4"
            style={{ direction: "ltr" }}
          >
            {showSearchForm ? renderSearchForm() : null}
          </div>
          {rendeArticlesLink()}
          <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
            {!showSearchForm && (
              <button
                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                onClick={() => setShowSearchForm(!showSearchForm)}
              >
                {renderMagnifyingGlassIcon()}
              </button>
            )}

            {data?.user?.name ? (
              <div className="user-logo">{userLogo()}</div>
            ) : data?.user?.email ? (
              <div className="user-logo">{userLogoEmail()}</div>
            ) : (
              <Link href={"/login"} className="login-link">
                <svg
                  className=" w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}

            <CartDropdown />
          </div>
        </div>
        <div
          className="flex-[5] hidden lg:flex justify-center mx-4 nav-ctg"
          style={{ direction: "ltr" }}
        >
          <Navigation />
        </div>
      </>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
