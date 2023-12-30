'use client';

import { useEffect, useState, useRef } from "react";
import Post, { PostProps } from "@urbannerd/components/Posts";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import Link from "next/link";
import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import { colors } from "@urbannerd/constant";
import { getBookmark } from "@urbannerd/utils/query/bookmark/getBookmark";


export default function Bookmark() {
  const {user} = useAuthContext()
  const [bookmarkedPost, setBookmarkedPost] = useState<{post: PostProps}[] | null>(null)
  const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

  useEffect(() => {
    (async() => {
      const data = await getBookmark(); 
      //@ts-ignore
      setBookmarkedPost(data)
    })()
  }, [setBookmarkedPost])

  useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowHeader(currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
 
  if(!bookmarkedPost) return null
  return (
    <>
      <main className="cd_bookmark">
      <header className={showHeader ? "visible" : "hidden"}>
      <Link href='/'>
      <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}></ArrowLeftIcons>
      </Link>
      <div>
        <h1>Post Saved</h1>
        <h2>{user?.username}</h2>
      </div>
    
    </header>
        <section className="feed">
        {bookmarkedPost.length !== 0 ? bookmarkedPost.map((post, index) => (
            <Post key={index} post={post.post} />
          )) : (
            <h3>No Post Saved</h3>
          )}
        </section>
      </main>
    </>
  )
}