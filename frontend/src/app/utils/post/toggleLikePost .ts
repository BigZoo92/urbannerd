export const toggleLikePost = async (postId: number) => {
    try {
      const response = await fetch('http://localhost:4000/api/like', {
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
  