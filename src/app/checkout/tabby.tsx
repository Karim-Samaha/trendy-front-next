import { useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
const Tabby = () => {
  useEffect(() => {
    const tabbyCard = document.createElement("script");
    tabbyCard.async = true;
    tabbyCard.innerHTML = `
    new TabbyCard({
      selector: '#tabbyCard', // empty div for TabbyCard.
      currency: 'SAR', // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      lang: 'ar', // Optional, language of snippet and popups.
      price: 100, // required, total price or the cart. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      size: 'narrow', // required, can be also 'wide', depending on the width.
      theme: 'default', // required, can be also 'default'.
      header: true // if a Payment method name present already.
    });
    `;
    document.body.appendChild(tabbyCard);
  }, []);
  const { data: session } = useSession();
  const handlePayment = async () => {
    if (!session?.user?.accessToken) return null;
    _axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-tabby-session`,
        {
          payment: {
            amount: "100",
            currency: "SAR",
            description: "testing product",
            buyer: {
              phone: "966500000001",
              email: "card.success@tabby.ai",
              name: "testing",
              dob: "2019-08-24",
            },
            shipping_address: {},
            order: {},
            buyer_history: {},
            order_history: [],
            meta: {},
            attachment: {
              body: '{"flight_reservation_details": {"pnr": "TR9088999","itinerary": [...],"insurance": [...],"passengers": [...],"affiliate_name": "some affiliate"}}',
              content_type: "application/vnd.tabby.v1+json",
            },
          },
          lang: "ar",
          merchant_code: "zid_sa",
          merchant_urls: {
            success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/check-payment?gateway=tabby`,
            cancel: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/check-payment`,
            failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/check-payment`,
          },
        },
        { session }
      )
      .then((res) => {
        let url =
          res.data?.paymentSession?.configuration?.available_products?.installments[0]?.web_url;
        if (url) {
          sessionStorage.setItem("tabbyId", res.data?.paymentSession?.id)
          window.location.href = url;
          return
        }
      });
  };
  return (
    <>
      <div id="tabbyCard"></div>
      <ButtonPrimary onClick={handlePayment}>ادفع الان</ButtonPrimary>
    </>
  );
};

export default Tabby;
