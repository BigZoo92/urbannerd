export const fetchUserPosts = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${userId}/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des posts de l'utilisateur :", error);
    }
  };
  