'use client';

import Link from 'next/link';
import { HoodieIcons, PlanetIcons } from '../Icons';
import { colors } from '@/app/constant';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const NavTab = () => {
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(1);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setOpacity(0.339623); 
      } else {
        setOpacity(1);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer style={{ opacity }}>
      <nav>
        <ul>
          <span
            className={
              pathname === '/shop' ? 'border_footer active' : 'border_footer'
            }
          ></span>
          <li>
            <Link href={'/'}>
              <PlanetIcons
                iconProps={{
                  size: 32,
                  color:
                    pathname === '/' ? colors.colorPurple : colors.colorWhite,
                }}
              />
            </Link>
          </li>
          <li className={pathname === '/shop' ? 'active' : ''}>
            <Link href={'/shop'}>
              <HoodieIcons
                iconProps={{
                  size: 32,
                  color:
                    pathname === '/shop'
                      ? colors.colorPurple
                      : colors.colorWhite,
                }}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default NavTab;
