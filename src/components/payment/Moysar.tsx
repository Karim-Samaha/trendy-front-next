"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";
import { Description } from "@headlessui/react/dist/components/description/description";
const Moysar = ({
  fintalTotal,
  couponResponse = {},
  deleviryMethod,
  deleviryInfo,
  vat,
  userNote,
  pointsUsed,
  method,
}: {
  fintalTotal: number;
  couponResponse: any;
  deleviryMethod: string;
  deleviryInfo: any;
  vat: number;
  userNote: string;
  pointsUsed: number;
  method: string;
}) => {
  const [init, setInit] = useState(false);
  const { data: session }: any = useSession();
  const { items } = useCart();
  const MOYSAR_METHODS = {
    card: ["creditcard"],
    applepay: ["applepay"],
    stc: ["stcpay"],
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    if (method === "applepay") {
      script.innerHTML = `  
        Moyasar.init({
          element: '.mysr-form',
          amount: ${+fintalTotal * 100},
          currency: 'SAR',
          language: "ar",   
          description: '${JSON.stringify(
            items.map((item) => ({
              id: item.id,
              price: item.price,
              priceBefore: item.priceBefore,
              name: item.name,
              formInfo: item.formInfo,
              color: item.color,
              quantity: item.quantity,
              selectedCard: item?.selectedCard?.map((item: any) => ({
                ...item,
                description: "",
              })),
              text: item?.text,
              image: item?.image,
            }))
          )}',
          userId: '${session?.user?._id}',
          publishable_api_key: '${process.env.NEXT_PUBLIC_MOYASAR_KEY}',
          callback_url: '${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment',
          methods: ['${MOYSAR_METHODS[method]}'],
          apple_pay: {
            country: 'SA',
            label: 'Apple Pay',
            validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
         },
          on_completed: function (payment) {
            return new Promise(async function (resolve, reject) {
               let saved = await fetch("${
                 process.env.NEXT_PUBLIC_BACKEND_URL
               }/create-checkout-session",
               {
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ${session?.user?.accessToken}'
                   },
                   method: "POST",
                   body: JSON.stringify({...payment, token: '${
                     session?.user?.accessToken
                   }', couponResponse: ${JSON.stringify(couponResponse)},
                    ShippingType: "${deleviryMethod}",
                    ShippingInfo: ${JSON.stringify(deleviryInfo)},
                    vat: ${vat},
                    userNote: "${userNote}",
                    pointsUsed: ${pointsUsed},
                    method: "Apple Pay",
                    description: ${JSON.stringify(
                      items.map((item) => ({
                        id: item.id,
                        price: item.price,
                        priceBefore: item.priceBefore,
                        name: item.name,
                        formInfo: item.formInfo,
                        color: item.color,
                        quantity: item.quantity,
                        selectedCard: item?.selectedCard?.map((item: any) => ({
                          ...item,
                          description: "",
                        })),
                        text: item?.text,
                        image: item?.image,
                      }))
                    )}
                  })
               }).then((res) => res).catch(err => console.log(err))
               console.log({saved: saved.status})
               if(saved?.status === 201) {
                resolve()
               }
                    reject();
            });
          },   
        })
        `;
    } else {
      script.innerHTML = `  
        Moyasar.init({
          element: '.mysr-form',
          amount: ${+fintalTotal * 100},
          currency: 'SAR',
          language: "ar",   
          description: '${JSON.stringify(
            items.map((item) => ({
              id: item.id,
              price: item.price,
              priceBefore: item.priceBefore,
              name: item.name,
              formInfo: item.formInfo,
              color: item.color,
              quantity: item.quantity,
              selectedCard: item?.selectedCard?.map((item: any) => ({
                ...item,
                description: "",
              })),
              text: item?.text,
              image: item?.image,
            }))
          )}',
          userId: '${session?.user?._id}',
          publishable_api_key: '${process.env.NEXT_PUBLIC_MOYASAR_KEY}',
          callback_url: '${process.env.NEXT_PUBLIC_FRONTEND_URL}/check-payment',
          methods: ['${MOYSAR_METHODS[method]}'],
          on_completed: function (payment) {
            return new Promise(async function (resolve, reject) {
               let saved = await fetch("${
                 process.env.NEXT_PUBLIC_BACKEND_URL
               }/create-checkout-session",
               {
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ${session?.user?.accessToken}'
                   },
                   method: "POST",
                   body: JSON.stringify({...payment, token: '${
                     session?.user?.accessToken
                   }', couponResponse: ${JSON.stringify(couponResponse)},
                    ShippingType: "${deleviryMethod}",
                    ShippingInfo: ${JSON.stringify(deleviryInfo)},
                    vat: ${vat},
                    userNote: "${userNote}",
                    pointsUsed: ${pointsUsed},
                    description: ${JSON.stringify(
                      items.map((item) => ({
                        id: item.id,
                        price: item.price,
                        priceBefore: item.priceBefore,
                        name: item.name,
                        formInfo: item.formInfo,
                        color: item.color,
                        quantity: item.quantity,
                        selectedCard: item?.selectedCard?.map((item: any) => ({
                          ...item,
                          description: "",
                        })),
                        text: item?.text,
                        image: item?.image,
                      }))
                    )}
                  })
               }).then((res) => res).catch(err => console.log(err))
               console.log({saved: saved.status})
               if(saved?.status === 201) {
                resolve()
               }
                    reject();
            });
          },   
        })
        `;
    }
    setTimeout(() => {
      document.body.appendChild(script);
    }, 500);
    // }
  }, [init]);
  // if (!init) return null
  return (
    <>
      <div
        className="mysr-form"
        style={{ maxWidth: "515px !important", direction: "rtl" }}
      ></div>
      <script type="application/javascript" className="pay"></script>
    </>
  );
};

export default Moysar;
