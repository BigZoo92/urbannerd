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
  
    return (
      <section className="auth">
        <aside>
        <PlanetIcons
                iconProps={{
                  size: 80,
                  color:colors.colorPurple
                }}
              />
        </aside>
        <article>
        {isLoginForm ? (
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <label>
              Username or Email:
              <input
                type="text"
                {...register('usernameOrEmail', { required: 'This field is required' })}
              />
              {errors && errors.usernameOrEmail && (
                <span>{errors.usernameOrEmail.message}</span>
              )}
            </label>
            <label>
              Password:
              <input
                type="password"
                {...register('password', { required: 'This field is required' })}
              />
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <button type="submit">Login</button>
          </form>
        ):(
          <form onSubmit={signupHandleSubmit(onSignupSubmit)}>
            <label>
              Username
              <input
                type="text"
                {...signupRegister('username', { required: 'This field is required' })}
              />
              {signupFormState.errors && signupFormState.errors.username && (
                <span>{signupFormState.errors.username.message}</span>
              )}
            </label>
            <label>
              Email
              <input
                type="text"
                {...signupRegister('email', { required: 'This field is required' })}
              />
              {signupFormState.errors && signupFormState.errors.email && (
                <span>{signupFormState.errors.email.message}</span>
              )}
            </label>
            <label>
              Password:
              <input
                type="password"
                {...signupRegister('password', { required: 'This field is required' })}
              />
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <label>
              Confirm your password 
              <input
                type="password"
                {...signupRegister('password', { required: 'This field is required' })}
              />
              {errors && errors.password && (
                <span>{errors.password.message}</span>
              )}
            </label>
            <button type="submit">Login</button>
          </form>
        )}
        <span onClick={() => setIsLoginForm(!isLoginForm)}>
          {isLoginForm ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
        </span>
        </article>
      </section>
    );
  };
  
  export default AuthForm;
