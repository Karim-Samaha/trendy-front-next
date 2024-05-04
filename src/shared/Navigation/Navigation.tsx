import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import axios from "axios";

function Navigation() {
  const ourNav = [
    NAVIGATION_DEMO_2[4],
    NAVIGATION_DEMO_2[4],
    NAVIGATION_DEMO_2[4],
    NAVIGATION_DEMO_2[5],
    NAVIGATION_DEMO_2[5],
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?subCtg=true&channel=web`
    )
      .then((res) => res.data.data)
      .then((items) => {
        setData(
          items
            .slice(0, 7)
            .reverse()
            .map((item: any) => ({
              type:
                item.name === "ورود للتهنئة"
                  ? "megaMenu"
                  : item.name === "الاكثر مبيعا"
                  ? null
                  : "dropdown",
              id: item._id,
              href: `/category/${item?._id}`,
              name: item.name,
              image: item.image,
              desc: item.description,
              children: item?.subCategories.map((subCtg: any) => ({
                id: subCtg?._id,
                href: `/category/${item?._id}/${subCtg?._id}`,
                name: subCtg.name,
              })),
            }))
        );
      });
  }, []);
  return (
    <ul className="nc-Navigation flex items-center">
      {data.map((item) => (
        <NavigationItem key={item._id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
