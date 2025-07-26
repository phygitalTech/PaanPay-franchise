/*eslint-disable*/

import {useRouterState} from '@tanstack/react-router';
import React, {useRef} from 'react';
import GenericTable, {Column} from '../Forms/Table/GenericTable';
import {
  useGetMerchantById,
  useSubmitMerchantInventory,
} from '@/lib/react-query/Admin/merchant';
import {useAuthContext} from '@/context/AuthContext';
import {useReactToPrint} from 'react-to-print';
import {FaFilePdf} from 'react-icons/fa6';
import {AiFillFilePdf} from 'react-icons/ai';
import {IoDocumentOutline} from 'react-icons/io5';
import {useGetProfile} from '@/lib/react-query/Admin/profile';

type RawMaterialItem = {
  rawMaterialId: string;
  rawMaterialName: string;
  sellPrice: number;
  unit: string;
  inventory: string;
  quantity: number;
};

export type inventory = {
  id: string;
  rawMaterialName: string;
  sellPrice: number;
  quantity: number;
  total: number;
};

export type rawMaterial = {};

const columns: Column<inventory>[] = [
  {header: 'Raw Material Name', accessor: 'rawMaterialName'},
  {header: 'Price (1 item)', accessor: 'sellPrice'},
  {
    header: '',
    accessor: 'multiplication',
    render: (row) => <p className="text-gray-600">×</p>,
  },
  {header: 'Quantity', accessor: 'quantity'},
  {
    header: 'Total',
    accessor: 'total',
    render: (row) => <p>{row.total}</p>,
  },
];

const Billing = () => {
  const {user} = useAuthContext();

  console.log('userrr', user);
  const {location} = useRouterState();

  const {adminId, merchantId, totalBillAmt, RawMaterialArray} =
    location.state as {
      adminId: string;
      merchantId: string;
      totalBillAmt: number;
      RawMaterialArray: RawMaterialItem[];
    };
  const {mutateAsync: submitMerchantInventory, isPending} =
    useSubmitMerchantInventory();
  const {data: merchant} = useGetMerchantById(merchantId);
  const {data: ProfileData} = useGetProfile(user?.id!);
  console.log('merchantttt', merchant);

  const formattedData: inventory[] =
    RawMaterialArray?.map((item: RawMaterialItem) => ({
      id: item.rawMaterialId,
      rawMaterialName: item.rawMaterialName,
      sellPrice: item.sellPrice,
      quantity: item.quantity,
      total: item.sellPrice * item.quantity,
    })) || [];

  const onSubmit = () => {
    submitMerchantInventory({
      adminId: adminId,
      items: RawMaterialArray,
      merchantId: merchantId,
      totalBillAmount: totalBillAmt,
    });
  };

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-${merchant?.data?.user?.Fullname}`,
    pageStyle: `@media print { body { -webkit-print-color-adjust: exact; } }`,
  });

  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  console.log('Formateddd', formattedData);
  return (
    <div className="bg-gray-100 flex justify-center px-2 py-10">
      <div className="w-full max-w-[794px] bg-white p-4 text-black sm:p-6 md:p-8">
        <div ref={printRef}>
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 border-b border-stroke pb-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={ProfileData?.data?.image}
                alt="User"
                className="h-full w-full object-cover"
              />
            </span>
            <h2 className="text-gray-800 text-center text-xl font-semibold sm:text-left sm:text-2xl">
              Invoice
            </h2>
            <p className="text-gray-500 text-sm">Date: {date}</p>
          </div>

          {/* Admin & Merchant Info */}
          <div className="mb-8 flex flex-col justify-between gap-6 text-sm md:flex-row">
            {/* Admin */}
            <div>
              <p>
                <span className="font-semibold">Admin Name:</span>{' '}
                {user?.Fullname || '-'}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                {user?.phone || '-'}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                {user?.email || '-'}
              </p>
            </div>

            {/* Merchant */}
            <div>
              <p className="font-semibold">Invoice To:</p>
              <p>
                <span className="font-semibold">Name:</span>{' '}
                {merchant?.data?.user?.Fullname || '-'}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                {merchant?.data?.user?.email || '-'}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{' '}
                {merchant?.data?.user?.phone || '-'}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="mb-6 w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-neutral-100 text-left">
                  <th className="px-4 py-2">Raw Material Name</th>
                  <th className="px-4 py-2">Price (1 item)</th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {formattedData?.map((item, index) => (
                  <tr key={index} className="border-b border-stroke">
                    <td className="px-4 py-2">{item.rawMaterialName}</td>
                    <td className="px-4 py-2">₹{item.sellPrice}</td>
                    <td className="px-4 py-2">×</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">₹{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-right text-base font-semibold sm:text-lg">
            Total Bill Amount: ₹{totalBillAmt}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
          <button
            onClick={onSubmit}
            className="rounded bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            Submit
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            <IoDocumentOutline size={20} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
