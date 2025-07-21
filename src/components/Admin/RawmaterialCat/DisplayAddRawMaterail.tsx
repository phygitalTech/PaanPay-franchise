// pages/Admin/DisplayAddRawMaterial.tsx
import React from 'react';
import GenericTables, {Column} from '@/components/Forms/Table/GenericTables';
import {
  useGetRawMaterialCategory,
  useDeleteRawMaterialCategory,
} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';
import {useAuthContext} from '@/context/AuthContext';

type RawMaterialCategory = {
  id: string;
  name: string;
};

const DisplayAddRawMaterial: React.FC = () => {
  const navigate = useNavigate();

  const {user} = useAuthContext();
  const admin_id = user?.id;

  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useGetRawMaterialCategory(admin_id!);

  const {mutate: deleteCategory} = useDeleteRawMaterialCategory();

  const handleDelete = (item: RawMaterialCategory) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(item.id);
    }
  };

  const handleEdit = (item: RawMaterialCategory) => {
    navigate({to: `/rawmaterial/updatecategory/${item.id}`});
  };

  const columns: Column<RawMaterialCategory>[] = [
    {
      header: 'Category Name',
      accessor: 'name',
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

  // if (isLoading) return <div>Loading...</div>;
  // if (isError)
  //   return <div>Error: {error?.message || 'Failed to load categories'}</div>;

  return (
    <div className="p-4">
      <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-bold">Raw Material Category</h1>
      </div>
      <GenericTables
        data={categoryData || []}
        columns={columns}
        itemsPerPage={5}
        searchAble={true}
      />
    </div>
  );
};

export default DisplayAddRawMaterial;
