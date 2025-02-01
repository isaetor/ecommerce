import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import clothing from '../../public/images/categories/clothing.jpg';
import digital from '../../public/images/categories/digital.jpg';
import food from '../../public/images/categories/food.jpg';

const Categories = () => {
  return (
    <div className='grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=clothing'
        className='group relative col-span-2 row-span-1 overflow-hidden md:row-span-2'
      >
        <Image
          src={clothing}
          alt='Collection of Clothing'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='مد و پوشاک' />
      </Link>
      <Link
        href='/search?category=digital'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={digital}
          alt='Collection of Digital'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='کالای دیجیتال' />
      </Link>
      <Link
        href='/search?category=food'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={food}
          alt='Collection of Food'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='کالای خوراکی' />
      </Link>
    </div>
  );
};

export default Categories;
