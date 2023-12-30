import { Preferences } from "@capacitor/preferences";

export const toggleLikePost = async (postId: number) => {
    try {
      const { value: token } = await Preferences.get({ key: 'jwtToken' });
      const response = await fetch(process.env.SERVER_URL + '/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
  