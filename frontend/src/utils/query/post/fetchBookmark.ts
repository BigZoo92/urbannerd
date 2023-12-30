
export const checkIfPostIsBookmarked = async (postId: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:4000/api/isPostBookmarkedByUser/${postId}`, {
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
        return data.isBookmarked;
      } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        return false;
      }
  };
  
  export const toggleBookmark = async (postId: number) => {
    try {
        const response = await fetch(process.env.SERVER_URL + '/toggleBookmark', {
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
  