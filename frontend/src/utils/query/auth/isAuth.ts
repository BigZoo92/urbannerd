import { AuthSchemaType } from "@urbannerd/types";

import { Preferences } from '@capacitor/preferences';

export const isAuth = async (): Promise<AuthSchemaType | undefined> => {
  try {
    const { value: token } = await Preferences.get({ key: 'jwtToken' });
    if (!token) return undefined;

    const response = await fetch(process.env.SERVER_URL + '/checkAuthenticated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Auth check failed:', errorData);
      return undefined;
    } else {
      const responseData: AuthSchemaType = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return undefined;
  }
};