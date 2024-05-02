"use client";

import React, { FC, useEffect, useState } from "react";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
// import { HERO2_DEMO_DATA as DATA } from "./data";

export interface SectionHero2Props {
  className?: string;
  data_: any;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "", data_ }) => {
  // =================
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);
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

        <Link href={`${item.route}`}>
          <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44">
            <Image
              width={1200}
              height={600}
              className="w-full h-full  nc-SectionHero2Item__image"
              src={item.image.src}
              alt={item.heading}
              priority
            />

            <div className="mt-10 lg:mt-0 lg:absolute end-0 rtl:-end-28 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"></div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>{data_.length > 0 ? data_.map((_, index) => renderItem(index)) : null}</>
  );
};

export default SectionHero2;
