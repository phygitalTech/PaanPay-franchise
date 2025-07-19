/*eslint-disable*/

import {useAuthContext} from '@/context/AuthContext';
import {useGetCustomers} from '@/lib/react-query/Admin/customer';
import React from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';

const CustomerList = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  const {data: allCustomers} = useGetCustomers(admin_id!);
  console.log('customers', allCustomers);
  return (
    <div className="space-y-4">
      <header className="rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-semibold leading-tight">Customer List</h1>
        <p className="text-sm opacity-90">Manage your customers</p>
      </header>
      <section className="rounded-md bg-white shadow">
        <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="dark:bg-meta-4">
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                  Name
                </th>
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                  Address
                </th>
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                  Phone
                </th>
                <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="dark:bg-meta-4 [&_td]:border [&_td]:border-neutral-200 [&_td]:px-4 [&_td]:py-2 [&_td]:dark:border-strokedark [&_td]:dark:text-white">
              {allCustomers?.map((each: any) => (
                <tr className="hover:bg-gray-50 even:bg-gray-50/50 outline-none transition odd:bg-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input">
                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.Fullname}
                  </td>

                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.address || '-'}
                  </td>
                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.phone}
                  </td>
                  <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                    {each?.email}
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

export default CustomerList;
