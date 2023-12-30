export const getAllPosts = async () => {
  try {
    const response = await fetch(process.env.SERVER_URL + '/getAllPosts', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Fetch Posts failed:', error);
    throw error;
  }
};
