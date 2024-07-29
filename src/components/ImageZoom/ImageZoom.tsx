import { useRef, useState } from "react";
import styles from "./ImageZoom.module.css"; // Create this CSS module
import Image from "next/image";

const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleZoom = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={styles.container} onClick={handleZoom}>
      {/* <Image
        width={500}
        height={600}
        ref={imgRef}
        src={src}
        alt={alt}
        className={
          isZoomed
            ? ` rounded-2xl object-cover product-img ${styles.zoomed}`
            : `rounded-2xl object-cover product-img ${styles.normal}`
        }
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      /> */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={
          isZoomed
            ? ` rounded-2xl object-cover product-img ${styles.zoomed}`
            : `rounded-2xl object-cover product-img ${styles.normal}`
        }
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      />
    </div>
  );
};

export default ImageZoom;
