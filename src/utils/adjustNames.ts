export const adjustNames = (text: string) => {
  let outPutText: string = "";
  if (text.length > 60) {
    outPutText = text?.substring(0, 60) + "...";
  } else {
    outPutText = text;
  }
  return outPutText;
};

export const listOf4 = (arr: [...any]) => {
  var testingArr = [];
  for (let i = 0; i <= arr.length - 1; i += 4) {
    testingArr.push(arr.slice(i, i + 4));
  }
  return testingArr;
};
export const renderTotalPrice_ = (
  items: any,
  couponPrecent: number,
  pointsAmount: number,
  useUserPoints: boolean
) => {
  let total: number = 0;
  let vat: number = 0;
  let cards: number = 0;
  let extraPurchase: number = 0;
  let deductedAmount = 0;
  let amountToApplyVatInReceipt: number = 0;
  let totalBeforeVat: number = 0;

  items.map((item: any) => {
    total += item.price * item.quantity;
    if (item.formInfo?.cardText?.length > 1) {
      cards += 6;
      total += 6
    }
    if (item?.selectedCard?.length) {
      for (let i = 0; i < item?.selectedCard.length; i++) {
        extraPurchase +=
          item?.selectedCard[i]?.price * item?.selectedCard[i]?.quantity;
      }
      total = total + extraPurchase;
    }
  });
  let totalCheckout = total + cards;
  
  if (couponPrecent) {
    deductedAmount = (total * couponPrecent) / 100;
    let amountToApplyVat = total - deductedAmount;
    vat = +((amountToApplyVat * 15) / 100);
    totalBeforeVat = total - vat;
    amountToApplyVatInReceipt = amountToApplyVat;
    totalCheckout = amountToApplyVatInReceipt + vat;
  } else {
    vat = +((total * 15) / 100);
    totalBeforeVat = total - vat;
    amountToApplyVatInReceipt = total;  
    totalCheckout = amountToApplyVatInReceipt;
  }
  if (pointsAmount && useUserPoints) {
    totalCheckout = totalCheckout - pointsAmount;
  }
  if (totalCheckout <= 0) {
    totalCheckout = 0;
  }
  return {
    total: total.toFixed(2),
    cards: cards.toFixed(2),
    totalBeforeVat: totalBeforeVat.toFixed(2),
    giftCards: extraPurchase.toFixed(2),
    vat: vat.toFixed(2),
    fintalTotal: totalCheckout.toFixed(2),
    fintalTotalWithNoAdds: (totalCheckout - extraPurchase - cards).toFixed(2),
    deductedAmount: deductedAmount.toFixed(2),
    amountToApplyVatInReceipt: amountToApplyVatInReceipt.toFixed(2),
  };
};

export function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}