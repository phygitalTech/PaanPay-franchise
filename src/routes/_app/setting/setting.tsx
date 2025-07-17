import SettingPage from '@/pages/SettingPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/setting/setting')({
  component: () => <SettingPage />,
});
