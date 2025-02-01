'use client';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';

export default function ProductEditForm({ productId }: { productId: string }) {

  const { data: product, error } = useSWR(`/api/admin/products/${productId}`);
  const router = useRouter();

  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('محصول با موفقیت به روز شد');
      router.push('/admin/products');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    setValue('slug', product.slug);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('category', product.category);
    setValue('brand', product.brand);
    setValue('countInStock', product.countInStock);
    setValue('description', product.description);
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  if (error) return error.message;

  if (!product) return 'در حال بارگیری...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('در حال آپلود تصویر...');

    const file = e.target.files[0]
    if (!file) {
      toast.error('لطفا یک فایل را انتخاب کنید', { id: toastId, });
      return;
    }

    const s3 = new S3Client({
      region: 'default',
      endpoint: 'https://storage.iran.liara.space',
      credentials: {
        accessKeyId: '1i74eh4tpvccmhgq',
        secretAccessKey: '2d4cd5aa-141a-4c26-ba60-4483938215c0',
      },
    });
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const imageKey = `${Date.now()}_${file.name}`

    const params = {
      Bucket: 'isaetor',
      Key: imageKey,
      Body: buffer,
    };


    await s3.send(new PutObjectCommand(params));

    setValue('image', `https://isaetor.storage.iran.liara.space/${imageKey}`);
    toast.success('فایل با موفقیت آپلود شد', {
      id: toastId,
    });


  };

  return (
    <div>
      <h1 className='py-4 text-2xl'>ویرایش محصول {formatId(productId)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='نام' id='name' required />
          <FormInput name='Slug' id='slug' required />
          <FormInput name='تصویر' id='image' required />
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='imageFile'>
            آپلود تصویر
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='imageFile'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <FormInput name='قیمت' id='price' required />
          <FormInput name='دسته بندی' id='category' required />
          <FormInput name='برند' id='brand' required />
          <FormInput name='توضیحات' id='description' required />
          <FormInput name='موجودی انبار' id='countInStock' required />

          <button
            type='submit'
            disabled={isUpdating}
            className='btn btn-primary'
          >
            {isUpdating && <span className='loading loading-spinner'></span>}
            به روز رسانی
          </button>
          <Link className='btn mr-4 ' href='/admin/products'>
          انصراف
          </Link>
        </form>
      </div>
    </div>
  );
}
