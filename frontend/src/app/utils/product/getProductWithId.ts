import { AuthSchemaType } from "@/app/types";

//@ts-ignore
export const getProductWithId = async (productId: string): Promise<{product: ProductSchemaType} | null> => {
  try {
    const response = await fetch(`http://localhost:4000/api/getProductWithId/${parseInt(productId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
        credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return null
    } else {
      const responseData = await response.json();
      return responseData
    }
  } catch (error) {
    console.error('An error occurred during get user info:', error);
  }
};