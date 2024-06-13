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
const CheckoutCheckPage = ({ params, searchParams }) => {
  console.log({ searchParams });
  const id = searchParams.id;
  const gateway = searchParams.gateway;
  console.log({id, gateway})
  return <CheckoutCheck />;
};

export default CheckoutCheckPage;
