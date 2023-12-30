'use client';

import { useEffect, useState } from "react";
import Post, { PostProps } from "@urbannerd/components/Posts";
import { useAuthContext } from "@urbannerd/provider";
import Link from "next/link";
import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import { colors } from "@urbannerd/constant";
import { getBookmark } from "@urbannerd/utils";
import LittleHeader from "@urbannerd/components/LittleHeader";

export default function Bookmark() {
  const {user} = useAuthContext()
  const [bookmarkedPost, setBookmarkedPost] = useState<{post: PostProps}[] | null>(null)

  useEffect(() => {
    (async() => {
      const data = await getBookmark(); 
      setBookmarkedPost(data)
    })()
  }, [setBookmarkedPost])

  if(!bookmarkedPost) return null
  return (
    <>
      <main className="cd_bookmark">
      <LittleHeader>
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
      </LittleHeader>
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
