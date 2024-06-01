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
export const renderTotalPrice_ = (items: any, couponPrecent: number) => {
  let total: number = 0;
  let cards: number = 0;
  let giftCards: number = 0;
  let deductedAmount = 0;
  items.map((item: any) => {
    total += item.price * item.quantity;
    if (item.formInfo?.cardText?.length > 1) {
      cards += 6;
    }
    if (item?.selectedCard?._id) {
      giftCards += item?.selectedCard?.price;
    }
  });
  let totalCheckout = total + cards + giftCards;
  if (couponPrecent) {
    deductedAmount = (totalCheckout * couponPrecent) / 100;
    totalCheckout = totalCheckout - (totalCheckout * couponPrecent) / 100;
  }
  return {
    total: total.toFixed(2),
    cards: cards.toFixed(2),
    giftCards: giftCards.toFixed(2),
    fintalTotal: totalCheckout.toFixed(2),
    deductedAmount: deductedAmount.toFixed(2),
  };
};
