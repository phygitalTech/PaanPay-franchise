import React, {useEffect, useState} from 'react';
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useNavigate} from '@tanstack/react-router';
import {
  useDeleteRawMaterialCategoryAdmin,
  useGetRawMaterialCategoriesAdmin,
} from '@/lib/react-query/Admin/rawmaterial';

type RawMaterialCategoryAPI = {
  id: string;
  name: string;
};

type RawMaterialCategory = {
  id: string;
  name: string;
};

const columns: Column<RawMaterialCategory>[] = [
  {header: 'Category Name', accessor: 'name', sortable: true},
];

const DisplayRawMaterialCat: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: categoriesData,
    isError,
    isSuccess,
    error,
  } = useGetRawMaterialCategoriesAdmin('');

  const {mutate: deleteRawMaterialCategory} =
    useDeleteRawMaterialCategoryAdmin();

  useEffect(() => {
    if (isSuccess && categoriesData) {
      const transformedData = (categoriesData.data || []).map(
        (
          category: RawMaterialCategoryAPI,
          index: number,
        ): RawMaterialCategory => ({
          id: category.id,
          name: category.name,
        }),
      );
    } else if (isError) {
      console.error('Error loading categories:', error);
    }
  }, [categoriesData, isSuccess, isError, error]);

  const handleEdit = (item: RawMaterialCategory) => {
    navigate({to: `/admin/rawMaterialCategory/${item.id}`});
  };

  const handleDelete = (item: RawMaterialCategory) => {
    if (
      window.confirm(
        'Are you sure you want to delete this raw material category?',
      )
    ) {
      deleteRawMaterialCategory(item.id, {
        onSuccess: () => {},
        onError: (err) => {
          console.error('Delete failed:', err);
        },
      });
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Raw Material Category List</h2>
      <GenericTable
        data={categoriesData?.data || []}
        columns={columns}
        itemsPerPage={5}
        action
        searchAble
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DisplayRawMaterialCat;
