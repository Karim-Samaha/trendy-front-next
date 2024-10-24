import VisaImg from "@/images/partners/visa.svg";
import MadaImg from "@/images/partners/new-mada-footer.svg";
import Moyassar from "@/images/partners/moyasar-logo.png";
import AMEX from "@/images/partners/Apple-Pay-Logo-2014.png";
import MASTER from "@/images/partners/mastercard-circle.png";
import TABBY from "@/images/partners/tabby2.svg";
import TAMARRA from "@/images/partners/tamara2.svg";
import Image from "next/image";
const Partners = () => {
  return (
    <div
      style={{
        border: "3px solid #55a8b9",
        marginTop: "0",
        minHeight: "200px",
        padding: "30px 20px",
        borderRadius: "20px",
      }}
      className=" dir-rtl partners-wrapper"
    >
      <h2 className="title text-3xl md:text-4xl font-semibold">
        طرق دفع متعددة وامنة
      </h2>
      <div
        className="partners-container"
        style={{
          display: "flex",
          width: "90%",
          marginRight: "auto",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          minHeight: "150px",
        }}
      >
        <Image width={100} height={50} src={TABBY} alt={"TABBY"} />
        <Image width={100} height={50} src={TAMARRA} alt={"TAMARRA"} />
        <Image width={100} height={50} src={AMEX} alt={"AMEX"} />
        <Image width={100} height={50} src={MASTER} alt={"MASTER"} />
        <Image width={100} height={50} src={VisaImg} alt={"VisaImg"} />
        <Image width={100} height={50} src={MadaImg} alt={"MadaImg"} />
        <Image width={100} height={50} src={Moyassar} alt={"Moyassar"} />
        <div className="bg">
          <svg
            width="214"
            height="253"
            viewBox="0 0 214 253"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M107.232 232.731C181.506 216.8 192.156 150.314 194.131 87.1152C194.213 84.5439 195.312 82.1102 197.187 80.3487C199.062 78.5872 201.559 77.6419 204.131 77.7203C206.702 77.803 209.135 78.9025 210.896 80.7775C212.657 82.6524 213.602 85.1495 213.523 87.7206C211.253 160.358 195.749 234.831 109.127 252.154H105.322C42.4217 239.574 16.9681 197.074 6.90492 146.754C0.571784 115.093 0.506592 80.2722 0.506592 48.6112C0.506833 46.6722 1.08815 44.7779 2.17552 43.1725C3.26289 41.5672 4.80641 40.3246 6.60689 39.6051L103.62 0.798331C105.938 -0.128089 108.524 -0.126422 110.84 0.802988L207.444 39.6097C209.831 40.5696 211.739 42.4378 212.748 44.8037C213.758 47.1696 213.787 49.8397 212.83 52.2271C211.869 54.6139 210.001 56.5219 207.635 57.5322C205.268 58.5424 202.598 58.5721 200.21 57.6149L107.215 20.2587L19.9158 55.1771C19.9321 83.8066 20.279 114.69 25.9299 142.949C34.3912 185.253 55.1089 221.552 107.232 232.731ZM97.5223 131.906L129.467 99.9608C133.253 96.1749 139.402 96.1749 143.188 99.9608C146.974 103.747 146.974 109.896 143.188 113.682L104.382 152.486C103.481 153.387 102.412 154.102 101.235 154.589C100.058 155.077 98.7962 155.328 97.5223 155.328C96.2484 155.328 94.9869 155.077 93.81 154.589C92.6331 154.102 91.5637 153.387 90.6629 152.486L71.2584 133.084C67.4725 129.298 67.4725 123.149 71.2584 119.363C75.0443 115.577 81.1935 115.577 84.9794 119.363L97.5223 131.906Z"
              fill="#55a8b9"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Partners;
