'use client'

import { useEffect, useRef, useState } from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { useAuthContext } from "../provider/AuthProvider";
import { getAllProduct } from "../utils";
import Product from "../components/Product";
import Header from "../components/Header";
import NavTab from "../components/NavTab";
import './style.scss'

const Home = () => {
  const {products, setProducts} = useAuthContext()
 

  useEffect(() => {
    (async() => {
      const data = await getAllProduct(); 
      setProducts(data);
    })()
  }, [setProducts])


  return (
    <>
    <Header></Header>
      <main>
      <section className="feed_product">
        {products && products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </section>
        <ProductForm></ProductForm>
      </main>
      <NavTab></NavTab>
    </>
  );
};

export default Home;
