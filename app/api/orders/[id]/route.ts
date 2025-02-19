import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth) {
    return Response.json(
      { message: 'دسترسی غیر مجاز' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const order = await OrderModel.findById(params.id);
  return Response.json(order);
});