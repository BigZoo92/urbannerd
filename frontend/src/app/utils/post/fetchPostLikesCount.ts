export const fetchPostLikesCount = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/post/${postId}/likes/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de likes du post :", error);
    }
  };
  