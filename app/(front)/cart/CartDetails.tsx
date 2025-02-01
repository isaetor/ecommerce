'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCartService from '@/lib/hooks/useCartStore';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, [items, itemsPrice, decrease, increase]);

  if (!mounted) return <>در حال بارگذاری ...</>;

  return (
    <>
      {items.length === 0 ? (
        <div className='py-10'>
          <Image className="mx-auto" src='https://isaetor.storage.iran.liara.space/empty-cart.svg' width="200" height="150" alt='empty-cart' />
          <p className='text-lg  text-center mt-6'>سبد خرید شما خالی است!</p>
          <p className='text-xs text-center mt-2'>می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
          <div className="flex items-center justify-center gap-2 mt-4">

            <Link href='/search' className='btn'>
              فروشگاه
            </Link><Link href='/' className='btn'>
              صفحه اصلی
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1 className='py-4 text-2xl'>سبد خرید</h1>
          <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td className='flex items-center'>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                        </Link>
                        <span className='px-2'>{item.name}</span>
                      </td>
                      <td>
                        <div>
                          <button
                            className='btn'
                            type='button'
                            onClick={() => decrease(item)}
                          >
                            -
                          </button>
                          <span className='px-2'>{item.qty}</span>
                          <button
                            className='btn'
                            type='button'
                            onClick={() => increase(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{new Intl.NumberFormat("fa").format(Number(item.price))} <span>ريال</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='card' bg-base-300>
              <div className='card-body'>
                <ul>
                  <li className='pb-3 flex items-center justify-between'>
                    <span className='text-lg font-bold'>جمع کل</span>
                    <span className='text-lg font-bold'> {new Intl.NumberFormat("fa").format(Number(itemsPrice))} <span className='text-base font-normal'>ريال</span> </span>
                  </li>
                  <li>
                    <button
                      type='button'
                      className='btn btn-primary w-full'
                      onClick={() => router.push('/shipping')}
                    >
                      پرداخت
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetails;
