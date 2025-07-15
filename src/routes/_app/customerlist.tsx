import CustomerList from '@/components/CustomerList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/customerlist')({
  component: () => <CustomerList />,
});
