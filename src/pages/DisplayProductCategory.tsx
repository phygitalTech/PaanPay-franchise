import GenericTable from '@/components/Forms/Table/GenericTable';
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
      render: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="h-12 w-12 justify-center rounded object-cover"
        />
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error)?.message}</p>;

  return (
    <div className="mt-4">
      <GenericTable
        data={productCatData?.categories || []}
        columns={columns}
        itemsPerPage={5}
        action={true}
        title="Product Category List"
        onEdit={handleEdit}
        onDelete={(rowIndex) => handleDelete(rowIndex)}
        searchAble={true}
      />
    </div>
  );
};

export default DisplayProductCategory;
