'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { User } from '@/lib/models/UserModel';
import { formatId } from '@/lib/utils';

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading('در حال حذف کاربر ...');
      const res = await fetch(`${url}/${arg.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('کاربر با موفقیت حذف شد', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );
  if (error) return 'خطایی رخ داده است.';
  if (!users) return 'در حال بارگذاری ...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>کاربران</h1>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>ایمیل</th>
              <th>دسترسی ادمین</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{formatId(user._id)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'فعال' : 'غیر فعال'}</td>

                <td>
                  <Link
                    href={`/admin/users/${user._id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    ویرایش
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteUser({ userId: user._id })}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
