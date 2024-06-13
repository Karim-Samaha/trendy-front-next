import CheckoutCheck from "@/components/PAGES/CheckPaymentPage";

export const metadata: any = async () => {
  return {
    title: " الزهرة العصرية - جاري التحقق من الدفع",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
};
const CheckoutCheckPage = () => {
  return <CheckoutCheck />;
};

export default CheckoutCheckPage;
