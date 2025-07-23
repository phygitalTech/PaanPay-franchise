/* eslint-disable */
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from '@tanstack/react-router';

import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useAuthContext} from '@/context/AuthContext';
import {
  useDeletePurchaseRequest,
  useGetPurchaseRequest,
} from '@/lib/react-query/Admin/Purchase/purchaseMutation';
import {FiTrash} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';

const PurchaseRequest = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const methods = useForm();

  const {data = [], isLoading, isError} = useGetPurchaseRequest(user?.id!);
  console.log('data', data);
  const {deletePurchase} = useDeletePurchaseRequest();

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'}); // "July"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function formatTime(isoDate: string): string {
    const date = new Date(isoDate);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  const columns: Column<any>[] = [
    {
      header: 'Merchant Name',
      accessor: (row) => row?.merchant?.user?.Fullname || 'N/A',
    },
    {
      header: 'Mobile Number',
      accessor: (row) => row?.merchant?.user?.phone || 'N/A',
    },
    {
      header: 'Date',
      accessor: (row) => formatDate(row?.createdAt) || 'N/A',
    },
    {
      header: 'Time',
      accessor: (row) => formatTime(row?.createdAt) || 'N/A',
    },
  ];

  return (
    <FormProvider {...methods}>
      <form>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
          {/* Table */}
          <GenericTable
            data={data}
            columns={columns}
            paginationOff
            searchAble
            title="Purchase Requests"
            action
            onDelete={(row) => deletePurchase(row?.id)}
            onView={(row) =>
              navigate({to: `/request/purchaseaccept/${row?.id}`})
            }
            className="rounded-md bg-white shadow dark:bg-boxdark"
          />

          {/* No data fallback */}
          {data.length === 0 && (
            <div className="text-gray-600 dark:text-gray-300 mt-6 text-center">
              No purchase requests available.
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PurchaseRequest;
