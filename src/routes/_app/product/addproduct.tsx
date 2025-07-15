import {createFileRoute} from '@tanstack/react-router';
import AddProductPage from '@/pages/AddProductPage';

export const Route = createFileRoute('/_app/product/addproduct')({
  component: AddProductPage,
});
