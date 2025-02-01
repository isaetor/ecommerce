import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'ثبت نام',
};

const RegisterPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default RegisterPage;
