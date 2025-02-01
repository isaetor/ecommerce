import productService from '@/lib/services/productService';
import { delay } from '@/lib/utils';

import FeaturedCarousel from './featuredCarousel';



const Carousel = async () => {
  await delay(1000);
  const featuredProducts = await productService.getFeatured();

  return (
    <FeaturedCarousel featuredProducts={JSON.parse(JSON.stringify(featuredProducts))} />
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return <div className='skeleton h-[200px] w-full rounded-lg lg:h-[400px]' />;
};
