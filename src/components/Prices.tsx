'use client'
import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number | string;
  priceBefore: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price,
  priceBefore,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2  price rounded-lg ${contentClass} price-label`}
      >
        <span className=" !leading-none" style={{ direction: "rtl", fontWeight: "bold",fontSize: "14px" }}>
          {" "}
          {String(price)} ر.س
        </span>
        {priceBefore && (
          <span
            className=" !leading-none"
            style={{
              color: "#676767",
              margin: "0 10px",
              textDecoration: "line-through",
            }}
          >
            {" "}
            {String(priceBefore)} ر.س
          </span>
        )}
      </div>
    </div>
  );
};

export default Prices;
