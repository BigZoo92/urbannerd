import { PostProps } from "../components/Posts";

//@ts-ignore
export const getBookmark = async (): Promise<{bookmarks: {post: PostProps}[]}> => {
    try {
        const response = await fetch(`http://localhost:4000/api/bookmark`, {
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
        return data.bookmarks;
      } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
      }
  };