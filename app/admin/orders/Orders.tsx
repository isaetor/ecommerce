'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { Order } from '@/lib/models/OrderModel';
import { dateFormat } from '@/lib/utils';

export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  if (error) return 'خطایی رخ داده است.';
  if (isLoading) return 'در حال بارگذاری ...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>سفارشات</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>تاریخ</th>
              <th>مجموع قیمت</th>
              <th>وضعیت پرداخت</th>
              <th>وضعیت ارسال</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>..{order._id.substring(20, 24)}</td>
                <td>{order.user?.name || 'کاربر حذف شده'}</td>
                <td>{dateFormat(order.createdAt)}</td>
                <td>{new Intl.NumberFormat("fa").format(Number(order.totalPrice))} <span>ريال</span> </td>
                <td>
                  {order.isPaid && order.paidAt
                    ? `پرداخت شده در ${dateFormat(order.paidAt)}`
                    : 'پرداخت نشده'}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `ارسال شده در ${dateFormat(order.deliveredAt)}`
                    : 'ارسال نشده'}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                  جزئیات
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
