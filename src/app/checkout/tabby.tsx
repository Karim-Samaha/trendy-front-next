import { useEffect } from "react";

const Tabby = () => {
  useEffect(() => {
    const tabbyCard = document.createElement("script");
    tabbyCard.async = true;
    tabbyCard.innerHTML = `
    new TabbyCard({
      selector: '#tabbyCard', // empty div for TabbyCard.
      currency: 'SAR', // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      lang: 'ar', // Optional, language of snippet and popups.
      price: 100, // required, total price or the cart. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      size: 'narrow', // required, can be also 'wide', depending on the width.
      theme: 'default', // required, can be also 'default'.
      header: true // if a Payment method name present already. 
    });    
    `;
    document.body.appendChild(tabbyCard);
  }, []);
  return <div id="tabbyCard"></div>;
};

export default Tabby;
