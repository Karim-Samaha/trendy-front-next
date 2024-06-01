"use client";

import _axios from "@/contains/api/axios";
import { useEffect } from "react";

const HitRequest = () => {
  function getCurrentMonthYear() {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const year = date.getFullYear();
    return `${month}-${year}`;
  }
  const handleRequestHit = async () => {
    if (typeof window !== "undefined") {
      const isRequested = await JSON.parse(
        sessionStorage.getItem("HitRequest") || "false"
      );
      if (!isRequested) {
        const date = getCurrentMonthYear();
        await _axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/visits`, {
            month: date,
          })
          .then((res) => sessionStorage.setItem("HitRequest", "true"))
          .catch((err) => console.log(err));
      }
    }
  };
  useEffect(() => {
    handleRequestHit();
  }, []);
  return null;
};

export default HitRequest;
