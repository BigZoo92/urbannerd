import { Preferences } from "@capacitor/preferences";
import { EditProfilType } from "@urbannerd/types";

export const editProfil = async (formData: EditProfilType, file?: File) => {
  try {
    const formDataObj = new FormData();
    formDataObj.append('website', formData.website || '');
    formDataObj.append('bio', formData.bio || '');
    file && formDataObj.append('pp', file);
    const { value: token } = await Preferences.get({ key: 'jwtToken' });
    const response = await fetch(process.env.SERVER_URL + '/editProfil', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      //@ts-ignore
      body: formDataObj,
    });

    if (!response.ok) {
      throw new Error('Edit Profil failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Edit Profil failed:', error);
    throw error;
  }
};
