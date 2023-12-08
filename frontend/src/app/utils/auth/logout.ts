export const logout = async (): Promise<void> => {

  try {
    const response = await fetch('http://localhost:4000/api/auth/logout', {
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
      console.log('Login successful:', responseData);
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};