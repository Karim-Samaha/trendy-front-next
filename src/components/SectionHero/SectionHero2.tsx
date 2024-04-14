"use client";

import React, { FC, useEffect, useState } from "react";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";
import axios from "axios";
// import { HERO2_DEMO_DATA as DATA } from "./data";

export interface SectionHero2Props {
  className?: string;
  data_: any
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "", data_ }) => {
  // =================
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  // const [data_, setData_] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/banners")
  //     .then((res) => res.data.data)
  //     .then((data) => {
  //       setData_(
  //         data.filter((item: { type: string; }) => item.type === 'HERO_IMG').map((item: any) => ({
  //           btnLink: item?.route,
  //           btnText: item?.name,
  //           heading: item?.name,
  //           image: {
  //             src: `http://localhost:5000${item.imageSrc}`,
  //             height: 1001,
  //             width: 1000,
  //             blurDataURL:
  //               "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-right-2.dc1c84f6.png&w=8&q=70",
  //             blurWidth: 8,
  //             blurHeight: 8,
  //           },
  //           subHeading: "",
  //         }))
  //       );
  //     });
  // }, []);
  // useEffect(() => {
  //   console.log({ my: data_ });
  // }, [data_]);
  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= data_.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= data_.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return data_.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };
  // =================

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = data_[index];
    if (!isActive) {
      return null;
    }
    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
        style={{ height: "600px", justifyContent: "center" }}
      >
        <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
          {data_.map((_, index) => {
            const isActive = indexActive === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setIndexActive(index);
                  handleAfterClick();
                }}
                className={`relative px-1 py-1.5 cursor-pointer`}
              >
                <div
                  className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                >
                  {isActive && (
                    <div
                      className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                        isActive ? " " : " "
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Prev
          className="absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />

        {/* BG */}
        {/* <div className="absolute inset-0 bg-[#E3FFE6]"> */}
      

        <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44">
          <Image
            // fill
            // sizes="(max-width: 768px) 100vw, 50vw"
            width={1200}
            height={600}
            className="w-full h-full  nc-SectionHero2Item__image"
            src={item.image.src}
            alt={item.heading}
            priority
          />
          {/* <div
            className={`relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left`}
          >
            <div className="space-y-5 sm:space-y-6">
              <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                {item.subHeading}
              </span>
              <h2 className="nc-SectionHero2Item__heading font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[114%] text-slate-900">
                {item.heading}
              </h2>
            </div>

            <ButtonPrimary
              className="nc-SectionHero2Item__button dark:bg-slate-900"
              sizeClass="py-3 px-6 sm:py-5 sm:px-9"
              href={item.btnLink}
            >
              <span>{item.btnText}</span>
              <span>
                <svg className="w-5 h-5 ms-2.5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </ButtonPrimary>
          </div> */}
          <div className="mt-10 lg:mt-0 lg:absolute end-0 rtl:-end-28 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            {/* {console.log({debsss: item.image.src})} */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>{data_.length > 0 ? data_.map((_, index) => renderItem(index)) : null}</>
  );
};

export default SectionHero2;
