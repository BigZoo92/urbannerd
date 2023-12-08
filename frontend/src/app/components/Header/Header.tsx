'use client';

import { colors } from "@/app/constant"
import { PersonIcons, SettingsIcons, SignOutIcons } from "../Icons"
import { useRef, useState } from "react"
import { useClickOutside } from "@/app/hook/useClickOutside";
import { logout } from "@/app/utils/auth";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLElement>(null)
    useClickOutside(ref, () => setIsOpen(false))
    return(
        <header>
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
                        <PersonIcons
                            iconProps={{
                            size: 32,
                            color: colors.colorWhite,
                            }}
                        />
                    </li>
                </ul>
            </nav>
            <aside style={{right: isOpen ? 0 : '-75%'}} ref={ref}>
                <ul>
                    <li onClick={() => logout()}>
                    <SignOutIcons
                        iconProps={{
                        size: 32,
                        color: colors.colorWhite,
                    }}
                        />
                    </li>
                </ul>
            </aside>
        </header>
    )
}

export default Header