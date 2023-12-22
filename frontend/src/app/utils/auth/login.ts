import { LoginSchema, LoginSchemaType } from '../../types';

export const login = async (formData: LoginSchemaType): Promise<void> => {
  LoginSchema.parse(formData);
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
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
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};