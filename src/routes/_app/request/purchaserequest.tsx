import PurchaseRequest from '@/components/Admin/PurchaseRequest/PurchaseRequest';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/request/purchaserequest')({
  component: PurchaseRequest,
});
