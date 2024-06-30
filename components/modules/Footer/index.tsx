import React from 'react';

import styles from './Footer.module.scss';
import Logo from '@/components/elements/Logo';
import Copy from '@/components/elements/Copy';
import { FooterNavigation } from '@/data/navigation';
import { INavigation } from '@/types/navigation';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Inner}>
        <div className={styles.Left}>
          <Logo />
          <Copy />
        </div>
        <nav className={styles.Navigation}>
          {FooterNavigation.map((nav: INavigation) => {
            return (
              <div className={styles.NavigationItem} key={nav.title}>
                <h3 className={styles.NavigationItemTitle}>{nav.title}</h3>
                {nav.type === 'social-media' ? (
                  <ul className={styles.NavigationItemSocialList}>
                    {nav.list.map((item) => {
                      return (
                        <li key={item.link}>
                          <Link
                            href={item.link}
                            className={styles.NavigationItemSocialListLink}
                            title={item.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.icon}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className={styles.NavigationItemList}>
                    {nav.list.map((item) => {
                      return (
                        <li key={item.link}>
                          <Link
                            href={item.link}
                            className={styles.NavigationItemListLink}
                          >
                            {item.name}
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
    </footer>
  );
}
