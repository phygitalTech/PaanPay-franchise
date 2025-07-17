import UpdateProduct from '@/pages/UpdateProduct';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/product/updateproduct/$id')({
  component: () => <UpdateProduct />,
});
