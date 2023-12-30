export const logout = async (): Promise<void> => {

  try {
    const response = await fetch(process.env.SERVER_URL + '/auth/logout', {
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