import { Preferences } from '@capacitor/preferences';
import { LoginSchema, LoginSchemaType } from '../../../types';

export const login = async (formData: LoginSchemaType): Promise<void> => {
  LoginSchema.parse(formData);
  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
    } else {
      const responseData = await response.json();
      await Preferences.set({
        key: 'jwtToken',
        value: responseData.token,
      });
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};
