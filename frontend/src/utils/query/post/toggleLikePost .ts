export const toggleLikePost = async (postId: number) => {
    try {
      const response = await fetch(process.env.SERVER_URL + '/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
        credentials: 'include',
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du like/unlike du post :", error);
    }
  };
  