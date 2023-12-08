export const isAuth = async (): Promise<boolean | undefined> => {
  try {
    const response = await fetch('http://localhost:4000/api/checkAuthenticated', {
        credentials: "include",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      return false
    } else {
      const responseData: boolean = await response.json();
      console.log(responseData);
      return responseData;
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};