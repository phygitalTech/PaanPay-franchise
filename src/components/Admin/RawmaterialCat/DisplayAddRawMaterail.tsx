import React from 'react';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {
  useGetRawMaterialCategory,
  useDeleteRawMaterialCategory,
} from '@/lib/react-query/Admin/rawmaterial';
import {Navigate} from '@tanstack/react-router';
import {useNavigate} from '@tanstack/react-router';

type RawMaterialCategory = {
  id: string;
  name: string;
};

const DisplayAddRawMaterial: React.FC = () => {
  const Navigate = useNavigate();
  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useGetRawMaterialCategory();
  const {mutate: deleteCategory} = useDeleteRawMaterialCategory();

  const columns: Column<RawMaterialCategory>[] = [
    {
      header: 'Category Name',
      accessor: 'name',
      sortable: true,
    },
  ];

  const handleDelete = (item: RawMaterialCategory) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(item.id);
    }
  };

  const handleEdit = (item: RawMaterialCategory) => {
    Navigate({to: `/rawmaterial/updatecategory/${item.id}`});
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {error?.message || 'Failed to load categories'}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Raw Material Category List</h2>
      <GenericTable
        data={categoryData || []}
        columns={columns}
        itemsPerPage={5}
        searchAble={true}
        action={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DisplayAddRawMaterial;
