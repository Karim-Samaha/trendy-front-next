import VisaImg from "@/images/partners/visa.svg";
import MadaImg from "@/images/partners/new-mada-footer.svg";
import STC from "@/images/partners/stc.svg";
import Paypal from "@/images/partners/paypal-svgrepo-com.svg";
import Image from "next/image";
const Partners = () => {
  return (
    <div
      style={{ border: "3px solid #55a8b9", marginTop: "0", minHeight: "200px", padding: "30px 20px", borderRadius: "20px" }}
      className=" dir-rtl"
    >
      <h2 className="title text-3xl md:text-4xl font-semibold">
        طرق دفع متعددة وامنة
      </h2>
      <div
        className="partners-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          minHeight: '200px',
        }}
      >
        <Image width={150} height={50} src={VisaImg} />
        <Image width={150} height={50} src={MadaImg} />
        <Image width={150} height={50} src={Paypal} />
        <Image width={150} height={50} src={STC} />
      </div>
    </div>
  );
};

export default Partners;
