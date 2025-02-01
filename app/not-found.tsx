import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col justify-center'>
        <h1 className='mb-4 text-xl font-semibold'>404 - صفحه یافت نشد</h1>
        <Link href='/' className='btn'>
        بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
