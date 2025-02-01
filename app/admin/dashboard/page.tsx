import AdminLayout from '@/components/admin/AdminLayout';

import Dashboard from './Dashboard';

export const metadata = {
  title: 'پنل ادمین',
};
const DashbaordPage = () => {
  return (
    <AdminLayout activeItem='dashboard'>
      <Dashboard />
    </AdminLayout>
  );
};

export default DashbaordPage;
