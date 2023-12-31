import { SignupSchemaType } from '../../../types'; // Remplace path-to-your-types par le chemin correct

export const signup = async (formData: SignupSchemaType) => {
  try {
    const response = await fetch(process.env.SERVER_URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};
