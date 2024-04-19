import rightImg from "@/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      {/* <BgGlassmorphism /> */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28 dir-rtl">
        <SectionHero
          // rightImg={rightImg}
          heading="الشهادات المتعلقه بالمتجر"
          btnText=""
          subHeading="رقم السجل التجاري 1010603970"
          //@ts-ignore
          subHeadingTwo="رقم الشهاده الضريبيه 310457496200003"
        />

      
      </div>
    </div>
  );
};

export default PageAbout;
