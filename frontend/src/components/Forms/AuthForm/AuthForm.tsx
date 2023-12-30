'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';;
import { useAuthContext } from '@urbannerd/provider';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(false)
  const {user} = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    if(user){
      router.push('/');
    }
  }, [user])
  return (
    <section className="auth">
      <article>
        {isLoginForm ? (
          <LoginForm></LoginForm>
        ):(
          <SignUpForm></SignUpForm>
        )}
        <span onClick={() => setIsLoginForm(!isLoginForm)} className='changeForm'>
          {isLoginForm ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
        </span>
      </article>
    </section>
  );
};

export default AuthForm;
