import React, { FC, ReactNode } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
  subHeadingTwo: string
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
  subHeadingTwo
}) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex-1">
        <div className="w-screen max-w-full flex-1">
          <h2 style={{textAlign: "right"}} className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {heading}
          </h2>
          <div style={{textAlign: "right", marginTop: "45px"}} className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
            {subHeading}
          </div>
          <div style={{textAlign: "right", marginTop: "45px"}} className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
            {subHeadingTwo}
          </div>
          {!!btnText && <ButtonPrimary href="/login">{btnText}</ButtonPrimary>}
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={rightImg} alt="" priority />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
