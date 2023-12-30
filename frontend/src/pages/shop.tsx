'use client'

import { useEffect} from "react";
import ProductForm from "@urbannerd/components/Forms/ProductForm/ProductForm";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import { getAllProduct } from "@urbannerd/utils";
import LittleProduct from "@urbannerd/components/LittleProduct";
import Header from "@urbannerd/components/Header";
import NavTab from "@urbannerd/components/NavTab";

const Shop = () => {
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
            <LittleProduct key={index} product={product} />
          ))}
        </section>
        <ProductForm></ProductForm>
      </main>
      <NavTab></NavTab>
    </>
  );
};

export default Shop;
