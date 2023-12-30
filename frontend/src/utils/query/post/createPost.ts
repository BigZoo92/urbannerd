import { PostSchemaType } from '../../../types'; 

export const createPost = async (formData: PostSchemaType) => {
  try {
    const response = await fetch(process.env.SERVER_URL + '/post', {
      method: 'POST',
      //@ts-ignore
      body: formData,
      credentials: "include"
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
