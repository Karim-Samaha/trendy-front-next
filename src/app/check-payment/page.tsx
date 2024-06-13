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
const CheckoutCheckPage = ({  searchParams }) => {
  const id = searchParams.id;
  const gateway = searchParams.gateway;
  return <CheckoutCheck id={id} gateway={gateway} />;
};

export default CheckoutCheckPage;
