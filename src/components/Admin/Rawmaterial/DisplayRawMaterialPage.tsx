import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useGetCategorydata} from '@/lib/react-query/Admin/rawmaterial';
import {useDeleteRawMaterialAdmin} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';
import {useEffect, useState} from 'react';
// import toast from 'react-hot-toast'; // Import toast

type RawMaterial = {
  id: string;
  name: string;
  unit: string;
  category: {name: string}; // Keeping this for data transformation
};

const columns: Column<RawMaterial>[] = [
  {header: 'Raw Material Name', accessor: 'name', sortable: true},
  {header: 'Unit', accessor: 'unit', sortable: false},
];

const DisplayRawMaterial: React.FC = () => {
  const navigate = useNavigate();
  const [rawMaterialData, setRawMaterialData] = useState<RawMaterial[]>([]);

  const {mutate: deleteRawMaterialAdmin} = useDeleteRawMaterialAdmin();

  const {
    data: rawMaterialApiData,
    isSuccess,
    error,
    isLoading,
    refetch,
  } = useGetCategorydata('');

  useEffect(() => {
    if (rawMaterialApiData?.data && Array.isArray(rawMaterialApiData.data)) {
      const transformedData: RawMaterial[] = rawMaterialApiData.data.map(
        (rawMaterial: RawMaterial) => ({
          id: rawMaterial.id,
          name: rawMaterial.name,
          unit: rawMaterial.unit,
          category: {name: rawMaterial.category?.name}, // Keeping category for transformation
        }),
      );
      setRawMaterialData(transformedData);
    } else if (error) {
      console.error('Error fetching raw materials:', error);
    }
  }, [rawMaterialApiData, error, isSuccess]);

  const handleEdit = (item: RawMaterial) => {
    navigate({
      to: `/update/rawMaterial/${item.id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  const handleDelete = (item: RawMaterial) => {
    deleteRawMaterialAdmin(item.id, {
      onSuccess: () => {
        // Optionally, you could also refetch data or remove the deleted item from the UI
        setRawMaterialData((prev) =>
          prev.filter((material) => material.id !== item.id),
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error(`Failed to delete "${item.name}": ${error.message}`);
      },
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Raw Material List</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"></div>
      <GenericTable
        data={rawMaterialData || []}
        columns={columns}
        action
        searchAble
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default DisplayRawMaterial;
