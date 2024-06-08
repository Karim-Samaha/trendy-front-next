import _axios from "@/contains/api/axios";
import CartPageComponent from "@/components/PAGES/CartPageComponent";
export const metadata: any = async () => {
  return {
    title: " الزهرة العصرية - العربة  ",
    description: "",
    icons: {
      icon: "/trendy.svg",
    },
  };
};

const CartPage = () => {
  return <CartPageComponent />;
};

export default CartPage;
