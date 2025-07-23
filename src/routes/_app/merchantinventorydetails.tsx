import MerchantInventory from '@/components/Admin/MerchantInventory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/merchantinventorydetails')({
  component: () => <MerchantInventory />,
});
