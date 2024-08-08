"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Logo from "@/shared/Logo/Logo";
import { Disclosure } from "@/app/headlessui";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SocialsList from "@/shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export interface NavMobileProps {
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTry, setSearchTry] = useState(0);
  useEffect(() => {
    onClickClose;
  }, [searchTry]);
  const router = useRouter();

  useEffect(() => {
    axios(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?subCtg=true&channel=web`
    )
      .then((res) => res.data.data)
      .then((items) => {
        setData(
          items
            .filter((item) => item.active)
            .map((item: any) => ({
              type: item.name === "الاكثر مبيعا" ? null : "dropdown",
              id: item._id,
              href: `/category/${item?._id}`,
              name: item.name,
              image: item.image,
              desc: item.description,
              children: item?.subCategories.map((subCtg: any) => ({
                id: subCtg?._id,
                href: `/category/${item?._id}/${subCtg?._id}`,
                name: subCtg.name,
              })),
            }))
        );
      });
  }, []);
  const _renderMenuChild = (
    item: NavItemType,
    itemClass = " pl-3 text-neutral-900 dark:text-neutral-200 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!i.children ? "block w-full" : ""}`}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex items-center flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-slate-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i,
                  "pl-3 text-slate-600 dark:text-slate-400 "
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    if (item.children?.length <= 1) {
      console.log({ item });
      return (
        <Link
          onClick={onClickClose}
          href={`/category/${item?.id}/${item?.children[0]?.id}`}
          style={{ margin: "5px" }}
        >
          {" "}
          {item.name}
        </Link>
      );
    }
    return (
      <Disclosure
        key={index}
        as="li"
        className="text-slate-900 dark:text-white"
      >
        <span className={!item.children ? "block w-full" : ""}>
          {item.name}
          <Disclosure.Button as="span" className="flex justify-end flex-grow">
            <ChevronDownIcon
              className="ml-2 h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          </Disclosure.Button>
        </span>
        {/* {item.children && (
          <span className="block flex-grow" onClick={(e) => e.preventDefault()}>
            <Disclosure.Button as="span" className="flex justify-end flex-grow">
              <ChevronDownIcon
                className="ml-2 h-4 w-4 text-neutral-500"
                aria-hidden="true"
              />
            </Disclosure.Button>
          </span>
        )} */}
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
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
          onClickClose();
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
        action=""
        method="POST"
        className="flex-1 text-slate-900 dark:text-slate-200"
        onSubmit={async (e) => {
          e.preventDefault();
          setSearchTry(searchTry + 1);
          onClickClose();
          router.push(`/search/${search}`);
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder="ابحث عن منتجك"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5 dir-rtl">
        <Logo />

        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <div className="mt-1">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1 dir-rtl">
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavMobile;
