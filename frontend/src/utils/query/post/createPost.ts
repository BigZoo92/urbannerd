import { PostSchemaType } from '../../../types'; 

export const createPost = async (formData: PostSchemaType) => {
  try {
    const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/post', {
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
