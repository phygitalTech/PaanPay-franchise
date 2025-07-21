import React from 'react';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {
  useGetExtraItemsData,
  useDeleteExtraItem,
} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';
import toast from 'react-hot-toast';
import GenericTables from '@/components/Forms/Table/GenericTables';
import {useAuthContext} from '@/context/AuthContext';

interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

const DisplayExtraItem: React.FC = () => {
  const {user} = useAuthContext();
  const adminId = user?.id;
  const Navigate = useNavigate();
  const {
    data: extraItemsData,
    isLoading,
    isError,
    error,
  } = useGetExtraItemsData(adminId!);
  console.log('Extra Items Data:', extraItemsData);
  const {mutate: deleteExtraItem} = useDeleteExtraItem();

  const handleDelete = async (item: ExtraItem) => {
    if (window.confirm('Are you sure you want to delete this extra item?')) {
      deleteExtraItem(item.id, {
        onSuccess: () => {
          toast.success('Deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete.');
        },
      });
    }
  };

  const handleEdit = (item: ExtraItem) => {
    Navigate({to: `/rawmaterial/extraitemupdate/${item.id}`});
  };

  const columns: Column<ExtraItem>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Price', accessor: 'price'},
    {
      header: 'Action',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <button
            className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  console.log('Extra Items Fetched:', extraItemsData);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error)?.message}</p>;

  return (
    <div className="p-4">
      <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-bold">Extra Items List</h1>
      </div>
      <GenericTables
        data={extraItemsData || []}
        columns={columns}
        itemsPerPage={5}
        action={true}
        onEdit={handleEdit}
        onDelete={(rowIndex) => handleDelete(rowIndex)}
        searchAble={true}
      />
    </div>
  );
};

export default DisplayExtraItem;
