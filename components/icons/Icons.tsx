import { Truck, Wallet, LockKeyhole, Phone } from 'lucide-react';

const Icons = () => {
  return (
    <div className='grid grid-cols-2 gap-6 gap-x-2 md:gap-x-6 lg:grid-cols-4'>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12 rounded-md'>
        <Truck width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>ارسال رایگان</strong>
          </p>
          <p>سفارش بالای 500 هزار تومان</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12 rounded-md'>
        <Wallet width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>بازگشت وجه</strong>
          </p>
          <p>7 روز ضمانت بازگشت وجه</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12 rounded-md'>
        <LockKeyhole width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>امنیت</strong>
          </p>
          <p>درگاه پرداخت قابل اعتماد</p>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4 bg-base-300 px-4 py-8 md:px-12 rounded-md'>
        <Phone width={48} height={48} strokeWidth={1} />
        <div className='flex flex-col gap-2'>
          <p>
            <strong>پشتیبانی</strong>
          </p>
          <p>۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;
