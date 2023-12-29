'use client';

import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import PhotoProfil from "@urbannerd/components/PhotoProfil";
import Link from "next/link";
import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import { colors } from "@urbannerd/constant";
import { getFollowingsCount } from "@urbannerd/utils/query/user/getFollowingsCount";
import { getFollowersCount } from "@urbannerd/utils/query/user/getFollowersCount";
import { fetchUserPosts } from "@urbannerd/utils/query/user/fetchUserPosts";
import Post, { PostProps } from "@urbannerd/components/Posts";

const Profil = () => {
  const {user} = useAuthContext()

  const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);
    const [followers, setFollowers] = useState<number | null>(null)
    const [follows, setFollows] = useState<number | null>(null)
    const [posts, setPosts] = useState<PostProps[] | null>(null)
    useEffect(() => {
      (async() => {
        if(!user || !user.id) return
        const data = await fetchUserPosts(user?.id); 
        setPosts(data);
      })()
    }, [user, setPosts])

    useEffect(() => {      
      (async() => {
        if(!user || !user.id) return
        setFollowers(await getFollowingsCount(user?.id))
        setFollows(await getFollowersCount(user?.id))
      })()
  }, [user, setFollowers, setFollows]);

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
  
  if(!user) return null
    return (
      <>
        <main className="profil_main">
        <header className={showHeader ? "visible" : "hidden"}>
          <Link href='/'>
          <ArrowLeftIcons 
            iconProps={{
                  size: 32,
                  color: colors.colorWhite,
                }}></ArrowLeftIcons>
          </Link>
          <div>
            <h1>{user?.username}</h1>
            <h3>{posts?.length} Posts</h3>
          </div>
        </header>
        <div className="cd_pp">
            <PhotoProfil userPP={user?.pp}></PhotoProfil>
            <Link href="/profil-edit">Edit profile</Link>
          </div>
          <h2>{user?.username}</h2>
          {user?.bio && (<p>{user?.bio}</p>)}
          <div className="follower">
                <p><b>{follows}</b>Following</p>
                <p><b>{followers}</b>Followers</p>
          </div>
          <section className="feed">
            <h1>Post By {user.username}</h1>
          {posts && posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
        </section>
        </main>
      </>
    );
  };
  
  export default Profil;
  