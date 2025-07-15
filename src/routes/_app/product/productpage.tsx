import {createFileRoute} from '@tanstack/react-router';
import ProductPage from '@/pages/ProductPage';

export const Route = createFileRoute('/_app/product/productpage')({
  component: ProductPage,
});
