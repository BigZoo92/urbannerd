export const getFollowersCount = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${userId}/followers/count`, {
        method: 'GET',
      });
  
      const data = await response.json();
      return data.followersCount;
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de followers :", error);
    }
  };
  