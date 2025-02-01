'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  // mutate data in the backend by calling trigger function
  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success('سفارش با موفقیت انجام شد');
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    },
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>در حال بارگذاری ...</>;

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className='my-4 grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>آدرس حمل و نقل</h2>

              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.country}{' '} , {shippingAddress.city} {' '} ,{shippingAddress.address}</p>
              <p>کد پستی : {shippingAddress.postalCode}</p>
   
              <div>
                <Link className='btn' href='/shipping'>
                  ویرایش
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>روش پرداخت</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className='btn' href='/payment'>
                ویرایش
                </Link>
              </div>
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>محصولات</h2>
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
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className='px-2'>
                            {item.name}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>{new Intl.NumberFormat("fa").format(Number(item.price))} <span>ريال</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className='btn' href='/cart'>
                  ویرایش
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>خلاصه سفارش</h2>
              <ul className='space-y-3'>
              <li>
                  <div className='mb-2 flex justify-between'>
                    <div>جمع کل</div>
                    <div>{new Intl.NumberFormat("fa").format(Number(itemsPrice))} <span>ريال</span></div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>مالیات</div>
                    <div>{new Intl.NumberFormat("fa").format(Number(taxPrice))} <span>ريال</span></div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>حمل و نقل</div>
                    <div>{new Intl.NumberFormat("fa").format(Number(shippingPrice))} <span>ريال</span></div>
                  </div>
                </li>
                <li>
                  <div className='mb-2 flex justify-between'>
                    <div>مجموع</div>
                    <div>{new Intl.NumberFormat("fa").format(Number(totalPrice))} <span>ريال</span></div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className='btn btn-primary w-full'
                  >
                    {isPlacing && (
                      <span className='loading loading-spinner'></span>
                    )}
                    ثبت سفارش
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
