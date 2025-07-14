import {AppLayout} from '@/layouts';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});
