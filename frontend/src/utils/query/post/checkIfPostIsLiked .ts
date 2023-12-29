export const checkIfPostIsLiked = async (postId: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:4000/api/isPostLikedByUser/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.isLiked;
    } catch (error) {
      console.error("Erreur lors de la vérification du like :", error);
      return false;
    }
  };
  