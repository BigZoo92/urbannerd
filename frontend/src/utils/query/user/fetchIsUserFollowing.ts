export const fetchIsUserFollowing = async (followingId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${followingId}/isFollowing`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
      return data.isFollowing;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'abonnement :", error);
    }
  };
  