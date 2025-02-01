import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItem = async ({ product }: { product: Product }) => {
  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='relative'>
      <div className={`${product.countInStock == 0 ? 'block' : 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-red-500 text-white py-4 px-8 rounded-full`}>ناموجود</div>
      <div className={`filter ${product.countInStock == 0 && 'grayscale'}`}>
        <div className='card mb-4 bg-base-300 border border-base-300 overflow-hidden' >
          <figure>
            <Link
              href={`/product/${product.slug}`}
              className='relative aspect-square h-full w-full'
            >
              <Image
                src={product.image}
                alt={product.name}
                placeholder='blur'
                blurDataURL={base64}
                width={350}
                height={350}
                className='h-full w-full object-cover'
              />
            </Link>
          </figure>
          <div className='card-body'>
            <Link href={`/product/${product.slug}`}>
              <h3 className='card-title text-lg font-bold line-clamp-1'>
                {product.name}

              </h3>
            </Link>
            <div className='bg-base-200 absolute top-2 left-2 rounded-lg px-4 py-2'>
              <Rating value={product.rating} caption='' isCard />
            </div>
            <p className='line-clamp-1 absolute top-2 right-2 bg-base-200 px-3 py-1 text-sm rounded-lg'>{product.brand}</p>
            <div className='card-actions'>
              <span className='text-lg font-bold mr-auto'>{new Intl.NumberFormat("fa").format(Number(product.price))} <span className='text-base font-normal÷'>ریال</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
