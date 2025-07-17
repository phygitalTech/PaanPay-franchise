import {createFileRoute} from '@tanstack/react-router';
import Rawmaterial from '@/pages/RawMaterial';

export const Route = createFileRoute('/_app/rawmaterial/rawmaterial')({
  component: Rawmaterial,
});
