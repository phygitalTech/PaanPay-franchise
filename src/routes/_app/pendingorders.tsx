import PendingOrdersReport from '@/components/Admin/PendingOrdersReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/pendingorders')({
  component: () => <PendingOrdersReport />,
});
