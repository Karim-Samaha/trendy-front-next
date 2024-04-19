"use client";

import { Dialog, Transition } from "@/app/headlessui";
import React, { FC, Fragment, useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import ProductQuickView from "./ProductQuickView";
import ProductQuickView2 from "./ProductQuickView2";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import { usePathname } from "next/navigation";
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
    // if (e.target.name === "address") {
    //   setErrors((prev: any) => ({ ...prev, address: false }));
    // }
  };
  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  const submitReview = () => {
    _axios(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
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
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={() => null}>
        <div className="flex items-stretch md:items-center justify-center h-full text-center md:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
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
                          placeholder=""
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
                          placeholder=""
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
                            ارسال التقيم
                          </ButtonPrimary>
                        </div>
                      </>
                    )}
                  </div>
                </div>{" "}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalAddReview;
