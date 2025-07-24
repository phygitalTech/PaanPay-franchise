/*eslint-disable*/

import {useAuthContext} from '@/context/AuthContext';
import {useGetProblemRequest} from '@/lib/react-query/Admin/profile';
import React from 'react';
import GenericTable, {Column} from '../Forms/Table/GenericTable';

interface merchant {}

interface user {}

interface Problem {
  id: string;
  note: string;
  address: string;
  Fullname: string;
  phone: string;
}
const HelpDesk = () => {
  const {user} = useAuthContext();
  const {data: AllProblem} = useGetProblemRequest(user?.id!);
  console.log('problem  request', AllProblem);

  const formattedData: Problem[] =
    AllProblem?.data?.map((item: any) => ({
      id: item.id,
      note: item.note,
      address: item.merchant?.address || 'N/A',
      Fullname: item.merchant?.user?.Fullname || 'N/A',
      phone: item.merchant?.user?.phone || 'N/A',
    })) || [];

  const columns: Column<Problem>[] = [
    {header: 'Name', accessor: 'note'},
    {header: 'Address', accessor: 'address'},
    {header: 'Fullname', accessor: 'Fullname'},
    {header: 'Phone', accessor: 'phone'},
  ];
  return (
    <div className="mt-4">
      <GenericTable
        data={formattedData || []}
        columns={columns}
        itemsPerPage={5}
        title="Problem Request"
        searchAble={true}
      />
    </div>
  );
};

export default HelpDesk;
