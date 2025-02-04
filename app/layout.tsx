import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Abdelrahman Negm',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="hkq75-x">
            <body className={inter.className} data-oid="gntk0-u">
                {children}
            </body>
        </html>
    );
}
