"use client";
import React, { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
export interface LikeButtonProps {
  className?: string;
  priceBefore: number;
  price: number;
}

const Discount: React.FC<LikeButtonProps> = ({
  className = "",
  price,
  priceBefore,
}) => {
  if (!priceBefore) return null;
  return (
    <button
      className={`w-20 h-9 flex items-center justify-center bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={() => null}
      style={{ borderRadius: "16px",color: "#55a8b9", fontWeight: "bold", fontSize: "14px" }}
    >
      {(100 - (price / priceBefore) * 100).toFixed(0)}% خصم
    </button>
  );
};

export default Discount;
