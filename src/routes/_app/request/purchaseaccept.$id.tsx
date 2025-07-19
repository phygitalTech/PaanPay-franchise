import PurchaseAcceptPage from '@/pages/PurchaseAcceptPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/request/purchaseaccept/$id')({
  component: PurchaseAcceptPage,
});
