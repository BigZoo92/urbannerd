import { Preferences } from '@capacitor/preferences';
import { PostSchemaType } from '../../../types'; 

export const createPost = async (formData: PostSchemaType) => {
  try {
    const { value: token } = await Preferences.get({ key: 'jwtToken' });
    const response = await fetch(process.env.SERVER_URL + '/post', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      //@ts-ignore
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Create Post failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create Post failed:', error);
    throw error;
  }
};
