"use client";
import Label from "@/components/Label/Label";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Checkbox from "@/shared/Checkbox/Checkbox";
interface Props {
  isActive: boolean;
  orderType: string;
  handleAddToCart: any;
  setShopingCards: any;
  selectedCard: any;
}

const AdressForm: FC<Props> = ({
  isActive,
  orderType,
  handleAddToCart,
  setShopingCards,
  selectedCard,
}) => {
  const [value, onChange] = useState<string>("");
  const [showClender, setShowClender] = useState<boolean>(false);

  const [formValue, setFormValue] = useState({
    type: orderType,
    deliveryDate: "",
    cardText: "",
    addressSelected: false,
    address: "",
    giftAdd: "1",
    sentFrom: "",
    sentTo: "",
    giftLink: "",
  });
  useEffect(() => {
    setFormValue((prev) => ({
      type: orderType,
      deliveryDate: "",
      cardText: "",
      addressSelected: false,
      address: "",
      giftAdd: "1",
      sentFrom: "",
      sentTo: "",
      giftLink: "",
    }));
  }, [orderType]);
  useEffect(() => {
    console.log("ssad");
  }, [formValue.deliveryDate]);

  const [errors, setErrors] = useState<any>({
    deliveryDate: false,
    address: false,
  });
  const handleChange = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "address") {
      setErrors((prev: any) => ({ ...prev, address: false }));
    }
  };
  const handleDateSelect = (e: Date) => {
    let timeToConverte: Date;
    const offset: number = e.getTimezoneOffset();
    timeToConverte = new Date(e.getTime() - offset * 60 * 1000);
    onChange(timeToConverte.toISOString().split("T")[0]);
    setFormValue((prev) => ({
      ...prev,
      deliveryDate: timeToConverte.toISOString().split("T")[0],
    }));
    setErrors((prev: any) => ({ ...prev, deliveryDate: false }));
    setShowClender(false);
  };
  const [selectAdress, setSelectAdress] = useState<boolean>(true);

  const validate = () => {
    let deliveryDate = true;
    let address = true;
    if (formValue.deliveryDate.length <= 0) {
      setErrors((prev: any) => ({ ...prev, deliveryDate: true }));
      deliveryDate = false;
    }
    if (selectAdress && formValue.address.length <= 0) {
      setErrors((prev: any) => ({ ...prev, address: true }));
      address = false;
    }
    return deliveryDate && address;
  };
  const validateAndAddToCart = async (formValue: any) => {
    let isValid = validate();
    if (isValid) handleAddToCart(formValue);
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div
      className={`border border-slate-200 dark:border-slate-700 rounded-xl ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="p-6 flex flex-col sm:flex-row items-start ">
        <span className="hidden sm:block">
          <svg
            className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="sm:ml-8">
          <h3 className=" text-slate-700 dark:text-slate-300 flex ">
            {orderType === "GIFT_ORDER" ? (
              <span className="uppercase">عنوان شحن هديتك</span>
            ) : (
              <span className="uppercase">عنوان شحن </span>
            )}
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
            {orderType === "GIFT_ORDER" && (
              <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                سنقوم بتغليف هديتك
              </span>
            )}
          </h3>
        </div>
      </div>
      <div
        className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 `}
        style={{ direction: "rtl" }}
      >
        {orderType === "GIFT_ORDER" && (
          <>
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Label className="text-sm">اسم المرسل</Label>
                <Input
                  className="mt-1.5"
                  placeholder=""
                  name="sentFrom"
                  value={formValue.sentFrom}
                  onChange={(e) => handleChange(e)}
                  defaultValue={""}
                  type={"text"}
                />
              </div>
            </div>
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Label className="text-sm">اسم المرسل اليه</Label>
                <Input
                  className="mt-1.5"
                  placeholder=""
                  defaultValue={""}
                  name="sentTo"
                  value={formValue.sentTo}
                  onChange={(e) => handleChange(e)}
                  type={"text"}
                />
              </div>
            </div>
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Label className="text-sm">
                  نص البطاقة - اكتب إهدائك هنا ( + 6.00 ر.س )
                </Label>
                <Input
                  name="cardText"
                  value={formValue.cardText}
                  onChange={(e) => handleChange(e)}
                  className="mt-1.5"
                  placeholder=""
                  style={{ height: "100px" }}
                  type={"text"}
                />
              </div>
            </div>
          </>
        )}
        <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
          <div className="flex-1">
            <Label className="text-sm">
              تاريخ التوصيل (متاح من 2 الظهر الي 11م)
            </Label>
            <Input
              className="mt-1.5"
              placeholder=""
              defaultValue={""}
              type={"text"}
              value={value}
              onFocus={() => setShowClender(true)}
              style={{ border: errors.deliveryDate && "1px solid red" }}
            />
            {errors.deliveryDate && (
              <span style={{ color: "red" }}>يجب تحديد تاريخ التوصيل</span>
            )}

            {showClender && (
              <Calendar
                locale="ar"
                minDate={new Date()}
                onChange={(e: any) => handleDateSelect(e)}
                value={value}
              />
            )}
          </div>
        </div>
        {orderType !== "GIFT_ORDER" && (
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">
                نص البطاقة - اكتب إهدائك هنا ( + 6.00 ر.س )
              </Label>
              {/* <Input
                className="mt-1.5"
                placeholder=""
                value={formValue.cardText}
                name="cardText"
                onChange={(e) => handleChange(e)}
                defaultValue={""}
                style={{ height: "100px" }}
                type={"text"}
              /> */}
              <textarea
                value={formValue.cardText}
                onChange={(e) => handleChange(e)}
                name="cardText"
                style={{ height: "100px" }}
                className="rounded-2xl mt-1.5 text-sm font-normal h-11 px-4 py-3 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800"
              ></textarea>
            </div>
          </div>
        )}
        <Checkbox
          className="!text-sm address-box"
          name="uudai"
          label="لا اريد نحديد العنوان (فريق الدعم سيتواصل مع المستلم) "
          onChange={(e) => setSelectAdress(!e)}
        />
        {selectAdress && (
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 ">
            <div className="flex-1 justify-between">
              <Label className="text-sm">العنوان</Label>
              <Input
                className="mt-1.5"
                placeholder=""
                name="address"
                onChange={(e) => handleChange(e)}
                value={formValue.address}
                type={"text"}
                style={{ border: errors.address && "1px solid red" }}
              />
              {errors.address && (
                <span style={{ color: "red" }}>
                  يجب تحديد العنوان او اختيار عدم تحديد العنوان وسنتواصل معك
                </span>
              )}
            </div>
          </div>
        )}
        <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
          <div className="flex-1">
            <Label>اضافات الورود</Label>
            <Select
              className="mt-1.5"
              value={formValue.giftAdd}
              name="giftAdd"
              onChange={(e) => handleChange(e)}
            >
              <option value="1">كروت اهداء</option>
              <option value="2">شيكولاته بلجيكيه</option>
              <option value="3">بالونات</option>
            </Select>
          </div>
        </div>
        {orderType === "GIFT_ORDER" ? (
          <>
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <Label className="text-sm">ارفاق رابط (فيديو او صوت)</Label>
                <Input
                  className="mt-1.5"
                  placeholder=""
                  value={formValue.giftLink}
                  name="giftLink"
                  onChange={(e) => handleChange(e)}
                  defaultValue={""}
                  type={"text"}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row pt-6 gift-btn">
              {formValue.giftAdd === "1" ? (
                <ButtonSecondary
                  className="flex-2 flex-shrink-0 "
                  onClick={setShopingCards}
                >
                  تصميم البطاقه
                </ButtonSecondary>
              ) : formValue.giftAdd === "2" ? (
                <ButtonSecondary
                  className="flex-2 flex-shrink-0 "
                  onClick={setShopingCards}
                >
                  اختيار الشيكولاتة
                </ButtonSecondary>
              ) : formValue.giftAdd === "3" ? (
                <ButtonSecondary
                  className="flex-2 flex-shrink-0 "
                  onClick={setShopingCards}
                >
                  اختيار البالونات
                </ButtonSecondary>
              ) : null}
            </div>
            {selectedCard?._id && (
              <div className="flex flex-col sm:flex-row pt-6 gift-btn">
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
                تم اختيار بطاقه{" "}
                <span style={{ margin: "0 10px" }} className="font-bold">
                  {selectedCard.name}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row pt-6">
              <ButtonPrimary
                className="flex-1 flex-shrink-0"
                onClick={() => validateAndAddToCart(formValue)}
              >
                ارسال هديتك
              </ButtonPrimary>
            </div>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={() => validateAndAddToCart(formValue)}
            >
              اضف الي السلة
            </ButtonPrimary>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdressForm;
