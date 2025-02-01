'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import { Order } from '@/lib/models/OrderModel';

const MyOrders = () => {
  const router = useRouter();
  const { data: orders, error, isLoading } = useSWR('/api/orders/mine');

  if (error) return <>خطایی رخ داده است</>;
  if (isLoading) return <>در حال بارگیری ...</>;
  if (!orders) return <>سفارسی وجود ندارد</>;

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>تاریخ</th>
            <th>مجموع قیمت</th>
            <th>وضعیت پرداخت</th>
            <th>وضعیت تحویل</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(20, 24)}</td>
              <td className='whitespace-nowrap'>
                {order.createdAt.substring(0, 10)}
              </td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.substring(0, 10)}`
                  : 'پرداخت نشده است'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : '	تحویل داده نشده است'}
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
  );
};

export default MyOrders;
