interface LoginResponse {
    user: {
      id: number;
      username: string;
      email: string;
      // ... d'autres champs de l'utilisateur
    } | null;
    userExist: boolean;
  }
  
  type LoginFormData = {
    usernameOrEmail: string;
    password: string;
  };
  
export  const login = async (formData: LoginFormData): Promise<LoginResponse> => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Gérer les erreurs de l'API ici si nécessaire
        throw new Error('Erreur de connexion');
      }
  
      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };
  