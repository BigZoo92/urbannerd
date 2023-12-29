import { AuthSchemaType } from "@urbannerd/types";

export const isAuth = async (): Promise<AuthSchemaType | undefined> => {
  try {
    const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/checkAuthenticated', {
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