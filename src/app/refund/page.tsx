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
          heading="سياسة استرجاع ورد الأموال - Trendy Rose:"
          btnText=""
          subHeading="سياسة الإستبدال والإسترجاع: يحق للعميل الاستبدال قبل البدء بتجهيز المنتج ، لكن بعد خروج الطلب للتوصيل لا يمكن الاستبدال أو الاسترجاع وفقاً لطبيعة المنتج و الخدمة المقدمة.

          في حال وجود خلل أو تلف بعد التوصيل فيحق للعميل انطلاقاً من مبدأ الثقة المتبادلة إستبدال المنتج او الحصول على كامل القيمه المدفوعه.
          
          آلية ارجاع المبالغ: يتم ارجاع المبلغ بنفس طريقة الدفع التي تمت .
          "
        />

      
      </div>
    </div>
  );
};

export default PageAbout;
