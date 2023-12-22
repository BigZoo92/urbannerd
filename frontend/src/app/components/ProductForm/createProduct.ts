export const createProduct = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:4000/api/product/create', {
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
  