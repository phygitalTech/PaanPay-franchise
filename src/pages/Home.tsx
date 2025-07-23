/*eslint-disable*/
import React, {useEffect, useState} from 'react';

import {
  FiUsers,
  FiUserCheck,
  FiBox,
  FiDollarSign,
  FiAlertTriangle,
  FiX,
  FiTag,
  FiShoppingBag,
} from 'react-icons/fi';
import dayjs from 'dayjs';
import {Link} from '@tanstack/react-router';
import {useGetDashboardDetails} from '@/lib/react-query/Admin/dashboard';
import {useAuthContext} from '@/context/AuthContext';
import {BsCartCheck, BsCheckCircle} from 'react-icons/bs';
import {LuClock3} from 'react-icons/lu';

const AdminDashboard = () => {
  const {user} = useAuthContext();
  const {data, isLoading} = useGetDashboardDetails(user?.id!);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  const cards = [
    {
      label: 'Total Customers',
      value: data?.data?.totalCustomers,
      icon: <FiUsers className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100 text-blue-800',
      link: '/customerlist',
    },
    {
      label: 'Total Merchants',
      value: data?.data?.totalMerchants,
      icon: <FiUserCheck className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100 text-green-800',
      link: '/merchantlist',
    },
    {
      label: 'Total Orders',
      value: data?.data?.totalOrders,
      icon: <FiBox className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-100 text-yellow-800',
      link: '/reports',
    },
    {
      label: 'Total Successful Orders',
      value: data?.data?.totalOrdersCompleted,
      icon: <BsCheckCircle className="h-8 w-8 text-green-500" />,
      color: 'bg-green-100 text-yellow-800',
      link: '/completedorders',
    },
    {
      label: 'Total Pending Orders',
      value: data?.data?.totalOrdersPending,
      icon: <LuClock3 className="h-8 w-8 text-orange-500" />,
      color: 'bg-yellow-100 text-yellow-800',
      link: '/pendingorders',
    },
    {
      label: 'Sales Report',
      value: `₹${data?.data?.totalSales}`,
      icon: <FiDollarSign className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100 text-purple-800',
      link: '/completedorders',
    },
    {
      label: 'Most Selling Category',
      value: data?.data?.mostSellingCategory,
      icon: <FiTag className="h-8 w-8 text-sky-500" />,
      color: 'bg-sky-100 text-sky-800',
    },

    {
      label: 'Most Selling Item',
      value: data?.data?.mostSellingItems,
      icon: <FiShoppingBag className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className="relative p-6">
      {/* Expiry Alert */}

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="flex h-40 items-center justify-start gap-6 rounded-md border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-slate-800"
          >
            <div className={`p-4 ${card.color} rounded-full`}>{card.icon}</div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {card.label}
              </p>
              <p className="text-gray-900 text-3xl font-bold dark:text-white">
                {card.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Today's Visits */}
    </div>
  );
};

export default AdminDashboard;
