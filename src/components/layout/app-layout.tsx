"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isGamePage = pathname.startsWith('/games');

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            {!isGamePage && <Footer />}
        </div>
    );
}
