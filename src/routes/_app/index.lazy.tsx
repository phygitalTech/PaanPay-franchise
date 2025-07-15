import {Calendar} from '@/components/common';
import {Home} from '@/pages';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/')({
  // component: Calendar,
  component: Home,
});
