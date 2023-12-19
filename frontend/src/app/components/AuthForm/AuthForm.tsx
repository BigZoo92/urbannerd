'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchemaType, SignupSchemaType } from '../../types';

import './style.scss';
import { login, signup } from '@/app/utils/auth';
import { PlanetIcons } from '../Icons';
import { colors } from '@/app/constant';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [activeInput, setActiveInput] = useState<string[]>([]);
  const { register, handleSubmit, formState: {errors} } = useForm<LoginSchemaType>();
  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: signupFormState } = useForm<SignupSchemaType>();
  
    const onLoginSubmit = async (formData: LoginSchemaType) => {
      try {
        await login(formData);
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
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
      const text = event.target.value;
      if (text.trim() !== '') {
        setActiveInput((prev) => [...prev, inputName]);
      } else {
        setActiveInput((prev) => prev.filter(item => item !== inputName));
      }
    };

    return (
      <section className="auth">
        <article>
        {isLoginForm ? (
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <label>
              <input
                type="text"
                {...register('usernameOrEmail', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'usernameOrEmail')}
              />
              <span className={activeInput.includes('usernameOrEmail')  ? 'label labelActive' : 'label'}>Username or Email</span>
              {errors && errors.usernameOrEmail && (
                <span>{errors.usernameOrEmail.message}</span>
              )}
            </label>
            <label>
              <input
                type="password"
                {...register('password', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'password')}
              />
              <span className={activeInput.includes('password') ? 'label labelActive' : 'label'}>Password</span>
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <button type="submit">Login</button>
            <span className='btn_ouline'>Forgot the Password ?</span>
          </form>
        ):(
          <form onSubmit={signupHandleSubmit(onSignupSubmit)}>
            <label>
              <input
                type="text"
                {...signupRegister('username', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'username')}
              />
              <span className={activeInput.includes('username') ? 'label labelActive' : 'label'}>Username</span>
              {signupFormState.errors && signupFormState.errors.username && (
                <span>{signupFormState.errors.username.message}</span>
              )}
            </label>
            <label>
              
              <input
                type="text"
                {...signupRegister('email', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'email')}
              />
              <span className={activeInput.includes('email') ? 'label labelActive' : 'label'}>Email</span>
              {signupFormState.errors && signupFormState.errors.email && (
                <span>{signupFormState.errors.email.message}</span>
              )}
            </label>
            <label>
            
              <input
                type="password"
                {...signupRegister('password', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'password')}
                autoComplete="on"
              />
              <span className={activeInput.includes('password') ? 'label labelActive' : 'label'}>Password</span>
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <label>
              
              <input
                type="password"
                {...signupRegister('password', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'password')}
                autoComplete="on"
              />
              <span className={activeInput.includes('password') ? 'label labelActive' : 'label'}>Confirm your password </span>
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <button type="submit">Login</button>
          </form>
        )}
        <span onClick={() => setIsLoginForm(!isLoginForm)} className='changeForm'>
          {isLoginForm ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
        </span>
        </article>
      </section>
    );
  };
  
  export default AuthForm;
