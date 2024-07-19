import { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";

const Tamarra = ({ fintalTotal }: { fintalTotal: number }) => {
  const { items } = useCart();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);
  const { data: session } = useSession();
  const handlePayment = async () => {
    if (!session?.user?.accessToken) return null;
    _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-tammara-session`,
        // {
        //   payment: {
        //     amount: `${fintalTotal}`,
        //     currency: "SAR",
        //     description: "testing product",
        //     buyer: {
        //       phone: "966500000001",
        //       email: "card.success@tabby.ai",
        //       name: "testing",
        //       dob: "2019-08-24",
        //     },
        //     shipping_address: {},
        //     order: {},
        //     buyer_history: {},
        //     order_history: [],
        //     meta: {},
        //     attachment: {
        //       body: '{"flight_reservation_details": {"pnr": "TR9088999","itinerary": [...],"insurance": [...],"passengers": [...],"affiliate_name": "some affiliate"}}',
        //       content_type: "application/vnd.tabby.v1+json",
        //     },
        //   },
        //   lang: "ar",
        //   merchant_code: "zid_sa",
        //   merchant_urls: {
        //     success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment?gateway=tabby`,
        //     cancel: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
        //     failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
        //   },
        // },
        {
          "total_amount": {
            "amount": fintalTotal,
            "currency": "SAR"
          },
          "shipping_amount": {
            "amount": 0,
            "currency": "SAR"
          },
          "tax_amount": {
            "amount": 0,
            "currency": "SAR"
          },
          "order_reference_id": "1231234123-abda-fdfe--afd31241",
          "order_number": "S12356",
          "discount": {
            "amount": {
              "amount": 0,
              "currency": "SAR"
            },
            "name": ""
          },
          "consumer": {
            "email": "customer@email.com",
            "first_name": "Mona",
            "last_name": "Lisa",
            "phone_number": "566027755"
          },
          "country_code": "SA",
          "description": "الظهرة العصرية",
          "merchant_url": {
            "cancel": `${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`}`,
            "failure": `${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`}`,
            "success": `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment?gateway=tabby}`,
            "notification": "https://store-demo.com/payments/tamarapay"
          },
          "payment_type": "PAY_BY_INSTALMENTS",
          "instalments": 3,
        },
        { session }
      )
      .then((res) => {
        let url =
          res.data?.paymentSession?.configuration?.available_products
            ?.installments[0]?.web_url;
        if (url) {
          sessionStorage.setItem("tabbyId", res.data?.paymentSession?.id);
          window.location.href = url;
          return;
        }
      });
  };
  return (
    <>
      {loaded && (
        <tamara-widget
          type="tamara-card-snippet"
          lang="ar"
          country="SA"
        ></tamara-widget>
      )}
      <div id="tabbyCard"></div>
      <ButtonPrimary onClick={handlePayment}>ادفع الان</ButtonPrimary>
    </>
  );
};

export default Tamarra;


