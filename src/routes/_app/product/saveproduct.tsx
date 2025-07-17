import SaveProduct from '@/pages/SaveProduct';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/product/saveproduct')({
  component: () => <SaveProduct />,
});
