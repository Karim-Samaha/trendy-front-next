"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import Header from "@/components/Header/Header";
import { useThemeMode } from "@/hooks/useThemeMode";
import Alert from "@/components/Alert";
import { headers } from "next/headers";

const SiteHeader = () => {
  const pathname = usePathname();
  console.log({pathname});
  useThemeMode();
  return (
    <>
      <HeaderLogged />
      {pathname !== '/' && <Alert text="" />}
    </>
  );
};

export default SiteHeader;
