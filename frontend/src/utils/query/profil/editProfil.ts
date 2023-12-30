import { EditProfilType } from "../../../types";

export const editProfil = async (formData: EditProfilType, file?: File) => {
  try {
    const formDataObj = new FormData();
    formDataObj.append('website', formData.website || '');
    formDataObj.append('bio', formData.bio || '');
    file && formDataObj.append('pp', file);
    const response = await fetch(process.env.SERVER_URL + '/editProfil', {
      method: 'POST',
      //@ts-ignore
      body: formDataObj,
      credentials: "include"
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
