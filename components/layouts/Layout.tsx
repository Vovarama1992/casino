'use client';
import React from 'react';
import { ReactNode } from 'react';
import Header from '@/components/modules/Header';
import Sidebar from '@/components/modules/Sidebar';
import MobileMenu from '@/components/modules/MobileMenu';
import Footer from '@/components/modules/Footer';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Toastify from '@/components/elements/Toastify';
import WalletModal from '@/components/screens/WalletModal';
import AuthModal from '@/components/screens/AuthModal';
import { useUserData } from '@/hooks/useUserData';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery(1024);
  useUserData();

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        {pathname.includes('/slot/') && isMobile ? '' : <MobileMenu />}
        <main className="main">{children}</main>
      </div>
      {pathname.includes('/slot/') && isMobile ? '' : <Footer />}
      <WalletModal />
      <AuthModal />
      <Toastify />
    </>
  );
}
