import { AuthSchemaType } from "@urbannerd/types";

//@ts-ignore
export const getUserInfoWithId = async (id: number): Promise<{user: AuthSchemaType} | null> => {
  try {
    const response = await fetch(`http://localhost:4000/api/getUserInfoWithId/${id}`, {
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