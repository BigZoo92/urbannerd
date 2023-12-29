export const toggleLikePost = async (postId: number) => {
    try {
      const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/like', {
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
  