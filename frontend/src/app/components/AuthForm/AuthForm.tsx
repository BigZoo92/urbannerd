'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchemaType, SignupSchemaType } from '../../types';

import './style.scss';
import { useAuthContext } from '@/app/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { onSubmit } from './onSubmit';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [activeInput, setActiveInput] = useState<string[]>([]);
  const { register, handleSubmit, formState: {errors} } = useForm<LoginSchemaType>();
  const {user} = useAuthContext()
  const router = useRouter();
  const {onLoginSubmit, onSignupSubmit} = onSubmit()
  const { register: signupRegister, handleSubmit: signupHandleSubmit, formState: signupFormState } = useForm<SignupSchemaType>();
  
    
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
      const text = event.target.value;
      if (text.trim() !== '') {
        setActiveInput((prev) => [...prev, inputName]);
      } else {
        setActiveInput((prev) => prev.filter(item => item !== inputName));
      }
    };
    useEffect(() => {
      if(user){
        router.push('/');
      }
    }, [user])
    return (
      <section className="auth">
        <article>
        {isLoginForm ? (
          <form className='authForm' onSubmit={handleSubmit(onLoginSubmit)}>
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
          <form className='authForm' onSubmit={signupHandleSubmit(onSignupSubmit)}>
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
                {...signupRegister('confirmPassword', { required: 'This field is required' })}
                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                autoComplete="on"
              />
              <span className={activeInput.includes('confirmPassword') ? 'label labelActive' : 'label'}>Confirm your password </span>
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
