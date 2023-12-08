import { SignupSchemaType } from '../../types'; // Remplace path-to-your-types par le chemin correct

export const signup = async (formData: SignupSchemaType) => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    if (!response.ok) {
      // Gérer les erreurs ici, par exemple, afficher un message d'erreur
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};
