'use client';

import Link from 'next/link';
import { HoodieIcons, PlanetIcons } from '../Icons';
import { colors } from '@/app/constant';
import { usePathname } from 'next/navigation';

const NavTab = () => {
  const pathname = usePathname();
  return (
    <header>
      <nav>
        <ul>
          <span
            className={
              pathname === '/shop' ? 'border_header active' : 'border_header'
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
    </header>
  );
};

export default NavTab;
