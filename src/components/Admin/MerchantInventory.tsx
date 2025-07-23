/* eslint-disable */
import React from 'react';
import {useNavigate} from '@tanstack/react-router';
import {FiEdit, FiTrash} from 'react-icons/fi';

import {useAuthContext} from '@/context/AuthContext';
import {useGetMerchant} from '@/lib/react-query/Admin/customer';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';

const MerchantInventory = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const admin_id = user?.id;

  const {data: allMerchant = []} = useGetMerchant(admin_id!);

  // ✅ Table column definitions
  const columns: Column<any>[] = [
    {
      header: 'Merchant Name',
      accessor: (item) => item?.user?.Fullname,
      render: (item) => (
        <span
          onClick={() => handleNavigate(item.id)}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {item?.user?.Fullname}
        </span>
      ),
    },
    {
      header: 'Phone',
      accessor: (item) => item?.user?.phone,
    },
    {
      header: 'Email',
      accessor: (item) => item?.user?.email,
    },
  ];

  // ✅ Click to navigate to merchant details
  const handleNavigate = (id: string) => {
    navigate({
      to: `/merchantdetail/${id}`,
    });
  };

  return (
    <div className="space-y-4">
      <GenericTable
        data={allMerchant}
        columns={columns}
        searchAble
        itemsPerPage={10}
        title="Merchant List"
      />
    </div>
  );
};

export default MerchantInventory;
