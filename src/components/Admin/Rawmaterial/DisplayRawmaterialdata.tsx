/* eslint-disable */
import React from 'react';
import {toast} from 'react-hot-toast';

import {
  useDeleteRawMaterialAdmin,
  useGetAllRawMaterials,
} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';
import GenericTables from '@/components/Forms/Table/GenericTables';

type RawMaterial = {
  id: string;
  name: string;
  unit: string;
  price: number;
  rawMaterialCategoryId: string;
  categoryName: string;
};

const DisplayRawMaterialTable: React.FC = () => {
  const {data: rawMaterialData} = useGetAllRawMaterials();
  console.log('rawMaterialData', rawMaterialData);
  const {mutate: deleteRawMaterial} = useDeleteRawMaterialAdmin();

  const nevigate = useNavigate();
  const handleDelete = (item: RawMaterial) => {
    if (window.confirm('Delete this raw material?')) {
      deleteRawMaterial(item.id, {
        onSuccess: () => {
          toast.success('Deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete.');
        },
      });
    }
  };

  const handleEdit = (item: RawMaterial) => {
    nevigate({to: `/rawmaterial/update/${item.id}`});
  };

  const columns: Column<RawMaterial>[] = [
    {header: 'Name', accessor: 'name', sortable: true},
    {header: 'Category', accessor: 'categoryName', sortable: true},
    {header: 'Unit', accessor: 'unit'},
    {header: 'Price', accessor: 'price'},
  ];

  const tableData: RawMaterial[] =
    rawMaterialData?.map((item: any) => ({
      id: item.id,
      name: item.name,
      unit: item.unit,
      price: item.price,
      rawMaterialCategoryId: item.rawMaterialCategoryId,
      categoryName: item.rawMaterialCategory?.name || '',
    })) || [];

  return (
    <div className="mt-10">
      <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
        <h1 className="text-xl font-bold">Raw Material List</h1>
      </div>
      <GenericTables
        data={tableData}
        columns={columns}
        itemsPerPage={5}
        action={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
        searchAble={true}
      />
    </div>
  );
};

export default DisplayRawMaterialTable;
