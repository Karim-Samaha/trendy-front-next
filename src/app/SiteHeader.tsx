"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";
import Alert from "@/components/Alert";
import { headers } from "next/headers";
// import HeaderLogged from "@/components/Header/HeaderLogged";
import dynamic from "next/dynamic";
const HeaderLogged = dynamic(
  () => import("@/components/Header/HeaderLogged"),
  { ssr: false }
);
const SiteHeader = () => {
  const pathname = usePathname();
  useThemeMode();
  return (
    <>
      <HeaderLogged />
      {pathname !== '/' && <Alert text="" />}
    </>
  );
};

export default SiteHeader;
