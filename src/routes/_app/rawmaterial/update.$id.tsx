import Updaterawmaterial from '@/components/Admin/Rawmaterial/Updaterawmaterial';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/rawmaterial/update/$id')({
  component: () => <Updaterawmaterial />,
});
