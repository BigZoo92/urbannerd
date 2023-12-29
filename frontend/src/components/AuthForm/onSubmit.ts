import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import { LoginSchemaType, SignupSchemaType } from "@urbannerd/types";
import { login, signup } from "@urbannerd/utils";

export const onSubmit = () => {
    const {user, fetchUser} = useAuthContext()
    const onLoginSubmit = async (formData: LoginSchemaType) => {
        try {
          await login(formData);
          await fetchUser()
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
  
      const onSignupSubmit = async (formData: SignupSchemaType) => {
        try {
          // Appelle la fonction signup avec les données du formulaire
          await signup(formData);
        } catch (error) {
          console.error('Signup failed:', error);
        }
      };
    return {onLoginSubmit, onSignupSubmit}
}