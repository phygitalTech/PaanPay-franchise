import Reports from '@/components/Reports';
import {Home} from '@/pages';
import AdminDashboard from '@/pages/Home';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/')({
  component: () => <AdminDashboard />,
});
