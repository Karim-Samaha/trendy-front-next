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
  let fintalTotalWithNoAdds: number = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    total += item.price * item.quantity;
    if (item.formInfo?.cardText?.length > 1) {
      cards += 6 * item.quantity;
      total += 6 * item.quantity;
    }

    if (item?.selectedCard?.length > 0) {
      for (let j = 0; j < item?.selectedCard.length; j++) {
        extraPurchase +=
          item?.selectedCard[j]?.price * item?.selectedCard[j]?.quantity;
        total += item?.selectedCard[j]?.price * item?.selectedCard[j]?.quantity;
      }
      // total = total + extraPurchase;
    }

    fintalTotalWithNoAdds += item.price * item.quantity;
  }
  console.log({ total });

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





export function generateCustomId() {
  function randomSegment(length: number) {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
  }

  return randomSegment(8) + '-' + 
         randomSegment(4) + '-' + 
         randomSegment(4) + '-' + 
         randomSegment(4) + '-' + 
         randomSegment(8);
}

