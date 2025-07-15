import Reports from '@/components/Reports';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/reports')({
  component: () => <Reports />,
});
