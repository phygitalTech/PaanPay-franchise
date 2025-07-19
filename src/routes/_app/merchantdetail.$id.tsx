import MerchantDetailed from '@/pages/MerchantDetailed';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/merchantdetail/$id')({
  component: () => <MerchantDetailed />,
});
