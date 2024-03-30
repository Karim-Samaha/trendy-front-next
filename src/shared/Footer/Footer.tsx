import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import AppleImg from "@/images/apple.svg";
import AndroidImg from "@/images/android.svg";
import Link from "next/link";
import Image from "next/image";
import PhoneIcon from "@/images/icons/phone-call.svg";
import VatIcon from "@/images/icons/vat.png";
export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "روابط هامة",
    menus: [
      { href: "/", label: "الشروط والأحكام" },
      { href: "/", label: "سياسة الاستبدال والاسترجاع" },
      { href: "/", label: "سياسة الشحن والدفع" },
      { href: "/", label: "خدمة العملاء والشكاوى والاقتراحات" },
      { href: "/", label: "التراخيص" },
    ],
  },
  {
    id: "3",
    title: "العنوان",
    menus: [
      { href: "/", label: " الرياض - المملكة العربية السعودية      " },
      { href: "/", label: "الشروط والأحكام" },
    ],
  },

  // {
  //   id: "2",
  //   title: "Resources",
  //   menus: [
  //     { href: "/", label: "Best practices" },
  //     { href: "/", label: "Support" },
  //     { href: "/", label: "Developers" },
  //     { href: "/", label: "Learn design" },
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "Community",
  //   menus: [],
  // },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="">
        <h2 className="">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu?.menus?.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className=""
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer>
      <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700 ">
        <div className="footer-container">
          <div className="section-one">
            <Logo />
            <h3>عن الزهرة العصرية</h3>
            <p>
              متجر الزهرة العصرية، الذي تأسس في عام 2019 في الرياض، هو وجهتك
              المثالية لاكتساب تجربة فريدة في عالم الورود والهدايا الراقية. يجمع
              المتجر بين الفخامة والإبداع، مقدمًا مجموعة متنوعة من فازات
              وبوكيهات الورود الطبيعية والصناعية والشوكلت وبوكسات الاسماك
              والبالونات والبطاقات، إضافة إلى هدايا مميزة ومبتكرة وحديثة.
            </p>
            <div className="linkContainer">
              <Link href="/">
                <Image width={150} height={100} src={AppleImg} />
              </Link>
              <Link href="/">
                <Image width={150} height={100} src={AndroidImg} />
              </Link>
            </div>
          </div>
          <div className="section-two">
            {renderWidgetMenuItem(widgetMenus[0])}
          </div>

          <div className="section-three">
            <h2>العنوان</h2>
            <p> الرياض - المملكة العربية السعودية</p>
            <h3>حسابات التواصل</h3>
            <div className="contact">
              <div className="contact-icon">
                <Image width={30} height={30} src={PhoneIcon} />
              </div>
              <div className="contact-icon">
                <Image width={30} height={30} src={PhoneIcon} />
              </div>
              <div className="contact-icon">
                <Image width={30} height={30} src={PhoneIcon} />
              </div>
            </div>
            <div className="legal">
              <div className="legal-item">
                <Image width={40} height={5} src={VatIcon} />
                <div className="info">
                  {" "}
                  <p>الرقم الضريبي</p>
                  <p>310457496200003</p>
                </div>
              </div>
              <div className="legal-item">
                <Image width={40} height={5} src={VatIcon} />
                <div className="info">
                  {" "}
                  <p>منصة الأعمال</p>
                  <p>0000038617</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
