import UpdateCategory from '@/components/Admin/RawmaterialCat/UpdateCategory';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/rawmaterial/updatecategory/$id')({
  component: () => <UpdateCategory />,
});
