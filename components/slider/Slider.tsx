import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

import ProductItem from '../products/ProductItem';

const Slider = async () => {
  const topRated = await productService.getTopRated();


  return (
    <div>
      <h2 className='my-4 text-lg md:text-2xl md:my-6 font-bold'>محبوب ترین ها</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {topRated.map((product: any) => (
          <div key={product.slug} className=''>
            <ProductItem product={convertDocToObj(product)} />
          </div>
        ))}

      </div>
    </div>
  );

};

export default Slider;
