import Billing from '@/components/Admin/Billing';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/merchantbill')({
  component: () => <Billing />,
});
