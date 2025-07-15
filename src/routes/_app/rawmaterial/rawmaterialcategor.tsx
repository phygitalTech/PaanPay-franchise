import {createFileRoute} from '@tanstack/react-router';
import RawMaterial from '@/pages/RawMaterial';

export const Route = createFileRoute('/_app/rawmaterial/rawmaterialcategor')({
  component: RawMaterial,
});
