import MerchantList from '@/components/MerchantList';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/merchantlist')({
  component: () => <MerchantList />,
});
