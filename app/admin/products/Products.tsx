'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';

export default function Products() {
  const { data: products, error } = useSWR(`/api/admin/products`);

  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading('در حال حذف محصول...');
      const res = await fetch(`${url}/${arg.productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('محصول با موفقیت حذف شد', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('محصول با موفقیت ایجاد شد');
      router.push(`/admin/products/${data.product._id}`);
    },
  );

  if (error) return 'خطایی رخ داده است.';
  if (!products) return 'در حال بارگذاری ...';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='py-4 text-2xl'>محصولات</h1>
        <button
          disabled={isCreating}
          onClick={() => createProduct()}
          className='btn btn-primary btn-sm'
        >
          {isCreating && <span className='loading loading-spinner'></span>}
          افزودن
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>دسته بندی</th>
              <th>موجودی انبار</th>
              <th>امتیاز</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product._id}>
                <td>{formatId(product._id!)}</td>
                <td>{product.name}</td>
                <td>{new Intl.NumberFormat("fa").format(Number(product.price))} <span>ريال</span></td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.rating}</td>
                <td>
                  <Link
                    href={`/admin/products/${product._id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    ویرایش
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteProduct({ productId: product._id! })}
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
