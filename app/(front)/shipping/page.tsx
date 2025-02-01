import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'حمل و نقل',
};

const ShippingPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default ShippingPage;
