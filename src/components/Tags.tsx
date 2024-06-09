"use client";
import _axios from "@/contains/api/axios";
import Footer from "@/shared/Footer/Footer";
import { useEffect, useState } from "react";

const Tags = () => {
  const [tags, setTags] = useState({ head: "", body: "" });
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    -_axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`)
      .then((res) => res.data.data)
      .then((data) => {
        setTags((prev) => ({
          ...prev,
          head: data.find((item: any) => item.type === "HEAD")?.tag,
          body: data.find((item: any) => item.type === "BODY")?.tag,
        }));
        setFooter(
          data.filter(
            (item: { type: string }) =>
              item.type !== "BODY" || item?.type !== "HEAD"
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (tags.head.length > 0) {
      let arrOfTags = tags.head.split(/\r?\n|\r|\n/g);
      for (let i = 0; i < arrOfTags.length; i++) {
        if (arrOfTags[i].length > 0) {
          var doc = new DOMParser().parseFromString(arrOfTags[i], "text/xml");
          if (doc) {
            //@ts-ignore
            document.head.appendChild(doc.firstChild);
          }
        }
      }
    }
  }, [tags.head]);

  return (
    <>
      <Footer data={footer} />
      <div dangerouslySetInnerHTML={{ __html: tags.body }} />
    </>
  );
};

export default Tags;
