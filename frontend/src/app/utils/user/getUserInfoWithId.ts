import { AuthSchemaType } from "@/app/types";

//@ts-ignore
export const getUserInfoWithId = async (id: number): Promise<{user: AuthSchemaType} | null> => {
  try {
    const response = await fetch('http://localhost:4000/api/getUserInfoWithId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
      credentials: "include"
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return null
    } else {
      const responseData = await response.json();
      return responseData
    }
  } catch (error) {
    console.error('An error occurred during get user info:', error);
  }
};