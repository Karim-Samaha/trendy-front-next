"use client";
import React, { FC, useEffect, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { getServerAuthSession } from "../../server/auth";
import Link from "next/link";

import { getCsrfToken, getSession, signIn, useSession } from "next-auth/react";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = () => {
  const { data } = useSession();
  const [loginForm, setLoginInForm] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSignIn = (e: any) => {
    e.preventDefault();
    let credentials = loginForm;
    signIn("credentials", { ...credentials, redirect: false })
      .then(async (res: any) => {
        if (res?.ok) {
          window.location.assign("/");
        } else {
          let apiResults = await JSON.parse(res?.error);
          if (apiResults.user?.error === "wrongCredintials") {
            setError("البيانات غير صحيحه");
          }
        }
        console.log({ res });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setLoginInForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);
  {
    console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);
  }
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          تسجيل الدخول
        </h2>
        <div className="max-w-md mx-auto space-y-6 dir-rtl">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          <div className="relative text-center">
            {/* <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div> */}
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleSignIn}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                البريد الالكتروني
              </span>
              <Input
                name="username"
                placeholder="example@example.com"
                className="mt-1"
                label="username"
                value={loginForm.username}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                كلمه المرور
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  لا اتذكر كلمة المرور ؟
                </Link>
              </span>
              <Input
                type="password"
                name="password"
                label="password"
                className="mt-1"
                value={loginForm.password}
                onChange={(e) => handleChange(e)}
              />
            </label>
            {error.length > 0 ? <span style={{color: "red"}}>{error}</span> : null}
            <ButtonPrimary type="submit">تسجيل الدخول</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link className="text-green-600" href="/signup">
              انشاء حساب
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
