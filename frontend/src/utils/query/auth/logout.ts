export const logout = async (): Promise<void> => {

  try {
    const response = await fetch('https://afdf-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
    } else {
      const responseData = await response.json();
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};