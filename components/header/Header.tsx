import { AlignJustify } from 'lucide-react';
import Link from 'next/link';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  return (
    <header className='bg-base-300'>
      <nav className='container'>
        <div className='navbar justify-between '>
          <div className='flex items-center gap-4'>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link
              href='/'
              className='text-base font-semibold sm:ml-4 sm:text-lg'
            >
              فروشگاه اینترنتی
            </Link>
          </div>
          <Menu />
        </div>
        <div className='block bg-base-300 pb-4 text-center md:hidden'>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
