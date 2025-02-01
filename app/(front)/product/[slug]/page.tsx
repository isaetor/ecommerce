import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import AddToCart from '@/components/products/AddToCart';
import { Rating } from '@/components/products/Rating';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='my-2'>
      <div className='my-4'>
        <Link href='/' className='btn'>بازگشت</Link>
      </div>
      <div className='grid gap-8 md:grid-cols-4'>
        <div className='relative aspect-square '>
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            width={640}
            height={640}
            sizes='100vw'
            className='h-full w-full object-contain rounded-2xl'
          />
        </div>
        <div className='md:col-span-2'>
          <ul className='space-y-4'>
            <li>
              <h1 className='text-xl'>{product.name}</h1>
            </li>
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} امتیاز`}
              />
            </li>
            <li>{product.brand}</li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card mt-3 bg-base-300 shadow-xl md:mt-0'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <div>قیمت</div>
                <div className='text-lg font-bold'>{new Intl.NumberFormat("fa").format(Number(product.price))} <span className='text-base font-normal'>ريال</span></div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>وضعیت</div>
                <div className={product.countInStock > 0 ? 'text-green-500' : 'text-red-500'}>
                  {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
