"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import _axios from "@/contains/api/axios";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading: string;
  btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
}) => {
  const [deleviryMethods, setDeleviryMethods] = useState([]);
  useEffect(() => {
    _axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
      .then((res) => res.data.data)
      .then((data) => {
        let deleviry = data.find(
          (item: { type: string }) => item.type === "delivery"
        );
        let paymentMethods = data.find(
          (item: { type: string }) => item.type === "paymentMethods"
        );
        setDeleviryMethods(deleviry?.items);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex-1">
        <div className="w-screen max-w-full flex-1">
          <h2
            style={{ textAlign: "right" }}
            className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100"
          >
            {heading}
          </h2>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        {deleviryMethods.find((item) => item.id === 1)?.active && (
          <div>
            <button
              className="deleveryBtn"
              style={{ width: "100%", display: "flex" }}
            >
              من خلال ترندي روز
              <span style={{ margin: "0 5px" }}>داخل الرياض</span>
              <p style={{ margin: "0 5px" }}>
                <span>السعر</span> : 0 رس
              </p>
            </button>
          </div>
        )}

        {deleviryMethods.find((item) => item.id === 2)?.active && (
          <div>
            <button
              className="deleveryBtn"
              style={{ width: "100%", display: "flex" }}
            >
              من خلال بوسطا
              <span style={{ margin: "0 10px" }}>داخل الرياض</span>
              <span style={{ margin: "0 5px" }}>داخل الرياض</span>
              <p style={{ margin: "0 5px" }}>
                <span>السعر</span> : 50 رس
              </p>
            </button>
          </div>
        )}
        {deleviryMethods.find((item) => item.id === 3)?.active && (
          <div>
            <button
              className="deleveryBtn"
              style={{ width: "100%", display: "flex" }}
            >
              استلام من المتجر
              <p style={{ margin: "0 5px" }}>
                <span>السعر</span> : 0 رس
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHero;
