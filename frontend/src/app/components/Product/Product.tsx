import { ProductSchemaType } from '@/app/types';
import React from 'react';
import NewModel from '../NewModel';
import { getUrl } from '@/app/utils';
import './style.scss'
import Link from 'next/link';

const Product = ({ product }: { product: ProductSchemaType }) => {
  if(!product) return
  return (
    <Link href={`/shop/${product.id}`} className="product">
      <span></span>
      {product.model3D && (
        <div className='cd_product_model'>
          <NewModel url={getUrl(product.model3D)}></NewModel>
        </div>
      )}
      <div className='product_info'>
        <h3>{product.name}</h3>
        <p>{product.price} €</p>
      </div>
    </Link>
  )
};

export default Product;

