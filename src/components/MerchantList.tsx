/*eslint-disable*/

import {useAuthContext} from '@/context/AuthContext';
import {useGetMerchant} from '@/lib/react-query/Admin/customer';
import React from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';

const MerchantList = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  const {data: allMerchant} = useGetMerchant(admin_id!);

  console.log('merchant', allMerchant);

  return (
    <div className="space-y-4">
      <header className="rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-semibold leading-tight">Merchant List</h1>
        <p className="text-sm opacity-90">Manage your Merchants</p>
      </header>
      <section className="rounded-md bg-white shadow">
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="dark:bg-meta-4 [&_th]:border [&_th]:border-neutral-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:dark:border-strokedark [&_th]:dark:text-white">
                {/* <th>#</th> */}
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody className="[&_td]:border [&_td]:border-neutral-200 [&_td]:px-4 [&_td]:py-2">
              {allMerchant?.map((each: any) => (
                <tr
                  // key=1
                  className="hover:bg-gray-50 even:bg-gray-50/50 odd:bg-white"
                >
                  {/* <td>{index + 1}</td> */}
                  <td className="whitespace-nowrap">{each?.user?.Fullname}</td>

                  <td>{each?.user?.phone}</td>
                  <td>{each?.user?.email}</td>
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
