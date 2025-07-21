import React, {useEffect, useState} from 'react';
import {useGetReportData} from '@/lib/react-query/Admin/merchant';
import {MerchantData as MerchantDataType} from './../types/report';

const Reports = () => {
  const [total, setTotal] = useState(0);
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const {data: merchantData, isLoading} = useGetReportData();
  const data: MerchantDataType | undefined = merchantData;
  const [fromValue, setFromValue] = useState<number | string>('');
  const [toValue, setToValue] = useState<number | string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Calculate total
  useEffect(() => {
    if (!data) return;

    const normalizedStatus = selectedStatus.toLowerCase();
    let newTotal = 0;

    data.merchants.forEach((merchant) => {
      if (
        selectedMerchant !== 'all' &&
        merchant.merchantId !== selectedMerchant
      )
        return;

      merchant.orders.forEach((order) => {
        if (
          normalizedStatus !== 'all' &&
          order.status.toLowerCase() !== normalizedStatus
        )
          return;

        const orderDate = new Date(order.orderedAt);
        if (
          (dateFrom && orderDate < new Date(dateFrom)) ||
          (dateTo && orderDate > new Date(dateTo))
        )
          return;

        const basePrice = order.price || 0;
        const extras = order.orderProduct.flatMap(
          (p) => p.orderExtraItems || [],
        );
        const extraTotal = extras.reduce(
          (sum, e) => sum + e.ExtraItems.price,
          0,
        );
        const subtotal = basePrice + extraTotal;

        if (
          (fromValue && subtotal < Number(fromValue)) ||
          (toValue && subtotal > Number(toValue))
        )
          return;

        newTotal += subtotal;
      });
    });

    setTotal(newTotal);
  }, [
    data,
    selectedMerchant,
    selectedStatus,
    fromValue,
    toValue,
    dateFrom,
    dateTo,
  ]);

  // Render Table Rows
  const renderTable = () => {
    if (!data) return null;

    const rows: JSX.Element[] = [];

    data.merchants.forEach((merchant) => {
      if (
        selectedMerchant !== 'all' &&
        merchant.merchantId !== selectedMerchant
      )
        return;

      merchant.orders.forEach((order) => {
        if (
          selectedStatus !== 'all' &&
          order.status.toLowerCase() !== selectedStatus.toLowerCase()
        )
          return;

        const orderDate = new Date(order.orderedAt);
        if (
          (dateFrom && orderDate < new Date(dateFrom)) ||
          (dateTo && orderDate > new Date(dateTo))
        )
          return;

        order.orderProduct.forEach((p, index) => {
          const extras = p.orderExtraItems || [];
          const extraTotal = extras.reduce(
            (sum, e) => sum + e.ExtraItems.price,
            0,
          );
          const basePrice = order.price || 0;
          const subtotal = basePrice + extraTotal;

          if (
            (fromValue && subtotal < Number(fromValue)) ||
            (toValue && subtotal > Number(toValue))
          )
            return;

          rows.push(
            <tr
              key={`${order.orderId}-${index}`}
              className="even:bg-gray-50 hover:bg-gray-100 transition dark:even:bg-boxdark-2 dark:hover:bg-graydark"
            >
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {order.orderId}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {merchant.merchantDetails.Fullname}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {order.customer.Fullname}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {new Date(order.orderedAt).toLocaleString()}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                <span
                  className={`rounded-md px-2 py-1 text-sm font-semibold ${
                    order.status === ''
                      ? 'bg-yellow-100 text-yellow-700'
                      : order.status === 'SUCCESSFUL'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'CANCELED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {order.status || 'N/A'}
                </span>
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {order.paymentType}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {p.product.name}
              </td>
              <td className="bborder border-stroke px-4 py-3 dark:border-strokedark">
                {p.productSize?.name || 'N/A'}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {p.quantity}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                {extras.length > 0
                  ? extras
                      .map(
                        (e) => `${e.ExtraItems.name} (+₹${e.ExtraItems.price})`,
                      )
                      .join(', ')
                  : '—'}
              </td>
              <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                ₹{subtotal}
              </td>
            </tr>,
          );
        });
      });
    });

    return rows;
  };

  // if (isLoading)
  //   return (
  //     <div className="text-gray-500 p-4 text-center">
  //       Loading report data...
  //     </div>
  //   );
  // if (!data)
  //   return (
  //     <div className="p-4 text-center text-red-500">Failed to load data.</div>
  //   );

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-semibold leading-tight">
          All Orders Report
        </h1>
        <p className="text-sm opacity-90">Filter and review merchant orders</p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-6">
        {/* Merchant Filter */}
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
            className="h-10 w-48 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="all">All</option>
            {data?.merchants.map((merchant) => (
              <option key={merchant.merchantId} value={merchant.merchantId}>
                {merchant.merchantDetails.Fullname}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
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
            className="h-10 w-48 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="all">All</option>
            <option value="SUCCESSFUL">SUCCESSFUL</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>

        {/* From-To Value Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            Amount (From - To):
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              id="fromValue"
              placeholder="Min"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              className="h-10 w-24 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
            <input
              type="number"
              id="toValue"
              placeholder="Max"
              value={toValue}
              onChange={(e) => setToValue(Number(e.target.value))}
              className="h-10 w-24 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>

        {/* From-To Date Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
            Date (From - To):
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-10 w-40 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-10 w-40 rounded-md border border-stroke bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-strokedark dark:bg-boxdark dark:text-white"
            />
          </div>
        </div>
      </div>

      <section className="rounded-md bg-white shadow dark:bg-boxdark">
        <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
          <table className="min-w-full text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="dark:bg-meta-4 [&_th]:border [&_th]:border-neutral-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-center [&_th]:dark:border-strokedark [&_th]:dark:text-white">
                {[
                  'Order ID',
                  'Merchant',
                  'Customer',
                  'Ordered At',
                  'Status',
                  'Payment',
                  'Product',
                  'Size',
                  'Qty',
                  'Extras',
                  'Subtotal',
                ].map((heading) => (
                  <th key={heading}>{heading}</th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-800 dark:text-gray-100 text-center">
              {renderTable()}
            </tbody>
          </table>
        </div>
      </section>

      {/* Total */}
      <div className="text-right text-base font-semibold dark:text-white">
        Total: ₹{total}
      </div>
    </div>
  );
};

export default Reports;
