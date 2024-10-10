import axios from "axios";
import TwitterConvTrkr from "./twitterPixelModule";
import _axios from "@/contains/api/axios";

const options: { autoConfig: boolean; debug: boolean } = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: true, // enable logs
};
export const facebookPixel = (pixel: string, payload: any) => {
  try {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        //Temp ID will be In Env
        ReactPixel.init(
          process.env.NEXT_PUBLIC_META_PIXEL_ID || "war",
          options
        );
        ReactPixel.track(pixel, payload);
        console.log("Pixel successs");
      });
  } catch (error) {
    console.log(error);
  }
};

export const twitterPixel = async (pixel: string, data: any) => {
  let payload = await data;
  TwitterConvTrkr.init(`${process.env.NEXT_PUBLIC_TWITTER_ID}`);
  TwitterConvTrkr.track(pixel, payload);
};

export const tiktokPixel = (pixel: string, payload: any) => {
  try {
    import("tiktok-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        //Temp ID will be In Env
        ReactPixel.init(`${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID}`, options);
        ReactPixel.track(pixel, payload);
        console.log("Pixel successs");
      });
  } catch (error) {
    console.log(error);
  }
};

export const snapchatPixelEvent = (pixel: string, payload: any) => {
  try {
    //@ts-ignore
    import("react-snapchat-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.NEXT_PUBLIC_META_SNAPCHAT_ID}`, options);
        ReactPixel.track(pixel, payload);
        console.log("Pixel successs");
      });
  } catch (error) {
    console.log(error);
  }
};

export const trackTikTokConversion = async (
  eventName: string,
  eventData: any
) => {
  try {
    await _axios.post("/api/track-tiktok", {
      eventName: eventName,
      eventData: eventData,
    });
    console.log("Conversion event tracked successfully");
  } catch (error) {
    console.error("Error tracking conversion event:", error);
  }
};
export const trackConversionSnapchatEvent = async (
  eventType: string,
  eventData: any
) => {
  try {
    await _axios.post("/api/snapchat-track", {
      eventType: eventType,
      eventData: eventData,
    });
    console.log("Snapchat conversion event tracked successfully");
  } catch (error) {
    console.error("Error tracking Snapchat conversion event:", error);
  }
};
const getFacebookBrowserId = () => {
  const fbp = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_fbp"))
    ?.split("=")[1];
  return fbp;
};
export const trackConversionFacebookEvent = async (
  eventType: string,
  eventData: any
) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get("fbclid");
    await _axios.post("/api/track-meta", {
      eventType: eventType,
      eventData: { ...eventData, fbp: getFacebookBrowserId(), fbclid: fbclid },
    });
    console.log("Facebook conversion event tracked successfully");
  } catch (error) {
    console.error("Error tracking Snapchat conversion event:", error);
  }
};
