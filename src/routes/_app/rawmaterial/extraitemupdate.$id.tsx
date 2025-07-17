import UpdateExtraItem from '@/components/Admin/RawmaterialCat/ExtraItem/UpdateExtraItem';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/rawmaterial/extraitemupdate/$id')({
  component: () => <UpdateExtraItem />,
});
