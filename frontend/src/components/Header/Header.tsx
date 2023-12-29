'use client';

import { colors } from "@urbannerd/constant"
import { BookmarkIcons, SettingsIcons, SignOutIcons } from "../Icons"
import { useEffect, useRef, useState } from "react"
import { useClickOutside } from "@urbannerd/hook/useClickOutside";
import { logout } from "@urbannerd/utils/query/auth";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import PhotoProfil from "../PhotoProfil";
import Link from "next/link";
import { UserIcons } from "../Icons";

const Header = () => {
    const {user, fetchUser} = useAuthContext()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLElement>(null)
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);
    useClickOutside(ref, () => setIsOpen(false))
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
    return(
        <header className={showHeader ? "visible" : "hidden"}>
            <nav>
                <ul>
                    <li>
                    <SettingsIcons
                            iconProps={{
                            size: 32,
                            color: colors.colorWhite,
                            }}
                        />
                    </li>
                    <li>

                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                    <PhotoProfil userPP={user?.pp}/>
                    </li>
                </ul>
            </nav>
            <aside style={{transform: isOpen ? "translateX(0)" : 'translateX(-100%)'}} ref={ref}>
                <div className="userInfo">
                    <div className='logout' onClick={async() => {
                        await logout()
                        await fetchUser()
                        }}>
                    <SignOutIcons
                        iconProps={{
                        size: 32,
                        color: colors.colorWhite,
                    }}
                        />
                    </div>
                    <Link href={`/profil/${user?.id}`}>
                        <PhotoProfil userPP={user?.pp}/>
                        <p>{user?.username}</p>
                    </Link>
                    <nav>
                    <Link href={`/profil/${user?.id}`}>
                        <UserIcons
                            iconProps={{
                            size: 35,
                            strokeWidth: 70,
                            color: colors.colorWhite,
                        }}
                        />
                        <p>Profile</p>
                    </Link>
                    <Link href="/bookmark">
                        <BookmarkIcons
                            iconProps={{
                            size: 35,
                            strokeWidth: 17,
                            color: "transparent",
                            stroke: colors.colorWhite
                        }}
                        />
                        <p>Bookmark</p>
                    </Link>
                    </nav>
                </div>
            </aside>
        </header>
    )
}

export default Header