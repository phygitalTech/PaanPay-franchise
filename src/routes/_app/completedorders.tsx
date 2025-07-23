import CompletedOrdersReport from '@/components/Admin/CompletedOrdersReport';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/completedorders')({
  component: () => <CompletedOrdersReport />,
});
