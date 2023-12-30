import { Preferences } from "@capacitor/preferences";
import { PostProps } from "@urbannerd/components/Posts";

//@ts-ignore
export const getBookmark = async (): Promise<{bookmarks: {post: PostProps}[]}> => {
    try {
      const { value: token } = await Preferences.get({ key: 'jwtToken' });
        const response = await fetch(`http://localhost:4000/api/bookmark`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
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