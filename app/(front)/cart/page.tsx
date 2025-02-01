import { Metadata } from 'next';

import CartDetails from './CartDetails';

export const metadata: Metadata = {
  title: 'سبد خرید',
};

const CartPage = () => {
  return (
    <div>
      <CartDetails />
    </div>
  );
};

export default CartPage;
