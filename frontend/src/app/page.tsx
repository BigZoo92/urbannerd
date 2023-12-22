'use client';

import { useEffect, useState } from 'react';
import Card from './components/Card';
import { PersonIcons } from './components/Icons';
import Loader from './components/Loader';
import PostForm from './components/PostForm/PostForm';
import { colors } from './constant';
import { useAuthContext } from './provider/AuthProvider';
import { getAllPosts } from './utils';
import Post from './components/Posts';
import { PostProps } from './components/Posts';
import Header from './components/Header';
import NavTab from './components/NavTab';

export default function Home() {
  const { loading } = useAuthContext()
  const {posts, setPosts} = useAuthContext()

  useEffect(() => {
    (async() => {
      const data = await getAllPosts(); 
      setPosts(data);
    })()
  }, [setPosts])
 
  
  return loading ? (
    <Loader></Loader>
  ) : (
    <>
    <Header></Header>
      <main>
        <section className="feed">
        {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </section>
        <PostForm></PostForm>
      </main>
      <NavTab></NavTab>
    </>
  )
}
