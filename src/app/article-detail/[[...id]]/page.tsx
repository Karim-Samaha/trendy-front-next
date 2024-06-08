import rightImg from "@/images/hero-right1.png";
import axios from "axios";
import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Image from "next/image";
import { formatDate } from "@/utils/adjustNames";
async function getArticle(id: string) {
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`)
    .then((res) => res.data.data)
    .then((data) => {
      return data.find((item: { _id: string }) => item._id === id);
    });
  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

const ArticleDetailPage = async ({ params }: { params: any }) => {
  const article = await getArticle(params.id[0]);
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      {/* <BgGlassmorphism /> */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28 dir-rtl">
        <div className="lg:flex justify-between" style={{ direction: "rtl" }}>
          {/* CONTENT */}
          <div className="w-full lg:w-[35%] ">
            {/* HEADING */}
            <div className="relative">
              <Image
                width={500}
                height={600}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/public/imgs${article?.imageSrc}`}
                className=" rounded-2xl object-cover product-img"
                alt="product detail 1"
              />
            </div>
          </div>
          <div className="w-full lg:w-[60%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {article?.name}
            </h1>
            <p style={{ opacity: ".5" }}>{formatDate(article.createdAt)}</p>
            <article style={{ marginTop: "20px" }}>{article?.body}</article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
