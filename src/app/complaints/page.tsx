import rightImg from "@/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";

export const metadata: any = async () => {
  return {
    title: "الزهرة العصرية - يسعدنا تقديم اقتراحاتك",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
};
const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      {/* <BgGlassmorphism /> */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28 dir-rtl">
        <SectionHero
          // rightImg={rightImg}
          heading="يسعدنا تقديم اقتراحاتك"
          btnText=""
          subHeading="نحن نرحب دائماً بتعاونك معنا ومشاركتنا كل مقترحاتك. يمكنك الاتصال على ارقامنا او عبر المحادثه المباشره من خلال WhatsApp"
        />

      
      </div>
    </div>
  );
};

export default PageAbout;
