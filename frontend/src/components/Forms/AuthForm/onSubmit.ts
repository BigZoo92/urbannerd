import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import { LoginSchemaType, SignupSchemaType } from "@urbannerd/types";
import { login, signup } from "@urbannerd/utils";

export const onLoginSubmit = async (formData: LoginSchemaType) => {
  const {fetchUser} = useAuthContext()
    try {
      await login(formData);
      await fetchUser()
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  export const onSignupSubmit = async (formData: SignupSchemaType) => {
    try {
      await signup(formData);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };