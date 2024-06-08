
import _axios from "@/contains/api/axios";
import CheckoutPageComponent from "@/components/PAGES/CheckoutPageComponent";
export const metadata: any = async () => {
  return {
    title: " الزهرة العصرية - اتمام الدفع",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
};
const CheckoutPage = () => {
  return <CheckoutPageComponent />;
};

export default CheckoutPage;
