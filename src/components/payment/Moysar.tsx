"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
import { useCart } from "react-use-cart";
const Moysar = ({
  fintalTotal,
  couponResponse = {},
  deleviryMethod,
  deleviryInfo,
  vat,
  userNote,
  pointsUsed,
}: {
  fintalTotal: number;
  couponResponse: any;
  deleviryMethod: string;
  deleviryInfo: any;
  vat: number;
  userNote: string;
  pointsUsed: number;
}) => {
  const [init, setInit] = useState(false);
  const { data: session }: any = useSession();
  const { items } = useCart();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `  
        Moyasar.init({
          element: '.mysr-form',
          // Amount in the smallest currency unit.
          // For example:
          // 10 SAR = 10 * 100 Halalas
          // 10 KWD = 10 * 1000 Fils
          // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
          amount: ${+fintalTotal * 100},
          currency: 'SAR',
          language: "ar",   
          description: '${JSON.stringify(items)}',
          userId: '${session?.user?._id}',
          publishable_api_key: 'pk_test_A4Ae74mFrkjuhhzovBc3KrYVE6Nc9u8YEryNe6dv',
          callback_url: '${
            process.env.NEXT_PUBLIC_FRONTEND_URL
          }/checkout/check-payment',
          methods: ['creditcard'],
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
