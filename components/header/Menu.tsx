'use client';

import { ChevronDown, Moon, ShoppingCart, Sun } from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

import { SearchBox } from './SearchBox';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className='hidden md:block'>
        <SearchBox />
      </div>
      <ul className='flex gap-2'>
        <li className='flex items-center gap-2 md:gap-4'>
          <label className='swap swap-rotate'>
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <Sun className='swap-on' />
            <Moon className='swap-off' />
          </label>
          <Link
            href='/cart'
            className='relative mr-1'
            aria-label='سبد خرید'
          >
            <ShoppingCart />
            <span className='absolute -right-4 -top-4'>
              {items.length !== 0 && (
                <div className='badge badge-primary px-1.5'>
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </span>
          </Link>
        </li>
        {session && session.user ? (
          <li>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <label tabIndex={0} className='btn btn-ghost rounded-btn text-sm md:text-base'>
                {session.user.name}
                <ChevronDown size={18} />
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-10 w-52 rounded-box bg-base-200 p-2 shadow '
              >
                {session.user.isAdmin && (
                  <li onClick={handleClick}>
                    <Link href='/admin/dashboard'>پنل ادمین</Link>
                  </li>
                )}

                <li onClick={handleClick}>
                  <Link href='/order-history'>سفارشات </Link>
                </li>
                <li onClick={handleClick}>
                  <Link href='/profile'>حساب کاربری</Link>
                </li>
                <li onClick={handleClick}>
                  <button type='button' onClick={signOutHandler}>
                    خروج از حساب
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className='btn btn-ghost rounded-btn'
              type='button'
              onClick={() => signIn()}
            >ورود</button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
