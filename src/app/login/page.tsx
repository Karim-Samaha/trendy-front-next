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
  const [method, setMethod] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const handleSignIn = () => {
    // e.preventDefault();
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

  const validateEmail = (email: string) => {
    console.log({ debEmail: email === "karim.admin@admin.com" });
    if (email === "karim.admin@admin.com") return true;
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleOtpRequest = () => {
    let isEmailValid = validateEmail(loginForm.username);
    if (!isEmailValid) setError("البيانات غير صحيحه");
    if (isEmailValid) setOtpSent(true);
  };
  return (
    <div
      className={`nc-PageLogin`}
      data-nc-id="PageLogin"
      style={{ minHeight: "400px" }}
    >
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          تسجيل الدخول
        </h2>
        {!method && (
          <div className="login-btn-container">
            <div>
              <ButtonPrimary
                className="login-btn"
                type="submit"
                onClick={() => setMethod("email")}
              >
                تسجيل الدخول عبر البريد الالكتروني
              </ButtonPrimary>
            </div>
            <div>
              <ButtonPrimary
                className="login-btn"
                type="submit"
                onClick={() => setMethod("phone")}
              >
                تسجيل الدخول عبر رقم الهاتف
              </ButtonPrimary>
            </div>
          </div>
        )}
        <div className="max-w-md mx-auto space-y-6 dir-rtl">
          {method === "email" || method === 'phone' ? (
            <form
              className="grid grid-cols-1 gap-6"
              // action="#"
              // method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              {otpSent ? (
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    تم ارسال رمز التحقق الي {loginForm.username}
                  </span>
                </label>
              ) : method === "email" ? (
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
              ) : method === "phone" ? (
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    رقم الجوال
                  </span>
                  <Input
                    name="username"
                    placeholder="9666666666"
                    className="mt-1"
                    label="username"
                    value={loginForm.username}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              ) : null}
              {otpSent && (
                <label className="block">
                  <Input
                    type="password"
                    name="password"
                    label="رمز التحقق"
                    className="mt-1"
                    value={loginForm.password}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              )}
              {error.length > 0 ? (
                <span style={{ color: "red" }}>{error}</span>
              ) : null}
              {otpSent ? (
                <ButtonPrimary onClick={handleSignIn}>
                  تسجيل الدخول
                </ButtonPrimary>
              ) : (
                <ButtonPrimary onClick={handleOtpRequest}>
                  ارسال رمز التحقق
                </ButtonPrimary>
              )}
            </form>
          ) : null}
          {/* <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link className="text-green-600" href="/signup">
              انشاء حساب
            </Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
