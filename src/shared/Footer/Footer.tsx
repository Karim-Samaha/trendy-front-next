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
import BussIcon from "@/images/buss.webp";
import logo from "@/images/footer.png";
import Icon1 from "@/images/footer-icons/zidship_3.png";
import Icon2 from "@/images/footer-icons/mandob.png";
import Icon3 from "@/images/footer-icons/mada-circle.png";
import Icon4 from "@/images/footer-icons/apple_pay.svg";
import Icon5 from "@/images/footer-icons/visa-circle.png";
import Icon6 from "@/images/footer-icons/mastercard-circle.png";
import Icon7 from "@/images/footer-icons/amex.png";
import Icon8 from "@/images/footer-icons/tabby2.svg";
import Icon9 from "@/images/footer-icons/tamara2.svg";

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
      { href: "/terms", label: "الشروط والأحكام" },
      { href: "/refund", label: "سياسة الاستبدال والاسترجاع" },
      { href: "/shipping", label: "سياسة الشحن والدفع" },
      { href: "/complaints", label: "خدمة العملاء والشكاوى والاقتراحات" },
      { href: "/license", label: "التراخيص" },
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
];

const Footer: React.FC<{ data: any }> = ({ data }) => {
  console.log({ data });
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="">
        <h2 className="">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu?.menus?.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className=""
                href={item.href}
                rel="noopener noreferrer"
              >
                {item.label}
              </Link>
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
            {/* <Logo /> */}
            {/* <Image
              width={170}
              height={70}
              src={logo}
              style={{ margin: "25px 0" }}
            /> */}
            <h2 style={{ margin: "55px 0 25PX 0" }}>عن الزهرة العصرية</h2>
            <p>{data.find((item) => item.type === "FOOTER")?.tag}</p>
            <div className="linkContainer">
              <Link href="/">
                <Image
                  width={150}
                  height={100}
                  src={AppleImg}
                  alt="App Store"
                />
              </Link>
              <Link href="/">
                <Image
                  width={150}
                  height={100}
                  src={AndroidImg}
                  alt="Google Play Store"
                />
              </Link>
            </div>
          </div>
          <div className="section-two">
            {renderWidgetMenuItem(widgetMenus[0])}
          </div>

          <div className="section-three">
            <h2>العنوان</h2>
            <p style={{ display: "flex" }}>
              <svg
                width="16"
                height="23"
                viewBox="0 0 16 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M14.9945 8.12828C15.0722 6.23534 14.321 4.39832 12.9243 3.06701C11.6342 1.77187 9.86131 1.0278 7.99991 1C6.13847 1.02779 4.36569 1.77187 3.07555 3.06701C1.67904 4.39851 0.927655 6.23552 1.0055 8.12828C1.09454 10.0212 1.79913 11.8391 3.01929 13.3239L4.72179 15.4514V15.4516C4.082 15.6531 3.48044 15.9533 2.94033 16.3405C2.12472 16.9471 1.69388 17.6855 1.69388 18.4773C1.69388 19.4977 2.40797 20.4231 3.70481 21.0835C5.04146 21.7122 6.51353 22.0256 8.00006 21.9983C9.48712 22.0258 10.9596 21.7122 12.2966 21.0835C13.5935 20.4231 14.3075 19.497 14.3075 18.4773C14.3075 17.6855 13.8767 16.9465 13.0611 16.3405C12.5209 15.9533 11.9194 15.653 11.2796 15.4516L12.9821 13.3241V13.3239C14.2019 11.8392 14.9061 10.0214 14.9948 8.12828H14.9945ZM12.9472 18.4774C12.9472 19.5218 10.9162 20.6859 8.00006 20.6859C5.0839 20.6859 3.0529 19.5219 3.0529 18.4774C3.0529 17.7212 4.08453 16.9608 5.60869 16.5615L7.46198 18.8781H7.46217C7.59081 19.039 7.78956 19.1333 8.00025 19.1333C8.21094 19.1333 8.40986 19.039 8.53852 18.8781L10.3918 16.5619C11.9171 16.961 12.9476 17.721 12.9476 18.4774H12.9472ZM8.00006 17.4033L4.09491 12.5217C1.81344 9.67021 1.78996 6.16354 4.03731 3.99516C5.07326 2.94719 6.49974 2.34151 8.00003 2.31245C9.50058 2.34152 10.927 2.94719 11.963 3.99516C14.2114 6.1649 14.1874 9.67049 11.9054 12.5217L8.00006 17.4033ZM8.00006 4.77583C7.03231 4.77583 6.10413 5.14678 5.41982 5.80714C4.73551 6.46749 4.3509 7.36315 4.3509 8.29701C4.3509 9.23087 4.73531 10.1265 5.41963 10.7869C6.10394 11.4472 7.03211 11.8184 8.00006 11.8182C8.96781 11.8182 9.89599 11.4472 10.5803 10.7869C11.2646 10.1263 11.6488 9.23068 11.6488 8.29682C11.6477 7.36333 11.2631 6.46841 10.5789 5.80821C9.89497 5.1482 8.96737 4.77691 8.00001 4.77578L8.00006 4.77583ZM8.00006 10.5055V10.5056C7.39301 10.5056 6.8108 10.2729 6.38151 9.85882C5.9522 9.44454 5.71103 8.88274 5.71103 8.29696C5.71084 7.71117 5.95202 7.14935 6.38132 6.73509C6.81045 6.32081 7.39267 6.08809 7.99986 6.08809C8.60691 6.08791 9.18912 6.32064 9.61841 6.73491C10.0477 7.14919 10.2889 7.71098 10.2889 8.29677C10.2881 8.88237 10.0468 9.44382 9.61783 9.85788C9.1887 10.272 8.60686 10.5049 8.00006 10.5056V10.5055Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.3"
                ></path>{" "}
              </svg>
              <span style={{ margin: "0 5px" }}>
                الرياض - المملكة العربية السعودية
              </span>
            </p>
            <h3>حسابات التواصل</h3>
            <div className="contact">
              <a href={data.find((item) => item.type === "phone")?.tag}>
                <div className="contact-icon">
                  <svg
                    width="22"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </div>
              </a>
              <div className="contact-icon">
                <a href={data.find((item) => item.type === "insta")?.tag}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M13.0001 4.11604C15.889 4.11604 16.2357 4.12687 17.3775 4.17887C18.0647 4.18698 18.7453 4.31329 19.3897 4.55227C19.8601 4.72591 20.2855 5.00282 20.6348 5.36261C20.9946 5.71186 21.2715 6.13734 21.4451 6.60774C21.6841 7.25206 21.8104 7.93271 21.8185 8.61987C21.8705 9.76389 21.8835 10.1106 21.8835 12.9995C21.8835 15.8884 21.8727 16.2351 21.8207 17.3769C21.8126 18.0641 21.6863 18.7447 21.4473 19.3891C21.267 19.8561 20.9909 20.2802 20.637 20.6342C20.283 20.9882 19.8588 21.2642 19.3918 21.4445C18.7475 21.6835 18.0669 21.8098 17.3797 21.8179C16.2379 21.8699 15.8948 21.8808 13.0023 21.8808C10.1097 21.8808 9.76667 21.8699 8.62482 21.8179C7.93765 21.8098 7.25701 21.6835 6.61268 21.4445C6.14228 21.2709 5.71681 20.994 5.36756 20.6342C5.00776 20.2849 4.73086 19.8595 4.55721 19.3891C4.31824 18.7447 4.19193 18.0641 4.18382 17.3769C4.12965 16.2351 4.11665 15.892 4.11665 12.9995C4.11665 10.1069 4.12748 9.76389 4.17948 8.62204C4.18759 7.93487 4.3139 7.25423 4.55288 6.6099C4.72716 6.1393 5.00481 5.71381 5.36539 5.36478C5.71464 5.00499 6.14012 4.72808 6.61052 4.55443C7.25484 4.31546 7.93548 4.18915 8.62265 4.18104C9.7645 4.12904 10.1112 4.11604 13.0001 4.11604ZM13.0001 2.16602C10.0577 2.16602 9.68866 2.17829 8.53382 2.23102C7.6348 2.25006 6.74547 2.42099 5.90345 2.73658C5.18105 3.00846 4.52648 3.43432 3.9852 3.98459C3.43415 4.52566 3.00754 5.18024 2.73502 5.90284C2.41944 6.74486 2.24851 7.63419 2.22946 8.53321C2.1789 9.68805 2.16663 10.0571 2.16663 12.9995C2.16663 15.9419 2.1789 16.3109 2.23163 17.4658C2.25067 18.3648 2.4216 19.2541 2.73719 20.0961C3.0097 20.8187 3.43632 21.4733 3.98737 22.0144C4.52844 22.5654 5.18302 22.992 5.90562 23.2646C6.74764 23.5801 7.63697 23.7511 8.53598 23.7701C9.69155 23.8228 10.0599 23.8351 13.0023 23.8351C15.9446 23.8351 16.3137 23.8228 17.4685 23.7701C18.3676 23.7511 19.2569 23.5801 20.0989 23.2646C20.8183 22.9857 21.4716 22.5599 22.0172 22.0144C22.5627 21.4688 22.9885 20.8155 23.2673 20.0961C23.5829 19.2541 23.7538 18.3648 23.7729 17.4658C23.8256 16.3102 23.8379 15.9419 23.8379 12.9995C23.8379 10.0571 23.8256 9.68805 23.7729 8.53321C23.7538 7.63419 23.5829 6.74486 23.2673 5.90284C22.9948 5.18024 22.5682 4.52566 22.0172 3.98459C21.4761 3.43354 20.8215 3.00693 20.0989 2.73441C19.2569 2.41883 18.3676 2.2479 17.4685 2.22885C16.3115 2.17829 15.9425 2.16602 13.0001 2.16602Z"
                      fill="white"
                    ></path>{" "}
                    <path
                      d="M12.9999 7.4375C11.9 7.4375 10.8248 7.76366 9.91028 8.37473C8.99575 8.9858 8.28296 9.85434 7.86204 10.8705C7.44113 11.8867 7.331 13.0049 7.54558 14.0836C7.76016 15.1624 8.28981 16.1533 9.06756 16.931C9.8453 17.7088 10.8362 18.2384 11.915 18.453C12.9937 18.6676 14.1119 18.5575 15.1281 18.1365C16.1442 17.7156 17.0128 17.0028 17.6239 16.0883C18.2349 15.1738 18.5611 14.0986 18.5611 12.9987C18.5611 11.5238 17.9752 10.1093 16.9323 9.06633C15.8893 8.02341 14.4748 7.4375 12.9999 7.4375ZM12.9999 16.6098C12.2857 16.6098 11.5875 16.398 10.9937 16.0012C10.3998 15.6045 9.93695 15.0405 9.66363 14.3806C9.39031 13.7208 9.3188 12.9947 9.45813 12.2942C9.59747 11.5937 9.9414 10.9502 10.4464 10.4452C10.9515 9.94018 11.5949 9.59625 12.2954 9.45691C12.9959 9.31757 13.722 9.38909 14.3818 9.66241C15.0417 9.93573 15.6057 10.3986 16.0025 10.9924C16.3993 11.5863 16.6111 12.2845 16.6111 12.9987C16.6111 13.9564 16.2306 14.8749 15.5534 15.5522C14.8762 16.2294 13.9576 16.6098 12.9999 16.6098Z"
                      fill="white"
                    ></path>{" "}
                    <path
                      d="M18.7832 8.51605C19.5011 8.51605 20.0832 7.93401 20.0832 7.21603C20.0832 6.49805 19.5011 5.91602 18.7832 5.91602C18.0652 5.91602 17.4832 6.49805 17.4832 7.21603C17.4832 7.93401 18.0652 8.51605 18.7832 8.51605Z"
                      fill="white"
                    ></path>{" "}
                  </svg>
                </a>
              </div>
              <div className="contact-icon">
                <a href={data.find((item) => item.type === "twitter")?.tag}>
                  <svg
                    width="22"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    data-name="Capa 1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z"
                      fill="white"
                    ></path>
                  </svg>{" "}
                </a>
              </div>
              <div className="contact-icon">
                <a href={data.find((item) => item.type === "tiktok")?.tag}>
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M16.6972 5.06118C14.7167 5.06118 13.1054 3.41731 13.1054 1.39673C13.1054 1.08523 12.8578 0.832764 12.5526 0.832764H9.59208C9.28676 0.832764 9.0393 1.08523 9.0393 1.39673V13.7802C9.0393 14.968 8.09208 15.9344 6.92764 15.9344C5.76334 15.9344 4.81612 14.968 4.81612 13.7802C4.81612 12.5922 5.76334 11.6258 6.92764 11.6258C7.23297 11.6258 7.48042 11.3733 7.48042 11.0618V8.04138C7.48042 7.73002 7.23297 7.47742 6.92764 7.47742C3.52126 7.47742 0.75 10.3049 0.75 13.7802C0.75 17.2554 3.52126 20.0828 6.92764 20.0828C10.334 20.0828 13.1054 17.2554 13.1054 13.7802V8.29869C14.2057 8.89717 15.4298 9.20955 16.6972 9.20955C17.0025 9.20955 17.25 8.95709 17.25 8.64559V5.62514C17.25 5.31379 17.0025 5.06118 16.6972 5.06118ZM16.1444 8.05827C14.9643 7.95811 13.8436 7.53748 12.8754 6.82695C12.7071 6.70329 12.4851 6.68625 12.3004 6.78289C12.1159 6.87923 11.9999 7.07309 11.9999 7.28473V13.7802C11.9999 16.6335 9.72438 18.9548 6.92764 18.9548C4.1309 18.9548 1.85557 16.6335 1.85557 13.7802C1.85557 11.1173 3.83724 8.91773 6.37486 8.63589V10.5463C4.86334 10.8145 3.71056 12.1624 3.71056 13.7802C3.71056 15.59 5.15369 17.0625 6.92764 17.0625C8.70173 17.0625 10.1449 15.59 10.1449 13.7802V1.96069H12.0321C12.2853 4.1534 13.9952 5.89787 16.1444 6.15621V8.05827Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.3"
                    ></path>{" "}
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact" style={{marginTop: '22px'}}>
              <Image src={Icon1} alt="Icon" className="footer-icon" />
              <Image src={Icon2} alt="Icon" className="footer-icon" />
              <Image src={Icon3} alt="Icon" className="footer-icon" />
              <Image src={Icon4} alt="Icon" className="footer-icon" />
              <Image src={Icon5} alt="Icon" className="footer-icon" />
              <Image src={Icon6} alt="Icon" className="footer-icon" />
              <Image src={Icon7} alt="Icon" className="footer-icon" />
              <Image src={Icon8} alt="Icon" className="footer-icon" />
              <Image src={Icon9} alt="Icon" className="footer-icon" />
            </div>
            <div className="legal">
              <div className="legal-item">
                <Image width={40} height={5} src={VatIcon} alt="Vat Icon" />
                <div className="info">
                  {" "}
                  <p>الرقم الضريبي</p>
                  <p>310457496200003</p>
                </div>
              </div>
              <div className="legal-item">
                <Image width={40} height={5} src={BussIcon} alt="Vat Icon" style={{objectFit: "contain", borderRadius: '5px'}} />
                <div className="info">
                  {" "}
                  <p>منصة الأعمال</p>
                  <p>0000038617</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>
          جميع الحقوق محفوظة لمؤسسة الزهرة العصرية للهدايا
        </p>
      </div>
    </footer>
  );
};

export default Footer;
