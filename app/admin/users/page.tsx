import AdminLayout from '@/components/admin/AdminLayout';

import Users from './Users';

export const metadata = {
  title: 'مدیریت کاربران',
};
const AdminUsersPage = () => {
  return (
    <AdminLayout activeItem='users'>
      <Users />
    </AdminLayout>
  );
};

export default AdminUsersPage;
