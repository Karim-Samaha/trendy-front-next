"use client";
import React, { FC, useEffect, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import { useRouter } from "next/navigation";

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
    name: string;
    phone: string;
  }>({
    username: "",
    password: "",
    name: "",
    phone: "",
  });
  const [method, setMethod] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [isNewRegester, setIsNewRegester] = useState(false);
  const [validResend, setValidResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const [resended, setResended] = useState(false);

  useEffect(() => {
    if (!validResend) {
      setResendTimer(30);
      setTimeout(() => {
        setValidResend(true);
        setResended(false);
      }, 30000);
    }
  }, [validResend]);
  useEffect(() => {
    if (resendTimer > 0) {
      setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
  }, [resendTimer]);
  const handleSignIn = async () => {
    let credentials = loginForm;
    let newUserNotValid =
      (isNewRegester && !loginForm.name) || (isNewRegester && !loginForm.name);
    if (newUserNotValid) {
      setError("يجد ادخال كل اليانات المطلوبة");
      return;
    }
    if (method === "phone" && loginForm.username.substring(0, 3) !== "966") {
      credentials.username = `966${credentials.username}`;
    }
    await signIn("credentials", { ...credentials, redirect: false })
      .then(async (res: any) => {
        if (res?.ok) {
          const urlParams = new URLSearchParams(window.location.search);
          const callback = urlParams.get("callback");
          if (callback) {
            window.location.assign(`${callback}`);
          } else {
            window.location.assign("/");
          }
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
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleOtpRequest = async () => {
    if (method === "phone") {
      await _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/generate-phone-otp`,
          {
            phone: loginForm.username,
          }
        )
        .then((res) => {
          setOtpSent(true);
        });
    } else {
      let isEmailValid = validateEmail(loginForm.username);
      if (!isEmailValid) setError("البيانات غير صحيحه");

      if (isEmailValid) {
        try {
          await _axios
            .post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/generate-mail-otp`,
              {
                email: loginForm.username,
              }
            )
            .then((res) => {
              if (res.data?.status === "EMAIL_OTP_SENT") {
                setOtpSent(true);
                setError("");
              }
              if (res.data?.isNewRegester) {
                setIsNewRegester(true);
              }
            });
          // }
        } catch (err) {
          setError("حدث حطأ ما");
        }
      }
    }
  };
  const resentOtp = async () => {
    let phoneNum = loginForm.username
    if (!phoneNum.substring(0, 3) !== '966'){
      phoneNum = `966${phoneNum}`
    }
    await _axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-phone-otp`, {
        phone: phoneNum,
      })
      .then((res) => {
        setValidResend(false);
        setResended(true);
      });
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
          {method === "email" || method === "phone" ? (
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
                    placeholder="966+"
                    className="mt-1"
                    label="username"
                    value={loginForm.username}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                  />
                </label>
              ) : null}
              {otpSent && (
                <>
                  {isNewRegester && (
                    <>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        الاسم بالكامل
                      </span>
                      <label className="block">
                        <Input
                          type="name"
                          name="name"
                          label="الاسم بالكامل"
                          className="mt-1"
                          value={loginForm.name}
                          onChange={(e) => {
                            handleChange(e);
                            setError("");
                          }}
                          required={true}
                          style={{
                            border: "1px solid #e5e7eb",
                          }}
                        />
                      </label>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        رقم الجوال
                      </span>
                      <label className="block">
                        <Input
                          type="phone"
                          name="phone"
                          label="رقم الهاتف"
                          className="mt-1"
                          value={loginForm.phone}
                          onChange={(e) => {
                            if (/^\d*$/.test(e.target.value)) {
                              handleChange(e);
                              setError("");
                            }
                          }}
                          required={true}
                          style={{
                            border: "1px solid #e5e7eb",
                          }}
                        />
                      </label>
                      <span className="text-neutral-800 dark:text-neutral-200">
                        رمز التحقق
                      </span>
                    </>
                  )}

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
                  {method === "phone" && (
                    <p>
                      لم يصلك رمز التحقق ؟{" "}
                      {validResend ? (
                        <span style={{ color: "blue", cursor: "pointer" }} onClick={resentOtp}>
                          اعاردة الارسال
                        </span>
                      ) : (
                        <span> تم اعادة ارسال رمز التحقق {resendTimer}</span>
                      )}
                    </p>
                  )}
                </>
              )}
              {error.length > 0 ? (
                <span style={{ color: "red" }}>{error}</span>
              ) : null}
              {otpSent ? (
                <>
                  <p>
                    بالضغط على دخول الطلب فأنت توافق على{" "}
                    <Link
                      href={"/terms"}
                      style={{ textDecoration: "underline" }}
                    >
                      سياسة الخصوصية
                    </Link>
                  </p>
                  <ButtonPrimary onClick={handleSignIn}>
                    تسجيل الدخول
                  </ButtonPrimary>
                </>
              ) : (
                <ButtonPrimary onClick={handleOtpRequest}>
                  ارسال رمز التحقق
                </ButtonPrimary>
              )}
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
