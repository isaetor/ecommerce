'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get('callbackUrl') || '/';

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=حساب کاربری ایجاد شده است`,
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'ایمیل تکراری است'
          : err.message;
      toast.error(error || 'error');
    }
  };

  return (
    <div className='card mx-auto my-8 max-w-sm bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>ثبت نام</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-2'>
            <label className='label' htmlFor='name'>
              نام
            </label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'نام الزامی است',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.name?.message && (
              <div className='text-error mt-2'>{errors.name.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='email'>
              ایمیل
            </label>
            <input
              type='text'
              id='email'
              {...register('email', {
                required: 'ایمیل الزامی است',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'ایمیل نامعتبر است',
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.email?.message && (
              <div className='text-error mt-2'> {errors.email.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='password'>
              کلمه عبور
            </label>
            <input
              type='password'
              id='password'
              {...register('password', {
                required: 'کلمه عبور الزامی است',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.password?.message && (
              <div className='text-error mt-2'>{errors.password.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='confirmPassword'>
              تکرار کلمه عبور
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword', {
                required: 'تکرا کلمه عبور الزامی است',
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'رمزهای عبور باید مطابقت داشته باشند!';
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.confirmPassword?.message && (
              <div className='text-error mt-2'>{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className='my-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'
            >
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              ثبت نام
            </button>
          </div>
        </form>

        <div>
        از قبل حساب کاربری دارید؟{' '}
          <Link className='link' href={`/signin?callbackUrl=${callbackUrl}`}>
          وارد شوید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
