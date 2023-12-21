'use client';

import React, { useEffect, useState, useRef } from "react";
import './style.scss'
import { useAuthContext } from "../provider/AuthProvider";
import PhotoProfil from "../components/PhotoProfil";
import Link from "next/link";
import { ArrowLeftIcons } from "../components/Icons";
import { colors } from "../constant";

const Home = () => {
  const {user} = useAuthContext()
  const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

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
  
  if(!user) return
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
            <h3>15 Posts</h3>
          </div>
        </header>
        <div className="cd_pp">
            <PhotoProfil userPP={user?.pp}></PhotoProfil>
            <Link href="/profilEdit">Edit profile</Link>
          </div>
          <h2>{user?.username}</h2>
          {user?.bio && (<p>{user?.bio}</p>)}
          <div className="follower">
                <p><b>523</b>Following</p>
                <p><b>523</b>Followers</p>
          </div>
        </main>
      </>
    );
  };
  
  export default Home;
  