import ProductCategoryPage from '@/pages/ProductCategoryPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/productcategory/productcategory')({
  component: () => <ProductCategoryPage />,
});
