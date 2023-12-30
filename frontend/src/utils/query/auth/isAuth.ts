import { AuthSchemaType } from "@urbannerd/types";

import { Preferences } from '@capacitor/preferences';

export const isAuth = async (): Promise<AuthSchemaType | undefined> => {
  try {
    const token = await Preferences.get({ key: 'jwtToken' });
    console.log(token.value)
    if (!token.value) return undefined;

    const response = await fetch(process.env.SERVER_URL + '/checkAuthenticated', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Auth check failed:', errorData);
      return undefined;
    } else {
      const responseData: AuthSchemaType = await response.json();
      console.log(responseData)
      return responseData;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return undefined;
  }
};