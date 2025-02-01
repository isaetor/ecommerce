import type { Metadata } from 'next';
import localFont from "next/font/local";
import './globals.css';

import DrawerButton from '@/components/DrawerButton';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';

const IranYekan = localFont({
  src: [
    {
      path: 'fonts/IranYekan/iranyekanweblightfanum.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/IranYekan/iranyekanwebregularfanum.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/IranYekan/iranyekanwebboldfanum.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/IranYekan/iranyekanwebblackfanum.woff',
      weight: '900',
      style: 'normal',
    },
  ],
})
export const metadata: Metadata = {
  title: 'فروشگاه',
  description: 'پروژه سایت فروشگاهی سعید ترکمان',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='fa' dir='rtl'>
      <body className={IranYekan.className}>
        <Providers>
          <div className='drawer'>
            <DrawerButton />
            <div className='drawer-content'>
              <div className='flex min-h-screen flex-col'>
                <Header />
                {children}
                <Footer />
              </div>
            </div>
            <div className='drawer-side z-50'>
              <label
                htmlFor='my-drawer'
                aria-label='close sidebar'
                className='drawer-overlay'
              ></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
