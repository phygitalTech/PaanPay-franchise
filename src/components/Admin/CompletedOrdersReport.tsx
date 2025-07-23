/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {useGetReportData} from '@/lib/react-query/Admin/merchant';
import {useAuthContext} from '@/context/AuthContext';
import GenericTables, {Column} from '@/components/Forms/Table/GenericTables';
import GenericTable from '../Forms/Table/GenericTable';
import {useGetCompletedOrderDetails} from '@/lib/react-query/Admin/dashboard';
import {useGetMerchant} from '@/lib/react-query/Admin/customer';

const CompletedOrdersReport = () => {
  const [total, setTotal] = useState(0);
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const {user} = useAuthContext();

  const {data: completeOrders} = useGetCompletedOrderDetails(user?.id!);
  const {data: AllMerchant} = useGetMerchant(user?.id!);
  console.log('merchant', AllMerchant);
  console.log('completed', completeOrders);
  const [fromValue, setFromValue] = useState<number | string>('');
  const [toValue, setToValue] = useState<number | string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  //   const tableData =
  //     merchantData?.data
  //       .flatMap((merchant) =>
  //         merchant.completeOrders.flatMap((order) => {
  //           const orderDate = new Date(order.orderedAt);
  //           const extras = order.orderProduct.flatMap(
  //             (p) => p.orderExtraItems || [],
  //           );
  //           const extraTotal = extras.reduce(
  //             (sum, e) => sum + e.ExtraItems.price,
  //             0,
  //           );
  //           const basePrice = order.price || 0;
  //           const subtotal = basePrice + extraTotal;

  //           if (
  //             (selectedMerchant !== 'all' &&
  //               merchant.merchantId !== selectedMerchant) ||
  //             (selectedStatus !== 'all' &&
  //               order.status.toLowerCase() !== selectedStatus.toLowerCase()) ||
  //             (dateFrom && orderDate < new Date(dateFrom)) ||
  //             (dateTo && orderDate > new Date(dateTo)) ||
  //             (fromValue && subtotal < Number(fromValue)) ||
  //             (toValue && subtotal > Number(toValue))
  //           ) {
  //             return [];
  //           }

  //           return order.orderProduct.map((p) => {
  //             const productExtras = p.orderExtraItems || [];
  //             const extraPrice = productExtras.reduce(
  //               (sum, e) => sum + e.ExtraItems.price,
  //               0,
  //             );
  //             const rowSubtotal = (order.price || 0) + extraPrice;

  //             return {
  //               orderId: order.orderId,
  //               merchantName: merchant.merchantDetails.Fullname,
  //               customerName: order.customer.Fullname,
  //               orderedAt: new Date(order.orderedAt).toLocaleString(),
  //               status: order.status || 'N/A',
  //               paymentType: order.paymentType,
  //               productName: p.product.name,
  //               sizeName: p.productSize?.name || 'N/A',
  //               quantity: p.quantity,
  //               extras:
  //                 productExtras.length > 0
  //                   ? productExtras
  //                       .map(
  //                         (e) => `${e.ExtraItems.name} (+₹${e.ExtraItems.price})`,
  //                       )
  //                       .join(', ')
  //                   : '—',
  //               subtotal: rowSubtotal,
  //             };
  //           });
  //         }),
  //       )
  //       ?.flat() || [];

  const tableData =
    completeOrders?.data?.completeOrders?.flatMap((order) => {
      const orderDate = new Date(order.orderedAt);
      const extras =
        order.orderProduct?.flatMap((p) => p.orderExtraItems || []) || [];
      const extraTotal = extras.reduce((sum, e) => sum + e.ExtraItems.price, 0);
      const basePrice = order.price || 0;
      const subtotal = basePrice + extraTotal;

      // Filtering
      if (
        (selectedMerchant !== 'all' && order.merchantId !== selectedMerchant) ||
        (selectedStatus !== 'all' &&
          order.status.toLowerCase() !== selectedStatus.toLowerCase()) ||
        (dateFrom && orderDate < new Date(dateFrom)) ||
        (dateTo && orderDate > new Date(dateTo)) ||
        (fromValue && subtotal < Number(fromValue)) ||
        (toValue && subtotal > Number(toValue))
      ) {
        return [];
      }

      // Map each product in the order
      return order.orderProduct.map((p) => {
        const productExtras = p.orderExtraItems || [];
        const extraPrice = productExtras.reduce(
          (sum, e) => sum + e.ExtraItems.price,
          0,
        );
        const rowSubtotal = (order.price || 0) + extraPrice;

        return {
          orderId: order.orderId,
          merchantName: order?.merchant?.user?.Fullname || 'N/A',
          customerName: order?.customer?.Fullname || 'N/A',
          orderedAt: orderDate.toLocaleString(),
          status: order.status || 'N/A',
          paymentType: order.paymentType || 'N/A',
          productName: p.product?.name || 'N/A',
          sizeName: p.productSize?.name || 'N/A',
          quantity: p.quantity,
          extras:
            productExtras.length > 0
              ? productExtras
                  .map((e) => `${e.ExtraItems.name} (+₹${e.ExtraItems.price})`)
                  .join(', ')
              : '—',
          subtotal: rowSubtotal,
        };
      });
    }) || [];

  useEffect(() => {
    const totalSum = tableData.reduce(
      (acc, item) => acc + (Number(item.subtotal) || 0),
      0,
    );
    setTotal(totalSum);
  }, [tableData]);

  const columns: Column<any>[] = [
    {header: 'Merchant', accessor: 'merchantName'},
    {header: 'Customer', accessor: 'customerName'},
    {header: 'Ordered At', accessor: 'orderedAt'},
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`rounded-md px-2 py-1 text-sm font-semibold ${
            row.status === ''
              ? 'bg-yellow-100 text-yellow-700'
              : row.status === 'SUCCESSFUL'
                ? 'bg-green-100 text-green-700'
                : row.status === 'CANCELED'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {header: 'Payment', accessor: 'paymentType'},
    {header: 'Product', accessor: 'productName'},
    {header: 'Size', accessor: 'sizeName'},
    {header: 'Qty', accessor: 'quantity'},
    {header: 'Extras', accessor: 'extras'},
    {
      header: 'Subtotal',
      accessor: 'subtotal',
      cell: (row) => `₹${row.subtotal}`,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="merchantFilter"
            className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium"
          >
            Merchant:
          </label>
          <select
            id="merchantFilter"
            onChange={(e) => setSelectedMerchant(e.target.value)}
            className="h-10 w-48 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="all">All</option>
            {AllMerchant?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.user.Fullname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="statusFilter"
            className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium"
          >
            Status:
          </label>
          <select
            id="statusFilter"
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 w-48 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="all">All</option>
            <option value="SUCCESSFUL">SUCCESSFUL</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            Amount (From - To):
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              className="h-10 w-24 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={toValue}
              onChange={(e) => setToValue(Number(e.target.value))}
              className="h-10 w-24 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            Date (From - To):
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-10 w-40 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-10 w-40 rounded-md border border-stroke bg-white px-3 py-2 text-sm focus:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="rounded-md bg-white shadow dark:bg-boxdark">
        <GenericTable
          data={tableData}
          columns={columns}
          itemsPerPage={50}
          searchAble
          title="All Completed Orders"
        />
      </section>

      {/* Total */}
      <div className="text-right text-base font-semibold dark:text-white">
        Total: ₹{total}
      </div>
    </div>
  );
};

export default CompletedOrdersReport;
