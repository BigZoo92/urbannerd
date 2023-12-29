import { ProductSchemaType } from "@urbannerd/types";
import { createProduct } from "./createProduct";

export const onSubmitProduct = async (formData: ProductSchemaType, images: File[], model: File | null ) => {
  const formDataObj = new FormData();
  formDataObj.append('name', formData.name);
  formDataObj.append('description', formData.description);
  formDataObj.append('price', formData.price.toString());
  formDataObj.append('stock', formData.stock.toString());
  
  images.forEach(image => {
    formDataObj.append('images', image);
  });
  if(!model) return null
  formDataObj.append('model3D', model);
  try {
    await createProduct(formDataObj);
  } catch (error) {
    console.error('Create Product failed:', error);
  }
};
