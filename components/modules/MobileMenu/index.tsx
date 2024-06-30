'use client';
import React from 'react';

import { useEffect, useState } from 'react';
import styles from './MobileMenu.module.scss';
import { MobileMenuNavigation, SidebarNavigation } from '@/data/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ExpandIcon from '@/data/icons/navigation/ExpandIcon';
import CollapseIcon from '@/data/icons/navigation/CollapseIcon';

import {
  $mobileMenuIsOpen,
  closeMobileMenu,
  openMobileMenu,
} from '@/context/modals';
import { useUnit } from 'effector-react';
import { $user } from '@/context/user';
import Avatar from '@/components/elements/Avatar';

export default function MobileMenu() {
  const [partExpand, setPartExpand] = useState(true);
  const pathname = usePathname();
  const lockPage =
    typeof window !== 'undefined' && localStorage.getItem('lock');
  const openMenu = useUnit($mobileMenuIsOpen);
  const user = useUnit($user);
  const isLogin = user?.id;

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'true');
    } else {
      document.body.style.overflow = '';
      typeof window !== 'undefined' && localStorage.setItem('lock', 'false');
    }
  }, [openMenu, lockPage]);

  const toggleMobileMenu = () => {
    if (openMenu) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <>
      {openMenu && (
        <nav className={styles.NavigationMenu}>
          {SidebarNavigation.map((nav) => {
            return (
              <div className={styles.Part} key={nav.title}>
                {nav.isExpand && (
                  <button
                    className={`${styles.PartExpandButton} ${partExpand ? styles.PartCollapseButton : ''}`}
                    onClick={() => setPartExpand(!partExpand)}
                  >
                    {nav.title}
                  </button>
                )}
                {nav.isExpand ? (
                  partExpand && (
                    <ul className={styles.PartList}>
                      {nav.list.map((item) => {
                        return (
                          <li key={item.link}>
                            <Link
                              href={item.link}
                              className={`${styles.PartListLink} ${pathname === item.link ? styles.PartListLinkActive : ''}`}
                            >
                              {item.icon} {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )
                ) : (
                  <ul className={styles.PartList}>
                    {nav.list.map((item) => {
                      return (
                        <li key={item.link}>
                          <Link
                            href={item.link}
                            className={`${styles.PartListLink} ${pathname === item.link ? styles.PartListLinkActive : ''}`}
                          >
                            {item.icon} {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      )}
      <div className={styles.MobileMenu}>
        <ul className={styles.List}>
          <li>
            <button className={styles.Link} onClick={toggleMobileMenu}>
              <div className={styles.LinkIcon}>
                {openMenu ? <CollapseIcon /> : <ExpandIcon />}
              </div>
              Меню
            </button>
          </li>
          {MobileMenuNavigation.list.map((item) => {
            return (
              <li key={item.link}>
                <Link href={item.link} className={styles.Link}>
                  <div className={styles.LinkIcon}>{item.icon}</div>
                  {item.name}
                </Link>
              </li>
            );
          })}
          {isLogin && (
            <li>
              <Link href="/profile" className={styles.Link}>
                <div className={styles.LinkIcon}>
                  <Avatar className={styles.ProfileAvatar} />
                </div>
                Профиль
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
