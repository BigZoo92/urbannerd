import { Preferences } from "@capacitor/preferences";

export const toggleFollow = async (followingId: number) => {
    try {
      const { value: token } = await Preferences.get({ key: 'jwtToken' });
      const response = await fetch(process.env.SERVER_URL + '/user/toggleFollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ followingId }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'abonnement/désabonnement :", error);
    }
  };
  