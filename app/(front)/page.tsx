import { Metadata } from 'next';
import { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import Slider from '@/components/slider/Slider';

export const metadata: Metadata = {
  title: 'Fullstack Next.js Store',
  description: 'Fullstack Next.js Store - Server Components, MongoDB, Next Auth, Tailwind, Zustand',
};

const HomePage = () => {
  return (
    <div className='my-8 flex flex-col gap-4 md:gap-12'>
      <div>
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div>
      <Icons />
      
      <Suspense fallback={<ProductItemsSkeleton qty={4} name='محبوب ترین ها' />}>
        <Slider />
      </Suspense>

      <Categories />
      

      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='آخرین محصولات' />}
      >
        <ProductItems />
      </Suspense>


      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
