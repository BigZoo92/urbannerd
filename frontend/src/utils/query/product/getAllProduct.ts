export const getAllProduct = async () => {
    try {
      const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/getAllProduct', {
        credentials: "include",
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
  