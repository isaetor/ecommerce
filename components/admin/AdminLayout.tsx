import Link from 'next/link';

import { auth } from '@/lib/auth';

const AdminLayout = async ({
  activeItem = 'dashboard',
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className='relative flex flex-grow p-4'>
        <div>
          <h1 className='text-2xl'>غیر مجاز</h1>
          <p>مجوز مدیر مورد نیاز است</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container relative flex flex-grow'>
      <div className='md:flex w-full py-4'>
        <div className='bg-base-300 rounded-2xl mb-4 md:w-1/5'>
          <ul className='menu gap-1'>
            <li>
              <Link
                className={'dashboard' === activeItem ? 'active' : ''}
                href='/admin/dashboard'
              >
                داشبورد
              </Link>
            </li>
            <li>
              <Link
                className={'orders' === activeItem ? 'active' : ''}
                href='/admin/orders'
              >
                سفارشات
              </Link>
            </li>
            <li>
              <Link
                className={'products' === activeItem ? 'active' : ''}
                href='/admin/products'
              >
                محصولات
              </Link>
            </li>
            <li>
              <Link
                className={'users' === activeItem ? 'active' : ''}
                href='/admin/users'
              >
                کاربران
              </Link>
            </li>
          </ul>
        </div>
        <div className='md:px-4 md:w-4/5'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
