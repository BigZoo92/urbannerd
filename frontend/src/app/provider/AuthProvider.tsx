'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuth } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { AuthSchemaType } from '../types';
import { PostProps } from '../components/Posts';
import { getAllPosts } from '../utils';

interface AuthContextProps {
  loading: boolean;
  posts: PostProps[];
  user: AuthSchemaType | null;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  fetchUser: () => Promise<void>;
  fetchPost: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthSchemaType | null | 'haha'>('haha');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[]>([])

  const fetchPost = async() => {
    const data = await getAllPosts(); 
    setPosts(data);
}

  useEffect(() => {
    fetchPost()
  }, [setPosts])

  

  const fetchUser = async () => {
    const authStatus = await isAuth();
    //@ts-ignore
    setUser(authStatus);
    if(!authStatus){
      router.push('/auth');
      setLoading(true)
    }
    else{
      setLoading(false) 
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if(user === 'haha') return
    console.log(user)
    if(!user){
      router.push('/auth');
      setLoading(true)
    }
    else{
      setLoading(false)
    }
  }, [user])

  return (
    //@ts-ignore
    <AuthContext.Provider value={{ loading, user, fetchUser, posts, setPosts, fetchPost }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext doit être utilisé à l\'intérieur d\'un AuthProvider');
  }

  return context;
};
