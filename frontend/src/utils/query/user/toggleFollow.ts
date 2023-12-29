export const toggleFollow = async (followingId: number) => {
    try {
      const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/user/toggleFollow', {
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
  