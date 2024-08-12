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
  const tabbyId = searchParams?.payment_id;

  return <CheckoutCheck id={id} gateway={gateway} tabbyId={tabbyId} />;
};

export default CheckoutCheckPage;
