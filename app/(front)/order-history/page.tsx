import { Metadata } from 'next';
import React from 'react';

import MyOrders from './MyOrders';

export const metadata: Metadata = {
  title: 'تاریخچه سفارش',
};

const MyOrderPage = () => {
  return (
    <div>
      <h1 className='py-4 text-2xl'>تاریخچه سفارش
      </h1>
      <MyOrders />
    </div>
  );
};

export default MyOrderPage;
