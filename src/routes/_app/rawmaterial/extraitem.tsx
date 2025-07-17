import ExtraItem from '@/components/Admin/RawmaterialCat/ExtraItem/ExtraItem';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/rawmaterial/extraitem')({
  component: ExtraItem,
});
