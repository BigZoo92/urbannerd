export const toggleFollow = async (followingId: number) => {
    try {
      const response = await fetch(process.env.SERVER_URL + '/user/toggleFollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followingId }),
        credentials: 'include',
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'abonnement/désabonnement :", error);
    }
  };
  