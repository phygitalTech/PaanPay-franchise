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
  console.log('merchantttt', merchant);

  console.log('adminId', adminId);
  console.log('merchantId', merchantId);
  console.log('totalBillAmt', totalBillAmt);
  console.log('RawMaterialArray', RawMaterialArray);

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

  console.log('Formateddd', formattedData);
  return (
    <div className="space-y-6 rounded-md bg-white p-6 shadow-md">
      <div ref={printRef}>
        <h2 className="text-gray-800 text-center text-2xl font-semibold">
          Bill
        </h2>

        {/* Admin + Merchant Row */}
        <div className="flex items-start justify-between pb-2">
          {/* Admin Name */}
          <div className="text-gray-600 text-sm">
            <p className="font-medium">Admin:</p>
            <p className="font-semibold">{user?.Fullname}</p>
          </div>

          {/* Merchant Info */}
          <div className="text-gray-600 space-y-1 text-right text-sm">
            <p className="font-semibold">
              <span className="font-medium">Merchant Name:</span>{' '}
              {merchant?.data?.user?.Fullname || '-'}
            </p>
            <p className="font-semibold">
              <span className="font-medium">Email:</span>{' '}
              {merchant?.data?.user?.email || '-'}
            </p>
            <p className="font-semibold">
              <span className="font-medium">Phone:</span>{' '}
              {merchant?.data?.user?.phone || '-'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full table-auto border border-stroke">
            <thead className="border border-stroke text-left text-sm font-medium text-neutral-600">
              <tr>
                <th className="px-4 py-2">Raw Material Name</th>
                <th className="px-4 py-2">Price (1 item)</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {formattedData?.map((item, index) => (
                <tr key={index} className="border border-stroke">
                  <td className="px-4 py-2">{item.rawMaterialName}</td>
                  <td className="px-4 py-2">₹{item.sellPrice}</td>
                  <td className="px-4 py-2">×</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">
                    ₹{item.sellPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Bill Amount */}
        <div className="flex justify-end pt-4">
          <div className="text-gray-800 text-lg font-semibold">
            Total Bill Amount: ₹{totalBillAmt}
          </div>
        </div>
      </div>
      {/* Heading */}

      {/* Submit Button */}
      <div className="mt-2 flex justify-end gap-4">
        <button
          className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          onClick={onSubmit}
        >
          Submit
        </button>

        <button
          className="flex items-center rounded-md bg-emerald-600 p-2 text-sm font-semibold text-white hover:bg-emerald-700"
          onClick={handlePrint}
        >
          <IoDocumentOutline className="mr-2" size={20} /> Download
        </button>
      </div>
    </div>
  );
};

export default Billing;
