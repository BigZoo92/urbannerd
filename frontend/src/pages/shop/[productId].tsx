import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import { colors } from "@urbannerd/constant";
import { Share } from "@capacitor/share";
import Link from "next/link";
import LittleHeader from "@urbannerd/components/LittleHeader/LittleHeader";
import Product from "@urbannerd/components/Product";

const SingleProduct = () => {

  //TODO
  const productId = '1';  

  const shareMedia = async(url: string) => {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url,
      dialogTitle: 'Share with buddies',
    });
  }

  if(!productId) return null
  return (
    <>
      <main className="product_page_unique">
      <LittleHeader>
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
      </LittleHeader>
      <Product productId={productId}/>    
      </main>
    </>
  );
};

export default SingleProduct;
