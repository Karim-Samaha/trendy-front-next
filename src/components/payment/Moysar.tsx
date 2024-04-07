"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import _axios from "@/contains/api/axios";
const Moysar = () => {
  const [init, setInit] = useState(false);
  const { data: session }: any = useSession();
  console.log({ session: session?.user?._id });
  const savePayment: any = async (payloda: any) => {
    if (!session) return;
    _axios
      .post(`/api/create-checkout-session`, { ...payloda }, { session })
      .then((res) => res);
  };
  useEffect(() => {
    // if (!init) {
    //   const styleScript = document.createElement("link");
    //   styleScript.rel = "stylesheet";
    //   styleScript.href = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.css";
    //   const jsScript = document.createElement("script");
    //   jsScript.src = "https://cdn.moyasar.com/mpf/1.13.0/moyasar.js";
    //   const jsPayScript = document.createElement("script");
    //   jsPayScript.type = "application/javascript";
    //   jsPayScript.className = "pay";
    //   document.head.appendChild(styleScript);
    //   document.head.appendChild(jsScript);
    //   setInit(true);
    //   console.log("first")
    // }
    // if (init) {
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
          amount: 1000,
          currency: 'SAR',
          language: "AR",   
          description: 'Coffee Order #1',
          userId: '${session?.user?._id}',
          publishable_api_key: 'pk_test_A4Ae74mFrkjuhhzovBc3KrYVE6Nc9u8YEryNe6dv',
          callback_url: '${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/check-payment',
          methods: ['creditcard'],
          on_completed: function (payment) {
            return new Promise(async function (resolve, reject) {
               let saved = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session",
               {
                   headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ${session?.user?.accessToken}'
                   },
                   method: "POST",
                   body: JSON.stringify({...payment, token: '${session?.user?.accessToken}'})
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
    document.body.appendChild(script);
    // }
  }, [init]);
  // if (!init) return null
  return (
    <>
      <div className="mysr-form" style={{ maxWidth: "515px !important" }}></div>
      <script type="application/javascript" className="pay"></script>
    </>
  );
};

export default Moysar;
