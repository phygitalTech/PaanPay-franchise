import UpdateProductCategory from '@/pages/UpdateProductCategory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/productcategory/updateproductcategory/$id',
)({
  component: () => <UpdateProductCategory />,
});
