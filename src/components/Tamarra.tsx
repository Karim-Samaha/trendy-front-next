import { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useSession } from "next-auth/react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";
import { generateCustomId } from "@/utils/adjustNames";

const Tamarra = ({
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
          gatewayBody: {
            total_amount: {
              amount: fintalTotal,
              currency: "SAR",
            },
            shipping_amount: {
              amount: 0,
              currency: "SAR",
            },
            tax_amount: {
              amount: 0,
              currency: "SAR",
            },
            order_reference_id: generateCustomId(),
            order_number: "A1232580",
            items: items.map((item) => ({
              name: item.name,
              reference_id: item?._id,
              quantity: item?.quantity,
              type: "Digital",
              sku: "SA-124252",
              discount_amount: {
                amount: 0,
                currency: "SAR",
              },
              tax_amount: {
                amount: 0,
                currency: "SAR",
              },
              unit_price: {
                amount: item.price,
                currency: "SAR",
              },
              total_amount: {
                amount: item.price,
                currency: "SAR",
              },
            })),

            consumer: {
              email: "customer@email.com",
              first_name: "aaa",
              last_name: "aaa",
              phone_number: "96600000",
            },
            country_code: "SA",
            description: "Trendy Rose.",
            merchant_url: {
              cancel: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
              failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
              success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment?gateway=tamara`,
              notification: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment`,
            },
            payment_type: "PAY_BY_INSTALMENTS",
            instalments: 3,
            shipping_address: {
              city: "Riyadh",
              country_code: "SA",
              first_name: "aaa",
              last_name: "aaa",
              line1: "3764 Al Urubah Rd",
              line2: "string",
              phone_number: "96600005",
              region: "As Sulimaniyah",
            },
            platform: "Trendy Rose",
            is_mobile: false,
            locale: "ar_SA",
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
        let url = res.data?.paymentSession?.checkout_url;
        if (url) {
          sessionStorage.setItem(
            "tamaraId",
            res.data?.paymentSession?.order_id
          );
          sessionStorage.setItem(
            "tamaraCheckoutId",
            res.data?.paymentSession?.checkout_id
          );
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
