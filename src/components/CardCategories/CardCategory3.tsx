import React, { FC } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { CATS_DISCOVER } from "./data";

export interface CardCategory3Props {
  className?: string;
  featuredImage?: any;
  name?: string;
  desc?: string;
  color?: string;
  id: string;
  href: string
  subCategories: [string]
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  featuredImage = CATS_DISCOVER[2].featuredImage,
  name = CATS_DISCOVER[2].name,
  desc = CATS_DISCOVER[2].desc,
  color = CATS_DISCOVER[2].color,
  id,
  href,
  subCategories
}) => {
  return (
    <Link
      // ref={`/category${id}`}
      className={`nc-CardCategory3 block ${className}`}
      href={subCategories?.length > 1 ? `/category/${id}/${subCategories[0]}` : `/category/${id}`}
    >
      <div
        className={`ctg-slider relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            {featuredImage?.src && (
              <Image
                alt=""
                src={featuredImage || ""}
                className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
                style={{ borderRadius: "20px" }}
              />
            )}
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                {/* {name} */}
              </span>
              {desc && (
                <h2
                  className={`text-xl md:text-2xl text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
                href={subCategories?.length > 1 ? `/category/${id}/${subCategories[0]}` : `/category/${id}`}
                >
                عرض التفاصيل
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory3;
