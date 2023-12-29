export const createProduct = async (formData: FormData) => {
    try {
      const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/api/product/create', {
        method: 'POST',
        body: formData,
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Create Product failed');
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Create Product failed:', error);
      throw error;
    }
  };
  