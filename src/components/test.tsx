import { Snapshare } from "@thezano/react-snapshare";

export const Test = () => {
  return (
    <Snapshare
      dataShareUrl="https://twang.dev/react-snapshare/"
      stickerAssetURL="https://kit.snapchat.com/ckweb/test/image.png"
      customButtonStyles={{ height: "80px" }}
    />
  );
};

export default Test;
