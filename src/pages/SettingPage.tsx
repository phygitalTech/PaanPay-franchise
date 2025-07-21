import {useAuthContext} from '@/context/AuthContext';
import {
  useGetProductCreationStatus,
  useSaveProductCreationStatus,
} from '@/lib/react-query/Admin/products';
import React, {useState} from 'react';

const SettingPage = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  const {data: status} = useGetProductCreationStatus(admin_id!);
  const {mutateAsync: saveStatus} = useSaveProductCreationStatus(admin_id!);
  console.log('status', status?.data?.status);
  const [enabled, setEnabled] = useState(status?.data?.status);

  const onSubmit = () => {
    saveStatus({status: enabled});
  };

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-xl border border-stroke bg-white p-6 shadow-lg">
        {enabled ? (
          <p className="text-gray-800 text-lg font-semibold">
            Product Creation Allowed
          </p>
        ) : (
          <p className="text-gray-800 text-lg font-semibold">
            Product Creation Restricted
          </p>
        )}

        {/* Toggle Switch */}
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className="peer sr-only"
          />
          <div className="peer h-6 w-12 rounded-full bg-red-700 transition-colors duration-300 peer-checked:bg-green-700"></div>
          <div className="absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>

        {/* Save Button */}
        <button
          className="w-full rounded-md bg-blue-700 py-2 text-white transition hover:bg-blue-800"
          onClick={() => onSubmit()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
