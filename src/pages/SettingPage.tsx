import {useAuthContext} from '@/context/AuthContext';
import {
  useGetProductCreationStatus,
  useSaveProductCreationStatus,
} from '@/lib/react-query/Admin/products';
import React, {useState, useEffect} from 'react';

const SettingPage = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  const {data: status} = useGetProductCreationStatus(admin_id!);
  const {mutateAsync: saveStatus} = useSaveProductCreationStatus(admin_id!);

  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (status?.data?.status !== undefined) {
      setEnabled(status.data.status);
    }
  }, [status]);

  const onSubmit = () => {
    saveStatus({status: enabled});
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm opacity-90">Control product creation access</p>
      </div>

      {/* Card Section */}
      <div className="mx-auto max-w-md rounded-md border border-stroke bg-white p-6 shadow dark:border-strokedark dark:bg-boxdark">
        <div className="text-gray-800 mb-4 text-center text-lg font-semibold dark:text-white">
          {enabled
            ? '✅ Product Creation Allowed'
            : '⛔ Product Creation Restricted'}
        </div>

        {/* Toggle Switch */}
        <div className="mb-6 flex items-center justify-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-12 rounded-full bg-red-600 transition-colors duration-300 peer-checked:bg-green-600"></div>
            <div className="absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={onSubmit}
          className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
