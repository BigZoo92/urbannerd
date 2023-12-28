import { AuthSchemaType } from "@/app/types";

export const isAuth = async (): Promise<AuthSchemaType | undefined> => {
  try {
    const response = await fetch('http://localhost:4000/api/checkAuthenticated', {
      credentials: "include",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      return errorData
    } else {
      const responseData: AuthSchemaType = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};