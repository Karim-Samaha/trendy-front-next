import { useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";

const Tabby = ({
  fintalTotal,
  couponResponse,
  deleviryMethod,
  deleviryInfo,
  vat,
  pointsUsed,
  userNote,
}: {
  fintalTotal: number;
  couponResponse: any;
  deleviryMethod: string;
  deleviryInfo: any;
  vat: number;
  pointsUsed: number;
  userNote: string;
}) => {
  const { items } = useCart();

  useEffect(() => {
    const tabbyCard = document.createElement("script");
    tabbyCard.async = true;
    tabbyCard.innerHTML = `
    new TabbyCard({
      selector: '#tabbyCard', // empty div for TabbyCard.
      currency: 'SAR', // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      lang: 'ar', // Optional, language of snippet and popups.
      price: ${200}, // required, total price or the cart. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
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
          tabbyPayload: {
            payment: {
              amount: `${200}`,
              currency: "SAR",
              description: "testing product",

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
              success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment?gateway=tabby`,
              cancel: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
              failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
            },
          },
          sessionInfo: {
            description: items,
            fintalTotal,
            couponResponse,
            deleviryMethod,
            deleviryInfo,
            vat,
            pointsUsed,
            userNote,
          },
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
      <div id="tabbyCard"></div>
      <ButtonPrimary onClick={handlePayment}>ادفع الان</ButtonPrimary>
    </>
  );
};

export default Tabby;
