import React from 'react';
import SnapImage from '@/images/snapchat.png'
import Image from 'next/image';
const SnapchatShareButton = ({ url, title }: {url:string, title:string}) => {
  const handleShare = () => {
    const snapchatUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(url)}`;

    // Attempt to open the Snapchat URL
    //@ts-ignore
    window.open(snapchatUrl, '_blank');
  };

  return (
    <button onClick={handleShare}>
      <Image src={SnapImage} alt='SnapChat' width={64} height={64} />
    </button>
  );
};

export default SnapchatShareButton;
