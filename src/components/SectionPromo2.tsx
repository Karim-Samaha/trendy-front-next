"use client";
import React, { FC, useEffect, useState } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/promo2.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";
import Link from "next/link";

export interface SectionPromo2Props {
  className?: string;
  image: any;
}

const SectionPromo2: FC<SectionPromo2Props> = ({
  className = "lg:pt-10",
  image = [{}],
}) => {
  {
    console.log({ debBanner: image.image.src });
  }
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div
        style={{ height: "530px", borderRadius: "11px" }}
        className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24"
      >
        <Link href={image.route ? image.route : "/"}>
          <Image
            fill
            className="absolute w-full h-full  dark:opacity-5"
            src={image?.image?.src}
            style={{ borderRadius: "11px" }}
            alt="backgroundLineSvg"
          />
        </Link>
      </div>
    </div>
  );
};

export default SectionPromo2;
