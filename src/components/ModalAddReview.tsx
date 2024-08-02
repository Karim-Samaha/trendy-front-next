"use client";
import { Dialog, Transition } from "@/app/headlessui";
import React, { FC, Fragment, useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
export interface AddReviewModal {
  show: boolean;
  onClose: () => void;
  data: any;
  id: string;
}

const ModalAddReview: FC<AddReviewModal> = ({ show, onClose, data, id }) => {
  const { data: session } = useSession();
  const [submited, setSubmited] = useState<boolean>(false);
  const [formValue, setFormValue] = useState({
    productReview: "",
    storeReview: "",
    productRate: 1,
    storeRate: 1,
  });
  const handleChange = (e: any) => {
    setFormValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitReview = () => {
    _axios(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}?channel=web`,
      {
        storeReview: formValue.storeReview,
        storeRating: formValue.storeRate,
        productReview: formValue.productReview,
        productRating: formValue.storeRate,
      },
      //@ts-ignore
      { session }
    )
      .then((res) => setSubmited(true))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="relative inline-flex xl:py-8 w-full max-w-5xl max-h-full">
        <div
          className="flex-1 flex overflow-hidden max-h-full p-8 w-full text-left align-middle transition-all transform lg:rounded-2xl bg-white 
              dark:bg-neutral-900 dark:border dark:border-slate-700 dark:text-slate-100 shadow-xl dir-rtl"
        >
          <span className="absolute end-3 top-3 z-50">
            <ButtonClose onClick={onClose} />
          </span>
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              {submited ? (
                <>
                  <div
                    style={{
                      minHeight: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      تم ارسال تقيمك بنجاح
                    </h2>
                  </div>
                </>
              ) : null}
              {!submited && (
                <>
                  <div style={{ textAlign: "right" }}>
                    <Label className="text-sm">رأيك عن المنتج</Label>
                  </div>
                  <Input
                    className="mt-1.5 rate-input"
                    placeholder="تقييم المنتج"
                    name="productReview"
                    value={formValue.productReview}
                    onChange={(e) => handleChange(e)}
                    type={"text"}
                  />
                  <div style={{ textAlign: "right" }}>
                    <Label className="text-sm">قيم المنتج</Label>
                  </div>
                  <ReactStars
                    count={5}
                    onChange={(e: any) =>
                      setFormValue((prev) => ({
                        ...prev,
                        productRate: e,
                      }))
                    }
                    classNames="star-pick"
                    size={24}
                    activeColor="#ffd700"
                  />
                  <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <Label className="text-sm">رأيك عن الموقع</Label>
                  </div>
                  <Input
                    className="mt-1.5 rate-input"
                    placeholder="تقييم المتجر"
                    name="storeReview"
                    value={formValue.storeReview}
                    onChange={(e) => handleChange(e)}
                    defaultValue={""}
                    type={"text"}
                  />
                  <div style={{ textAlign: "right" }}>
                    <Label className="text-sm">قيم الموقع</Label>
                  </div>
                  <ReactStars
                    count={5}
                    onChange={(e: any) =>
                      setFormValue((prev) => ({
                        ...prev,
                        storeRate: e,
                      }))
                    }
                    classNames="star-pick"
                    size={24}
                    activeColor="#ffd700"
                  />
                  <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <ButtonPrimary onClick={submitReview}>
                      ارسال التقييم
                    </ButtonPrimary>
                  </div>
                </>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default ModalAddReview;
