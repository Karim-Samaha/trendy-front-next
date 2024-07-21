import React, { FC } from "react";
import SectionHero from "./SectionHero";

export const metadata: any = async () => {
  return {
    title: " الزهرة العصرية - الشروط والأحكام",
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
          heading="سياسة الشحن والدفع"
          btnText=""
        />
       
      </div>
    </div>
  );
};

export default PageAbout;
