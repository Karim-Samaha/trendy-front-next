"use client";
import React, { FC, useEffect, useState } from "react";

export interface AlerProps {
  text: string;
}
const Alert: FC<AlerProps> = ({ text }) => {
  const [alert, setAlert] = useState("");
  useEffect(() => {
    if (text) {
      sessionStorage.setItem("alert", text);
      setAlert(text);
    } else {
      setAlert(sessionStorage.getItem("alert") || "");
    }
  }, []);
  if (!alert) return;
  return (
    <div
      style={{
        width: "98vw",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#5C777D",
        color: "#fff",
        minHeight: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="alert"
    >
      {alert && alert}
    </div>
  );
};

export default Alert;
