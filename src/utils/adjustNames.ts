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
  let giftCards: number = 0;
  let deductedAmount = 0;

  items.map((item: any) => {
    total += item.price * item.quantity;
    if (item.formInfo?.cardText?.length > 1) {
      cards += 6;
    }
    if (item?.selectedCard?.length) {
      for (let i = 0; i < item?.selectedCard.length; i++) {
        giftCards +=
          item?.selectedCard[i]?.price * item?.selectedCard[i]?.quantity;
      }
    }
  });
  vat = +((total * 15) / 100);
  let totalCheckout = total + cards + giftCards + vat;
  if (couponPrecent) {
    deductedAmount = (totalCheckout * couponPrecent) / 100;
    totalCheckout = totalCheckout - (totalCheckout * couponPrecent) / 100;
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
    giftCards: giftCards.toFixed(2),
    vat: vat.toFixed(2),
    fintalTotal: totalCheckout.toFixed(2),
    deductedAmount: deductedAmount.toFixed(2),
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
