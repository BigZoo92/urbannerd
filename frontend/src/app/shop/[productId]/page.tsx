'use client'

import { useEffect, useRef, useState } from "react";
import { getProductWithId } from "@/app/utils/product/getProductWithId";
import { ProductSchemaType } from "@/app/types";
import NewModel from "@/app/components/NewModel";
import { getUrl, handleBuyNow } from "@/app/utils";
import { usePathname } from "next/navigation";
import './style.scss'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeftIcons, ExportIcons } from "@/app/components/Icons";
import { colors } from "@/app/constant";
import { Share } from "@capacitor/share";
import ParallaxImage from "@/app/components/ParallaxImage";
import { Toast } from "@capacitor/toast";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import Link from "next/link";



const Home = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowHeader(currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
  const params = usePathname();
  const productId = params.split('/')[2];
  const getParallaxSpeed = (index: number) => {
    const speeds = [0.05, -0.075, 0.075, -0.05];
    return speeds[index % speeds.length];
  };
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductSchemaType | null>(null)

  const showSuccessToast = async () => {
    defineCustomElements(window);
    await Toast.show({
      text: 'Payment successful',
      position: 'top'
    },
    );
  };

  const shareMedia = async(url: string) => {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url,
      dialogTitle: 'Share with buddies',
    });
  }
  const showCancelToast = async () => {
    defineCustomElements(window);
    await Toast.show({
      text: 'Payment failed',
      position: 'top'
    },
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = window.location.href.split('=')[1];
      if (queryParams) {
        (async() => {
          if (queryParams === 'true'){
            await showSuccessToast()
          }else if(queryParams === 'false'){
            await showCancelToast()
          }
        })()
  }}
  }, []);
  useEffect(() => {
    (async() => {
      const data = await getProductWithId(productId); 
      setProduct(data?.product);
    })()
  }, [setProduct])

  const handleMediaClick = (url: string) => {
    setSelectedMedia(url);
    //@ts-ignore
    document.querySelector('html').style.overflow = 'hidden'
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    //@ts-ignore
    document.querySelector('html').style.overflow = 'visible'
  };


  if(!product) return
  return (
    <>
      <main className="product_page_unique">
      <header className={showHeader ? "visible" : "hidden"}>
        <div>
        <Link href='/shop'>
      <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}></ArrowLeftIcons>
      </Link>
      <h1>Product</h1>
        </div>
      <span onClick={async() => await shareMedia(window.location.pathname)}>...</span>
    </header>
      <section className="product_page">
      {product.model3D && (
        <aside className='cd_product_model'>
          <NewModel url={getUrl(product.model3D)}></NewModel>
        </aside>
      )}
      <article>
        <h1>{product.name}</h1>
        <p className="price">{product.price} €</p>
        <p className="description">{product.description}</p>
        <button onClick={() => handleBuyNow(product.price, product.id, product.name, getUrl(product.images[0]))}>BUY NOW</button>
        
      </article>
      {product.images?.length !== 0 && (
          <div className={`cd_images`}>
          {product.images?.map((img, index) => (
              <ParallaxImage 
              src={getUrl(img)} 
              key={index} 
              speed={getParallaxSpeed(index)}
              onClick={() => handleMediaClick(img)}
            />
          ))}
        </div>
        )}
      {selectedMedia && (
        <div className="media_fullscreen">
          <div className='cd_arrow'>
          <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
              onClick: () => closeMedia()
            }}></ArrowLeftIcons>
          </div>
          <div className='cd_share'>
          <ExportIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
              onClick: async() => await shareMedia(getUrl(selectedMedia))
            }}></ExportIcons>
          </div>
          {<LazyLoadImage src={getUrl(selectedMedia)} alt="Image of product" crossOrigin="anonymous"/>}
        </div>
      )}
      </section>
        
      </main>
    </>
  );
};

export default Home;
