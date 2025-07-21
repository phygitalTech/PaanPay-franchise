/* eslint-disable */
import React from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useAuthContext} from '@/context/AuthContext';
import {useGetCustomers} from '@/lib/react-query/Admin/customer';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';

const CustomerList = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  const {data: allCustomers = []} = useGetCustomers(admin_id!);

  // 🟢 Define table columns
  const columns: Column<any>[] = [
    {
      header: 'Name',
      accessor: 'Fullname',
    },
    {
      header: 'Address',
      accessor: 'address',
      render: (item) => <span>{item.address || '-'}</span>,
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
  ];

  // 🟢 Optional Edit/Delete handlers
  const handleEdit = (item: any) => {
    console.log('Edit:', item);
  };

  const handleDelete = (item: any) => {
    console.log('Delete:', item);
  };

  return (
    <div className="space-y-4">
      <GenericTable
        data={allCustomers}
        columns={columns}
        searchAble
        itemsPerPage={10}
        title="Customer List"
      />
    </div>
  );
};

export default CustomerList;
