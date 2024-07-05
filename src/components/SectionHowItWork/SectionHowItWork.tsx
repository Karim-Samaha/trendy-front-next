import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import HIW1img from "@/images/products/market.jpeg";
import HIW2img from "@/images/products/market.jpeg";
import HIW3img from "@/images/products/market.jpeg";
import HIW4img from "@/images/products/market.jpeg";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";

export interface SectionHowItWorkProps {
  className?: string;
  data?: (typeof DEMO_DATA)[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "أجود أنواع الزهور",
    desc: "منتقاه من افضل المزارع",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "لست بحاجة لمعرفة العنوان",
    desc: "فريقنا سيفعل ذلك نيابة عنك",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "شحن مجاني",
    desc: "شحن مجاني",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "احصل علي نقاط ترندي مع عملية الشراء",
    desc: "اربح نقاطك الان",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      style={{ direction: "rtl" }}
    >
      {" "}
      <h2 className="title text-3xl md:text-4xl font-semibold" style={{marginBottom: "60px"}}>
      لماذا متجر ترندي؟
      </h2>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-5"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: (typeof DEMO_DATA)[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
              sizes="150px"
              alt="HIW"
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Trendy Rose`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
