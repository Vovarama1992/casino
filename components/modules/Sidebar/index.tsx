'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import CollapseIcon from '@/data/icons/navigation/CollapseIcon';
import ExpandIcon from '@/data/icons/navigation/ExpandIcon';
import { SidebarNavigation } from '@/data/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Sidebar() {
  const [expand, setExpand] = useState(false);
  const [partExpand, setPartExpand] = useState(true);
  const pathname = usePathname();
  const isMobile = useMediaQuery(1024);

  const handleExpand = () => {
    setExpand(!expand);
    setPartExpand(true);
  };

  useEffect(() => {
    if (expand) {
      document.documentElement.style.setProperty('--sidebar-width', '336px');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '155px');
    }

    if (isMobile) {
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
  }, [expand, isMobile]);

  return (
    <aside
      className={`${styles.Sidebar} ${expand ? styles.SidebarExpand : ''}`}
    >
      <div className={styles.Inner}>
        <button className={styles.ExpandButton} onClick={handleExpand}>
          {expand ? <CollapseIcon /> : <ExpandIcon />}
        </button>
        <nav className={styles.Navigation}>
          {SidebarNavigation.map((nav) => {
            return (
              <div className={styles.Part} key={nav.title}>
                {nav.title && (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <h5
                    className={`${styles.PartTitle} ${nav.isExpand && expand ? styles.PartExpandButton : ''} ${nav.isExpand && expand && partExpand ? styles.PartCollapseButton : ''}`}
                    style={{ display: expand && !nav.isExpand ? 'none' : '' }}
                    onClick={
                      nav.isExpand && expand
                        ? () => setPartExpand(!partExpand)
                        : undefined
                    }
                    onKeyDown={
                      nav.isExpand && expand
                        ? () => setPartExpand(!partExpand)
                        : undefined
                    }
                  >
                    {nav.title}
                  </h5>
                )}
                {nav.isExpand ? (
                  partExpand && (
                    <ul className={styles.PartList}>
                      {nav.list.map((item) => {
                        return (
                          <li key={item.link}>
                            <Link
                              href={item.link}
                              className={`${styles.Link} ${pathname === item.link ? styles.LinkActive : ''}`}
                            >
                              {item.icon} {expand && item.name}
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
                            className={`${styles.Link} ${pathname === item.link ? styles.LinkActive : ''}`}
                          >
                            {item.icon} {expand && item.name}
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
      </div>
    </aside>
  );
}
