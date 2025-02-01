import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'ثبت سفارش',
};

const PlaceOrderPage = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default PlaceOrderPage;
