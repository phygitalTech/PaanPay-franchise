import GenericTables, {Column} from '@/components/Forms/Table/GenericTables';
import {useAuthContext} from '@/context/AuthContext';
import {
  useDeleteProductCat,
  useGetAllProductCat,
} from '@/lib/react-query/Admin/ProductCat';
import {useNavigate} from '@tanstack/react-router';
import React from 'react';
import toast from 'react-hot-toast';
import {FiBox} from 'react-icons/fi';

export type ProductCatPayload = {
  id: string;
  name: string;
  description: string;
  image?: string;
};

const DisplayProductCategory = () => {
  const {user} = useAuthContext();
  const adminId = user?.id;
  const Navigate = useNavigate();
  const {
    data: productCatData,
    isLoading,
    isError,
    error,
  } = useGetAllProductCat(adminId!);
  console.log('productCat:', productCatData);
  const {mutate: deleteProductCat} = useDeleteProductCat();

  const handleDelete = async (item: ProductCatPayload) => {
    if (window.confirm('Are you sure you want to delete this extra item?')) {
      deleteProductCat(item.id, {
        onSuccess: () => {
          toast.success('Deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete.');
        },
      });
    }
  };

  const handleEdit = (item: ProductCatPayload) => {
    Navigate({to: `/productcategory/updateproductcategory/${item.id}`});
  };

  const columns: Column<ProductCatPayload>[] = [
    {header: 'Name', accessor: 'name'},
    {header: 'Description', accessor: 'description'},

    {
      header: 'Image',
      accessor: 'imageUrl',
      cell: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="mx-auto h-12 w-12 rounded object-cover"
          />
        ) : (
          <div className="bg-gray-100 mr-4 flex h-16 w-16 items-center justify-center rounded-lg">
            <FiBox size={24} className="text-gray-400" />
          </div>
        ),
    },
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

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error)?.message}</p>;

  return (
    <div className="p-4">
      <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-bold">Product Category List</h1>
      </div>
      <GenericTables
        data={productCatData?.categories || []}
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

export default DisplayProductCategory;
