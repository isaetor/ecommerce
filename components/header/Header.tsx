import { AlignJustify } from 'lucide-react';
import Link from 'next/link';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  return (
    <header className='bg-base-300'>
      <nav className='container'>
        <div className='navbar justify-between p-0'>
          <div className='flex items-center gap-1'>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link
              href='/'
              className='text-sm font-semibold sm:text-lg'
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
