{
  /* eslint-disable */
}

import React from 'react';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useDeletePurchaseRequest,
  useGetPurchaseRequest,
} from '@/lib/react-query/Admin/Purchase/purchaseMutation';
import {useNavigate} from '@tanstack/react-router';
import {FormProvider, useForm} from 'react-hook-form';

const PurchaseRequest = () => {
  const navigate = useNavigate();
  const {data, isLoading, isError} = useGetPurchaseRequest('');
  const {deletePurchase} = useDeletePurchaseRequest();

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
            <h1 className="text-xl font-bold">Purchase Requests</h1>
            <p className="text-sm opacity-90">Manage your purchase requests</p>
          </div>

          {/* Table */}
          <section className="rounded-md bg-white shadow dark:bg-boxdark">
            <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
                  <tr className="dark:bg-meta-4">
                    <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                      Merchant Name
                    </th>
                    <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                      Mobile Number
                    </th>
                    <th className="border border-stroke px-4 py-3 text-center dark:border-strokedark dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-800 dark:text-gray-100">
                  {data?.map((purchase: any, index: number) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 hover:bg-gray-100 transition dark:even:bg-boxdark-2 dark:hover:bg-graydark"
                    >
                      <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                        {purchase?.merchant?.user?.Fullname || 'N/A'}
                      </td>
                      <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                        {purchase?.merchant?.user?.phone || 'N/A'}
                      </td>
                      <td className="border border-stroke px-4 py-3 text-center dark:border-strokedark">
                        <div className="flex flex-wrap justify-center gap-2">
                          <GenericButton
                            className="rounded-md bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                            onClick={() => deletePurchase(purchase.id)}
                          >
                            Delete
                          </GenericButton>
                          <GenericButton
                            className="rounded-md bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
                            onClick={() =>
                              navigate({
                                to: `/request/purchaseaccept/${purchase.id}`,
                              })
                            }
                          >
                            Accept
                          </GenericButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data?.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-gray-600 dark:text-gray-300 border border-stroke px-4 py-6 text-center dark:border-strokedark"
                      >
                        No purchase requests available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </form>
    </FormProvider>
  );
};

export default PurchaseRequest;
