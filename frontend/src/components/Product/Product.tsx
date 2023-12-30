import { ProductSchemaType } from '@urbannerd/types';
import React, { useEffect, useState } from 'react';
import NewModel from '../NewModel';
import { getProductWithId, getUrl, handleBuyNow, showToast } from '@urbannerd/utils';
import MediaFullSize from '../MediaFullSize';
import ParallaxImage from '../ParallaxImage';

const getParallaxSpeed = (index: number) => {
  const speeds = [0.05, -0.075, 0.075, -0.05];
  return speeds[index % speeds.length];
};

const Product = ({productId}: {productId: string}) => {
  
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductSchemaType | null>(null)
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = window.location.href.split('=')[1];
      if (queryParams) {
        (async() => {
          if (queryParams === 'true'){
            await showToast('Payment successful')
          }else if(queryParams === 'false'){
            await showToast('Payment failed')
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

  if (!product) return null

  return (
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
      <MediaFullSize selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia}></MediaFullSize>
      </section>
  )
};

export default Product;

