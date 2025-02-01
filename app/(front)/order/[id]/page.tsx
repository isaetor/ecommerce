import OrderDetails from './OrderDetails';

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  return {
    title: `سفارش ${params.id}`,
  };
};

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <OrderDetails
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;
