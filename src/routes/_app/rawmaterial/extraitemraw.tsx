import ExtraItemPage from '@/pages/ExtraItemPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/rawmaterial/extraitemraw')({
  component: () => <ExtraItemPage />,
});
