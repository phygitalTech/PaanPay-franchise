import {createFileRoute} from '@tanstack/react-router';
import AddRawMaterialPage from '@/pages/AddRawMaterialPage';

export const Route = createFileRoute('/_app/rawmaterial/addrawmaterial')({
  component: AddRawMaterialPage,
});
