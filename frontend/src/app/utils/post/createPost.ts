import { PostSchemaType } from '../../types'; 

export const createPost = async (formData: PostSchemaType) => {
  try {
    const response = await fetch('http://localhost:4000/api/post', {
      method: 'POST',
      //@ts-ignore
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Create Post failed');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Create Post failed:', error);
    throw error;
  }
};
