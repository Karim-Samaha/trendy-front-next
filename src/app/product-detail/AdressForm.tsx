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
import ModalCards from "@/components/ModalCards";
import ProductNcNumber from "@/components/productNcNumber";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Checkbox from "@/shared/Checkbox/Checkbox";
import PurchaseAdd from "./PurchaseAdd";
import _axios from "@/contains/api/axios";
interface Props {
  isActive: boolean;
  orderType: string;
  handleAddToCart: any;
  setSelectedCard: any;
  selectedCard: [any] | null;
}

const AdressForm: FC<Props> = ({
  isActive,
  orderType,
  handleAddToCart,
  selectedCard,
  setSelectedCard,
}) => {
  const [value, onChange] = useState<string>("");
  const [time, onTimeChange] = useState<string>("");
  const [showClender, setShowClender] = useState<boolean>(false);
  const [showTime_, setShowTime_] = useState<boolean>(false);
  const [shopingCards, setShopingCards] = useState(false);
  const [formSettingInfo, setFormSettingInfo] = useState({});

  useEffect(() => {
    _axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
      .then((res) => res.data.data)
      .then((data) => {
        let settings = data.find(
          (item: { type: string }) => item.type === "DELIVER_TIME"
        );
        setFormSettingInfo(settings);
      })
      .catch((err) => console.log(err));

  }, []);
  console.log({formSettingInfo})
  const [time_, setTime] = useState({
    hour: "00",
    minute: "00",
    day: "00",
  });

  const selectHour = (e: any) => {
    setTime((prev) => ({ ...prev, hour: e }));
  };
  const selectMinute = (e: any) => {
    setTime((prev) => ({ ...prev, minute: e }));
  };
  const selectDay = (type: any) => {
    setTime((prev) => ({ ...prev, day: type }));
  };
  const hours = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minutes = ["00", "15", "30", "45"];
  const [showSenderName, setShowSenderName] = useState(false);
  const [formValue, setFormValue] = useState({
    type: orderType,
    deliveryDate: "",
    time: "",
    cardText: "",
    addressSelected: false,
    phone: "",
    address: "",
    giftAdd: "4",
    sentFrom: "",
    sentTo: "",
    giftLink: "",
  });
  useEffect(() => {
    setFormValue((prev) => ({
      type: orderType,
      deliveryDate: "",
      time: "",
      cardText: "",
      addressSelected: false,
      phone: "",
      address: "",
      giftAdd: "4",
      sentFrom: "",
      sentTo: "",
      giftLink: "",
    }));
  }, [orderType]);
  // useEffect(() => {
  //   console.log("ssad");
  // }, [formValue.deliveryDate]);

  const [errors, setErrors] = useState<any>({
    deliveryDate: false,
    address: false,
    time: false,
    unvalidTime: false,
    phone: false,
    withGiftRequred: false,
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

  function isTimeInFuture(timeString, dateString) {
    // Parse the time string
    const [period, time] = timeString.split(":");
    const [hours, minutes] = [parseInt(time, 10), parseInt(time.slice(-2), 10)];

    // Parse the date string
    const [year, month, day] = dateString.split("-").map(Number);

    // Create a Date object for the provided date
    const futureTime = new Date(year, month - 1, day);

    if (period === "AM") {
      futureTime.setHours(hours % 12, minutes, 0, 0);
    } else if (period === "PM") {
      futureTime.setHours((hours % 12) + 12, minutes, 0, 0);
    }

    // Get the current date and time
    const now = new Date();
    return futureTime > now;
  }
  useEffect(() => {
    if (formValue.deliveryDate && formValue.time) {
      console.log(isTimeInFuture(formValue.time, formValue.deliveryDate));
    }
    console.log(formValue.deliveryDate);
  }, [formValue]);
  const validate = () => {
    let deliveryDate = true;
    let address = true;
    let phone = true;
    let unvalidTime = true;
    let withGiftRequred = true;
    if (formValue.deliveryDate.length <= 0) {
      setErrors((prev: any) => ({ ...prev, deliveryDate: true }));
      deliveryDate = false;
    }
    if (formValue.phone.length <= 0) {
      setErrors((prev: any) => ({ ...prev, phone: true }));
      phone = false;
    }
    if (selectAdress && formValue.address.length <= 0) {
      setErrors((prev: any) => ({ ...prev, address: true }));
      address = false;
    }
    if (formValue.time.length <= 0) {
      setErrors((prev: any) => ({ ...prev, time: true }));
      address = false;
    }
    if (formValue.giftAdd !== "4" && selectedCard.length === 0) {
      setErrors((prev: any) => ({ ...prev, withGiftRequred: true }));
      withGiftRequred = false;
    }
    if (!isTimeInFuture(formValue.time, formValue.deliveryDate)) {
      setErrors((prev: any) => ({ ...prev, unvalidTime: true }));
      unvalidTime = false;
    }

    return deliveryDate && phone && address && withGiftRequred && unvalidTime;
  };
  const validateAndAddToCart = async (formValue: any) => {
    let isValid = validate();
    if (isValid) handleAddToCart(formValue);
  };
  useEffect(() => {
    if (
      (time_.hour && time_.hour !== "00" && time_.day === "am") ||
      (time_.hour && time_.hour !== "00" && time_.day === "pm")
    ) {
      setFormValue((prev) => ({
        ...prev,
        time: `${
          time_.day === "am" ? "AM" : time_.day === "pm" ? "PM" : "--"
        }:${time_.hour || "00"}:${time_.minute || "00"}`,
      }));
      setErrors((prev: any) => ({ ...prev, time: false, unvalidTime: false }));
    }
  }, [time_]);
  function generateRandom() {
    let digits = "0123456789abcdefghijklmnopqrestuv";
    let nums = "";
    let len = digits.length;
    for (let i = 0; i < 5; i++) {
      nums += digits[Math.floor(Math.random() * len)];
    }
    return nums;
  }

  const handleSelectedGiftCard = (item: any) => {
    let randomNum = generateRandom();
    setSelectedCard((prev: any) => [
      ...prev,
      {
        ...item,
        quantity: 1,
        cartId: `${item?._id}-${randomNum}`,
        color: item?.colors?.length > 0 ? item?.colors[0] : null,
        text: item?.textArr?.length > 0 ? item?.textArr[0] : null,
      },
    ]);
    setErrors((prev: any) => ({ ...prev, withGiftRequred: false }));
    setShopingCards(false);
  };

  const handleRemoveGiftCard = (id: string) => {
    let newList = selectedCard?.filter(
      (item: { _id: string }) => item?.cartId !== id
    );
    setSelectedCard(newList);
  };
  const handleAddQuantity = (id: string) => {
    console.log(id);
    let item = selectedCard?.find(
      (item: { _id: string }) => item?.cartId === id
    );
    item.quantity += 1;
    const newItems = selectedCard?.map((prevItem: any) => {
      if (item?.cartId === prevItem?.cartId) {
        return item;
      } else {
        return prevItem;
      }
    });
    setSelectedCard(newItems);
  };
  const handleRemoveQuantity = (id: string) => {
    let item = selectedCard?.find(
      (item: { _id: string }) => item?.cartId === id
    );
    item.quantity -= 1;
    const newItems = selectedCard?.map((prevItem: any) => {
      if (item?.cartId === prevItem?.cartId) {
        return item;
      } else {
        return prevItem;
      }
    });
    setSelectedCard(newItems);
  };
  const handleSlectedGiftOptions = (id, option, val) => {
    let item = selectedCard?.find(
      (item: { _id: string }) => item?.cartId === id
    );
    item[option] = val;
    const newItems = selectedCard?.map((prevItem: any) => {
      if (item?.cartId === prevItem?.cartId) {
        return item;
      } else {
        return prevItem;
      }
    });
    setSelectedCard(newItems);
  };
  useEffect(() => {
    console.log(formValue.time);
    console.log(formValue.deliveryDate);
  }, [formValue.time]);

  return (
    <>
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
                <span className="uppercase">بيانات الطلب الخاص بهديتك</span>
              ) : (
                <span className="uppercase">بيانات الطلب </span>
              )}
              {/* <svg
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
              </svg> */}
              {orderType === "GIFT_ORDER" && (
                <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                  (سنقوم بتغليف هديتك)
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
                  <textarea
                    value={formValue.cardText}
                    onChange={(e) => handleChange(e)}
                    name="cardText"
                    style={{ height: "100px" }}
                    className="rounded-2xl mt-1.5 text-sm font-normal h-11 px-4 py-3 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800"
                  ></textarea>
                </div>
              </div>
            </>
          )}
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">تاريخ التوصيل</Label>
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

          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">
               {formSettingInfo?.tag || "وقت التوصيل ( متاح من 12 الظهر الي 11م)"} 
              </Label>
              <div
                id="time-picker"
                style={{ width: "500px", position: "relative" }}
              >
                <Input
                  className="mt-1.5"
                  placeholder=""
                  defaultValue={""}
                  type={"text"}
                  value={`${time_.minute || "00"}  : ${time_.hour || "00"}: ${
                    time_.day === "am" ? "AM" : time_.day === "pm" ? "PM" : "--"
                  }`}
                  onFocus={() => setShowTime_(true)}
                  onMouseEnter={() => setShowTime_(true)}
                  style={{ border: errors.deliveryDate && "1px solid red" }}
                />
                {showTime_ && (
                  <div
                    className="time-select"
                    style={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      width: "300px",
                      height: "220px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    onMouseLeave={() => setShowTime_(false)}
                  >
                    <div className="time">
                      <div className="time-title">الساعة</div>
                      {hours.map((item) => {
                        return (
                          <div
                            id={item}
                            onClick={() => selectHour(item)}
                            key={item}
                            style={{
                              backgroundColor:
                                time_.hour === item ? "silver" : "#fff",
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    <div className="minute">
                      <div className="time-title">دقيقة</div>
                      {minutes.map((item) => {
                        return (
                          <div
                            id={item}
                            onClick={() => selectMinute(item)}
                            key={item}
                            style={{
                              backgroundColor:
                                time_.minute === item ? "silver" : "#fff",
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    <div className="pm-am">
                      <div className="time-title">ص م</div>
                      <div
                        id="am"
                        style={{
                          backgroundColor:
                            time_.day === "am" ? "silver" : "#fff",
                        }}
                        onClick={() => selectDay("am")}
                      >
                        ص
                      </div>
                      <div
                        id="pm"
                        style={{
                          backgroundColor:
                            time_.day === "pm" ? "silver" : "#fff",
                        }}
                        onClick={() => selectDay("pm")}
                      >
                        م
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {errors.time && (
                <span style={{ color: "red" }}>يجب تحديد وقت التوصيل</span>
              )}
              {errors.unvalidTime && (
                <span style={{ color: "red" }}>
                  يجب تحديد وقت الاستلام بشكل صحيح
                </span>
              )}
            </div>
          </div>
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">رقم المستلم</Label>
              <Input
                className="mt-1.5"
                placeholder=""
                name="phone"
                value={formValue.phone}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                  setErrors((prev: { phone: boolean }) => ({
                    ...prev,
                    phone: false,
                  }));
                }}
                defaultValue={""}
                type={"tel"}
              />
            </div>
          </div>
          {errors.phone && (
            <span style={{ color: "red" }}>يجب تحديد رقم المتسلم</span>
          )}

          {orderType !== "GIFT_ORDER" && (
            <>
              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                <div className="flex-1">
                  <Label className="text-sm">
                    نص البطاقة - اكتب إهدائك هنا ( + 6.00 ر.س )
                  </Label>

                  <textarea
                    value={formValue.cardText}
                    onChange={(e) => handleChange(e)}
                    name="cardText"
                    style={{ height: "100px" }}
                    className="rounded-2xl mt-1.5 text-sm font-normal h-11 px-4 py-3 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800"
                  ></textarea>
                </div>
              </div>
            </>
          )}
          <Checkbox
            className="!text-sm address-box"
            name="uudai"
            label="لا اعرف عنوان المستلم (فريق الدعم سيتواصل مع المستلم) "
            onChange={(e) => setSelectAdress(!e)}
          />
          {selectAdress && (
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 ">
              <div className="flex-1 justify-between">
                <Label className="text-sm">العنوان</Label>
                <Input
                  className="mt-1.5"
                  placeholder="يفضل كتابة العنوان المختصر XXXX0000"
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
          {orderType === "GIFT_ORDER" && (
            <>
              <p>اظهر اسمك مع الهدية للمستلم</p>
              <div className="flex flex-col sm:flex-row sender-name-btn">
                <ButtonSecondary
                  className={`flex-2 flex-shrink-0 ${
                    showSenderName && "active"
                  }`}
                  onClick={() => setShowSenderName(true)}
                >
                  نعم
                </ButtonSecondary>
                <ButtonSecondary
                  className={`flex-2 flex-shrink-0 ${
                    !showSenderName && "active"
                  }`}
                  onClick={() => setShowSenderName(false)}
                >
                  لا
                </ButtonSecondary>
              </div>
              {showSenderName ? (
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
              ) : null}
            </>
          )}
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label>اضافات</Label>
              <Select
                className="mt-1.5"
                value={formValue.giftAdd}
                name="giftAdd"
                onChange={(e) => {
                  handleChange(e);
                  setErrors((prev: any) => ({
                    ...prev,
                    withGiftRequred: false,
                  }));
                }}
              >
                <option value="1">كروت اهداء</option>
                <option value="2">شيكولاته بلجيكيه</option>
                <option value="3">بالونات</option>
                <option value="4">بدون اضافات</option>
              </Select>
              {errors.withGiftRequred && (
                <span style={{ color: "red", marginTop: "10px" }}>
                  لم يتم اختيار اضافات ورود
                </span>
              )}
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
                    onClick={() => setShopingCards(true)}
                  >
                    اختر كروت اهداء
                  </ButtonSecondary>
                ) : formValue.giftAdd === "2" ? (
                  <ButtonSecondary
                    className="flex-2 flex-shrink-0 "
                    onClick={() => setShopingCards(true)}
                  >
                    اختر شيكولاته بلجيكية
                  </ButtonSecondary>
                ) : formValue.giftAdd === "3" ? (
                  <ButtonSecondary
                    className="flex-2 flex-shrink-0 "
                    onClick={() => setShopingCards(true)}
                  >
                    اختر بالون
                  </ButtonSecondary>
                ) : null}
              </div>
              {selectedCard?.length
                ? selectedCard.map(
                    (item: {
                      id: string;
                      name: string;
                      _id: string;
                      quantity: number;
                    }) => {
                      return (
                        <PurchaseAdd
                          key={item?.cartId}
                          item={item}
                          handleRemoveQuantity={handleRemoveQuantity}
                          handleAddQuantity={handleAddQuantity}
                          handleRemoveGiftCard={handleRemoveGiftCard}
                          handleSlectedGiftOptions={handleSlectedGiftOptions}
                          handleSelectedGiftCard={handleSelectedGiftCard}
                        />
                      );
                    }
                  )
                : null}
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
            <>
              <div className="flex flex-col sm:flex-row pt-6 gift-btn">
                {formValue.giftAdd === "1" ? (
                  <ButtonSecondary
                    className="flex-2 flex-shrink-0 "
                    onClick={() => setShopingCards(true)}
                  >
                    اختر كروت اهداء
                  </ButtonSecondary>
                ) : formValue.giftAdd === "2" ? (
                  <ButtonSecondary
                    className="flex-2 flex-shrink-0 "
                    onClick={() => setShopingCards(true)}
                  >
                    اختر شيكولاته بلجيكية
                  </ButtonSecondary>
                ) : formValue.giftAdd === "3" ? (
                  <ButtonSecondary
                    className="flex-2 flex-shrink-0 "
                    onClick={() => setShopingCards(true)}
                  >
                    اختر بالون
                  </ButtonSecondary>
                ) : null}
              </div>
              {selectedCard?.length
                ? selectedCard.map(
                    (item: {
                      id: string;
                      name: string;
                      _id: string;
                      quantity: number;
                    }) => {
                      return (
                        <PurchaseAdd
                          key={item?.cartId}
                          item={item}
                          handleRemoveQuantity={handleRemoveQuantity}
                          handleAddQuantity={handleAddQuantity}
                          handleRemoveGiftCard={handleRemoveGiftCard}
                          handleSlectedGiftOptions={handleSlectedGiftOptions}
                          handleSelectedGiftCard={handleSelectedGiftCard}
                        />
                      );
                    }
                  )
                : null}
              <div className="flex flex-col sm:flex-row pt-6">
                <ButtonPrimary
                  className="flex-1 flex-shrink-0"
                  onClick={() => validateAndAddToCart(formValue)}
                >
                  اضف الى السلة
                </ButtonPrimary>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalCards
        show={shopingCards}
        onClose={() => setShopingCards(false)}
        selectCard={handleSelectedGiftCard}
        data={undefined}
        type={formValue.giftAdd}
      />
    </>
  );
};

export default AdressForm;
