// pages/Admin/DisplayAddRawMaterial.tsx
import React from 'react';
import GenericTables, {Column} from '@/components/Forms/Table/GenericTables';
import {
  useGetRawMaterialCategory,
  useDeleteRawMaterialCategory,
} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';
import {useAuthContext} from '@/context/AuthContext';
import GenericTable from '@/components/Forms/Table/GenericTable';

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
  ];

  // if (isLoading) return <div>Loading...</div>;
  // if (isError)
  //   return <div>Error: {error?.message || 'Failed to load categories'}</div>;

  return (
    <div className="p-4">
      <GenericTable
        data={categoryData || []}
        columns={columns}
        itemsPerPage={5}
        searchAble={true}
        action
        title="Raw Material Category"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DisplayAddRawMaterial;
