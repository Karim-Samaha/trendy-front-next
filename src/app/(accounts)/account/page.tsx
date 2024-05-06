"use client";
import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";

const AccountPage = () => {
  const { data: session }: any = useSession();
  const [updated, setUpdated] = useState({});
  const [err, setErr] = useState(false);

  const [form, setForm] = useState<{
    name: string;
    email: string;
    address: string;
    phone: string;
  }>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    address: session?.user?.address || "",
    phone: session?.user?.phone || "",
  });

  useEffect(() => {
    if (session?.user) {
      _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-info`,
          {},
          //@ts-ignore
          { session }
        )
        .then((res) => {
          setForm({
            name: res.data.data?.name || "",
            email: res.data.data?.email || "",
            address: res.data.data?.address || "",
            phone: res.data?.data.phone || "",
          });
        });
    }
  }, [session]);

  const handelChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    await _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-info`,
        form,
        //@ts-ignore
        { session }
      )
      .then((res) => {
        setUpdated(res.data);
      })
      .catch((err) => setErr(true));
  };
  useEffect(() => {
    console.log(form);
  }, [form]);
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold dir-rtl">
          بيانات الحساب
        </h2>
        <div className="flex flex-col md:flex-row dir-rtl">
          <div className="flex-shrink-0 flex items-start "></div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6 rtl-dir">
            <div className="rtl-dir">
              <Label>الاسم</Label>
              <Input
                className="mt-1.5"
                value={form.name}
                name="name"
                onChange={(e) => handelChange(e)}
              />
            </div>

            {/* ---- */}

            {/* ---- */}
            <div className="rtl-dir">
              <Label>البريد الالكتروني</Label>
              <div className="mt-1.5 flex">
                <Input
                  className="!rounded-l-none"
                  placeholder=""
                  name="email"
                  value={form.email}
                  onChange={(e) => handelChange(e)}
                />
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
              </div>
            </div>

            <div>
              <Label>العنوان</Label>
              <div className="mt-1.5 flex">
                <Input
                  className="!rounded-l-none"
                  value={form.address}
                  name="address"
                  onChange={(e) => handelChange(e)}
                />
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
              </div>
            </div>

            <div>
              <Label>الهاتف</Label>
              <div className="mt-1.5 flex">
                <Input
                  className="!rounded-l-none"
                  value={form.phone}
                  name="phone"
                  onChange={(e) => handelChange(e)}
                />
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <ButtonPrimary onClick={handleSubmit}>حفظ</ButtonPrimary>
            </div>
            <h2 className="title">
              {updated?.status === "success" && "تم حفظ بياناتك"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
