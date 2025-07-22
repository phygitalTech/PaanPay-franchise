import Reports from '@/components/Reports';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/')({
  component: Reports,
});
