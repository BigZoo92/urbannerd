import { useState, useEffect } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

const ParallaxImage = ({ src, speed, onClick }: {src: string, speed: number, onClick: () => void}) => {
  const [offsetY, setOffsetY] = useState(0);
  
  const handleScroll = () => {
    setOffsetY(window.scrollY * speed);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LazyLoadImage
      src={src}
      alt="Image of product"
      style={{ transform: `translateY(${offsetY}px)` }}
      crossOrigin="anonymous"
    />
  );
};

export default ParallaxImage;
