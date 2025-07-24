import HelpDesk from '@/components/Admin/HelpDesk';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/helpdesk')({
  component: () => <HelpDesk />,
});
