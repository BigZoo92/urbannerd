import { LoginSchema, LoginSchemaType } from '../../../types';

export const login = async (formData: LoginSchemaType): Promise<void> => {
  LoginSchema.parse(formData);
  try {
    const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
    } else {
      const responseData = await response.json();
      console.log(responseData)
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};