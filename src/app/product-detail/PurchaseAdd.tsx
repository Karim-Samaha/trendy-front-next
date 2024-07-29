import Label from "@/components/Label/Label";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import ModalCards from "@/components/ModalCards";
import ProductNcNumber from "@/components/productNcNumber";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Checkbox from "@/shared/Checkbox/Checkbox";

const PurchaseAdd = ({
  item,
  handleRemoveQuantity,
  handleAddQuantity,
  handleRemoveGiftCard,
  handleSlectedGiftOptions,
  handleSelectedGiftCard
}: any) => {
  const [options, setOptions] = useState({
    color: item?.colors?.length > 0 ? item?.colors[0] : null,
    text: item?.textArr?.length > 0 ? item?.textArr[0] : null,
  });

  const colors = [
    { val: "red", text: "احمر" },
    { val: "white", text: "ابيض" },
    { val: "brown", text: "بني" },
    { val: "yellow", text: "اصفر" },
    { val: "rgba(0,0,0,0.5", text: "شفاف" },
    { val: "green", text: "اخضر" },
    { val: "blue", text: "ازرق" },
    { val: "#0066CC", text: "كحلي" },
    { val: "#000", text: "اسود" },
    { val: "pink", text: "زهري" },
    { val: "silver", text: "فضي" },
    { val: "#FFD700", text: "دهبي" },
  ];
  return (
    <div
      className="flex flex-col sm:flex-row pt-6 gift-btn"
      key={item?.cartId}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        border: "1px dashed #55a8b9",
        padding: "10px 5px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        تم اختيار{" "}
        <span
          style={{ margin: "0 10px", display: "flex" }}
          className="font-bold"
        >
          {item?.name}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          className={`nc-NcInputNumber flex items-center justify-between space-x-5`}
        >
          <div
            className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
            style={{ direction: "rtl" }}
          >
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
              type="button"
              onClick={() => {
                console.log(item);
                handleAddQuantity(item?.cartId);
              }}
              // disabled={max ? max <= qty : false}
            >
              <PlusIcon className="w-4 h-4" />
            </button>

            <span className="select-none block flex-1 text-center leading-none">
              {item?.quantity}
            </span>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
              type="button"
              onClick={() => handleRemoveQuantity(item?.cartId)}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <span
          onClick={() => handleRemoveGiftCard(item?.cartId)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          مسح
        </span>
      </div>
      {item?.colors?.length > 0 ? (
        <div style={{ width: "100%", marginTop: "10px" }}>
          <div>اختيار لون المنتج : <span style={{fontWeight:"bold"}}> {colors.find((colorItem) => colorItem.val === item?.color)?.text}</span></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {item?.colors?.map((color: string) => {
              return (
                <p
                  key={color}
                  className="addsColor"
                  style={{
                    margin: "0 5px",
                    width: options.color === color ? "40px" : "30px",
                    height: options.color === color ? "40px" : "30px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border:
                      options.color === color
                        ? "3px solid #55a8b9"
                        : "1px solid black",
                    opacity: ".8",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOptions((prev) => ({ ...prev, color: color }));
                    handleSlectedGiftOptions(item?.cartId, "color", color);
                  }}
                ></p>
              );
            })}
          </div>
        </div>
      ) : null}
      {item?.textArr?.length > 0 ? (
        <div style={{ width: "100%", marginTop: "10px" }}>
          <div style={{ margin: "10px 0" }}>خيارات المنتج :</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              value={options.text}
              onChange={(e) => {
                setOptions((prev) => ({ ...prev, text: e.target.value }));
                handleSlectedGiftOptions(item?.cartId, "text", e.target.value);
              }}
            >
              {item?.textArr.map((option: string) => {
                return <option key={option}>{option}</option>;
              })}
            </select>
          </div>
        </div>
      ) : null}
      {item?.textArr?.length > 0 || item?.colors?.length > 0 ? (
        <div style={{ marginTop: "10px" }}>
          <ButtonSecondary onClick={() => handleSelectedGiftCard(item)}>
            اضافة المنتج باختيارات اخري
          </ButtonSecondary>
        </div>
      ) : null}
    </div>
  );
};

export default PurchaseAdd;
