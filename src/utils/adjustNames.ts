export const adjustNames = (text: string) => {
  let outPutText: string = "";
  if (text.length > 35) {
    outPutText = text.substring(0, 35) + "...";
  } else {
    outPutText = text;
  }
  return outPutText;
};
