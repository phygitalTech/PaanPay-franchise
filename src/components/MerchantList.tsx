{
  /* eslint-disable */
}

import React from 'react';
import {useAuthContext} from '@/context/AuthContext';
import {useGetMerchant} from '@/lib/react-query/Admin/customer';
import {useNavigate} from '@tanstack/react-router';
import {FiEdit, FiTrash} from 'react-icons/fi';

const MerchantList = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const admin_id = user?.id;

  const {data: allMerchant} = useGetMerchant(admin_id!);

  const handleNavigate = (id: string) => {
    navigate({
      to: `/merchantdetail/${id}`,
    });
  };

  return (
    <div className="space-y-4">
      <header className="rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-semibold leading-tight">Merchant List</h1>
        <p className="text-sm opacity-90">Manage your Merchants</p>
      </header>

      <section className="rounded-md bg-white shadow dark:bg-boxdark">
        <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="dark:bg-meta-4">
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                  Merchant Name
                </th>
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                  Phone
                </th>
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-100">
              {allMerchant?.map((each: any, index: number) => (
                <tr
                  key={index}
                  className="even:bg-gray-50 hover:bg-gray-100 transition dark:even:bg-boxdark-2 dark:hover:bg-graydark"
                >
                  <td
                    className="cursor-pointer whitespace-nowrap border border-stroke px-4 py-3 text-center text-blue-500 hover:underline dark:border-strokedark"
                    onClick={() => handleNavigate(each?.id)}
                  >
                    {each?.user?.Fullname}
                  </td>
                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.user?.phone}
                  </td>
                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.user?.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MerchantList;
