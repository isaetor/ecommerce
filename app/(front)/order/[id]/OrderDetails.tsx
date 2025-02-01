'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { OrderItem } from '@/lib/models/OrderModel';
import { dateFormat } from '@/lib/utils';

interface IOrderDetails {
  orderId: string;
}

const OrderDetails = ({ orderId }: IOrderDetails) => {
  const { data: session } = useSession();

  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    async (url) => {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('سفارش با موفقیت تحویل شد')
        : toast.error(data.message);
    },
  );



  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return 'در حال بارگیری ...';

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div>
      <h1 className='py-4 text-lg'>جزئیات سفارش {orderId}</h1>
      <div className=' grid md:grid-cols-6 md:gap-5'>
        <div className='md:col-span-4'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>آدرس حمل و نقل</h2>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.country}{' '} , {shippingAddress.city} {' '} ,{shippingAddress.address}</p>
              <p>کد پستی : {shippingAddress.postalCode}</p>
              {isDelivered ? (
                <div className='text-success'>تحویل در {dateFormat(deliveredAt)}</div>
              ) : (
                <div className='text-error'>تحویل داده نشد</div>
              )}
            </div>
          </div>

          <div className='card mt-4 bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>روش پرداخت</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className='text-success'>پرداخت شده در {dateFormat(paidAt)}</div>
              ) : (
                <div className='text-error'>پرداخت نشده است</div>
              )}
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
                  {items.map((item: OrderItem) => (
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
                      <td>{item.qty}</td>
                      <td>{new Intl.NumberFormat("fa").format(Number(item.price))} <span>ريال</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card bg-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>خلاصه سفارش</h2>
              <ul className='mt-2'>
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

                {session?.user.isAdmin && (
                  <li>
                    <button
                      className='btn my-2 w-full'
                      onClick={() => deliverOrder()}
                      disabled={isDelivering}
                    >
                      {isDelivering && (
                        <span className='loading loading-spinner'></span>
                      )}
                      علامت گذاری به عنوان تحویل داده شده
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
