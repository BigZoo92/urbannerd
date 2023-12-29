'use client';

import { useEffect } from 'react';
import Loader from '@urbannerd/components/Loader';
import PostForm from '@urbannerd/components/PostForm/PostForm';
import { useAuthContext } from '@urbannerd/provider/AuthProvider';
import { getAllPosts } from '@urbannerd/utils';
import Post from '@urbannerd/components/Posts';
import Header from '@urbannerd/components/Header';
import NavTab from '@urbannerd/components/NavTab';

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
        {posts && posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </section>
        <PostForm></PostForm>
      </main>
      <NavTab></NavTab>
    </>
  )
}
