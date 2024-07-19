import TwitterConvTrkr from "./twitterPixelModule";

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
