'use client';

import { useEffect, useState } from 'react';
import Card from './components/Card';
import { PersonIcons } from './components/Icons';
import Loader from './components/Loader';
import PostForm from './components/PostForm';
import { colors } from './constant';
import { useAuthContext } from './provider/AuthProvider';
import { getAllPosts } from './utils';
import Post from './components/Posts';
import { PostProps } from './components/Posts';

export default function Home() {
  const { loading } = useAuthContext()
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    (async() => {
      const data = await getAllPosts();
      console.log(data); 
      setPosts(data);
    })()
  }, [setPosts])
 
  
  return loading ? (
    <Loader></Loader>
  ) : (
    <>
      <main>
        <section className="feed">
        {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </section>
        <PostForm></PostForm>
      </main>
    </>
  )
}
