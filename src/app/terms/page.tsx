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
          heading="الشروط والاحكام"
          btnText=""
          subHeading="باستخدام موقع وتطبيق الزهرة العصرية فأنت توافق على الالتزام بهذه الشروط والأحكام، وفي حال عدم موافقتك على الشروط والأحكام يتعين عليك عدم استخدام الموقع والتطبيق ، وعليه فإننا نحتفظ بحقنا بتغيير الشروط والأحكام من وقت لآخر وبالتالي  يتعين عليك الاطلاع على هذه الشروط والأحكام بشكلٍ دوري ، ويعتبر استمرار استخدامك لموقع وتطبيق الزهرة العصرية بمثابة موافقة على الشروط والأحكام المطبقة في وقت استخدامك للموقع والتطبيق كجزء من التزامنا بجعل موقع وتطبيق الزهرة العصرية مكانا ترغب في زيارته باستمرار فإننا نرحب بكافة تعليقاتك على أي من السياسات أو القواعد وشكراً جزيلاً."
        />
      </div>
    </div>
  );
};

export default PageAbout;
