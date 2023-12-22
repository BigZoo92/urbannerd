'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuth } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { AuthSchemaType, ProductSchemaType } from '../types';
import { PostProps } from '../components/Posts';
import { getAllPosts, getAllProduct } from '../utils';

interface AuthContextProps {
  loading: boolean;
  posts: PostProps[];
  products: ProductSchemaType[];
  user: AuthSchemaType | null;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductSchemaType[]>>;
  fetchUser: () => Promise<void>;
  fetchPost: () => Promise<void>;
  fetchProduct: () => Promise<void>;
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
  const [products, setProducts] = useState<ProductSchemaType[]>([])

  const fetchPost = async() => {
    const data = await getAllPosts(); 
    setPosts(data);
}


const fetchProduct = async() => {
  const data = await getAllProduct(); 
  setProducts(data);
}

  useEffect(() => {
    fetchPost()
  }, [setPosts])

  useEffect(() => {
    fetchProduct()
  }, [setProducts])

  

  const fetchUser = async () => {
    const authStatus = await isAuth();
    console.log(authStatus)
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
    <AuthContext.Provider value={{ loading, user, fetchUser, posts, setPosts, products, setProducts, fetchPost, fetchProduct }}>
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
