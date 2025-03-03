import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'دسترسی غیر مجاز' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const users = await UserModel.find();
  return Response.json(users);
}) as any;
