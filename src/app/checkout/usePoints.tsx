import _axios from "@/contains/api/axios";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

const usePoints = () => {
  const [points, setPoints] = useState<Number>(0);
  const [allPaid, setAllPaid] = useState<Boolean>(false);
  const [settings, setSettings] = useState({
    pointReedemptionAmount: 0,
    maxUse: 0,
    amountToEarnPoint: 0,
    minToApply: 0,
  });
  const [redeemData, setRedeemData] = useState({
    amount: 0,
    point: 0,
  });

  const { data: session } = useSession();
  const isAllPaidWithPoints = () => {
    setAllPaid(true);
  };
  useEffect(() => {
    if (session) {
      _axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/points-settings`)
        .then((res) => {
          setSettings(res.data?.data?.pointsSettings);
        })
        .catch((err) => console.log(err));
      _axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-points`,
          {},
          //@ts-ignore
          { session }
        )
        .then((res) => {
          setPoints(res.data?.points);
        })
        .catch((err) => console.log(err));
    }
  }, [session]);
  useEffect(() => {
    if (points && settings) {
      let pointsAmount = Math.floor(
        +points * +settings?.pointReedemptionAmount
      );
      console.log({ pointsAmount });
      if (pointsAmount < settings?.maxUse) {
        setRedeemData((prev) => ({
          ...prev,
          amount: pointsAmount,
          point: pointsAmount / settings?.pointReedemptionAmount,
        }));
      } else if (pointsAmount > settings?.maxUse) {
        setRedeemData((prev) => ({
          ...prev,
          amount: settings?.maxUse,
          point: +points,
        }));
      }
    }
  }, [points, settings]);

  return {
    points,
    redeemData,
    allPaid,
    isAllPaidWithPoints,
    minToApply: settings.minToApply,
  };
};
export default usePoints;
