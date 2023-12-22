export const getFollowingsCount = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${userId}/followings/count`, {
        method: 'GET',
        credentials: 'include',
      });
  
      const data = await response.json();
      return data.followingsCount;
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de followings :", error);
    }
  };
  