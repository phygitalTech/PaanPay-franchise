{
  /* eslint-disable */
}

import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from '@tanstack/react-router';
import {BiArrowBack} from 'react-icons/bi';
import toast from 'react-hot-toast';
import {
  useGetMerchantById,
  useSubmitMerchantInventory,
} from '@/lib/react-query/Admin/merchant';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import GenericButton from '@/components/Forms/Buttons/GenericButton';

import GenericTables, {Column} from '@/components/Forms/Table/GenericTables';

type SubMerchantRow = {
  merchantId: string;
  inventory: string | number;
  rawMaterialName: string;
  rawMaterialId?: string;
  quantity: number;
  quantityInput: string;
  unit: string;
};

const MerchantDetailed: React.FC = () => {
  const navigate = useNavigate();
  const {id} = useParams({from: '/_app/merchantdetail/$id'}) as {id: string};

  const {data, isLoading, isError, error} = useGetMerchantById(id);
  const mutation = useSubmitMerchantInventory();
  const [inputData, setInputData] = useState<SubMerchantRow[]>([]);
  const methods = useForm();

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      const rows: SubMerchantRow[] = data.data.map((item: any) => ({
        merchantId: item._id,
        inventory: item.inventory ?? '',
        rawMaterialName: item.rawMaterialName ?? '',
        rawMaterialId: item.rawMaterialId ?? '',
        unit: item.unit ?? '',
        quantity: 0,
        quantityInput: '0',
      }));
      setInputData(rows);
    }
  }, [data]);

  const handleSubmit = (formValues: any) => {
    const updatedInputData = [...inputData];

    // Update the state from react-hook-form values
    updatedInputData.forEach((row, index) => {
      const val = formValues.quantityInput?.[index] || '0';
      const parsed = Number(val);
      row.quantityInput = val;
      row.quantity = isNaN(parsed) ? 0 : parsed;
    });

    const filteredItems = updatedInputData
      .filter((item) => Number(item.quantity) > 0)
      .map((item) => ({
        inventory: item.inventory.toString(),
        rawMaterialId: item.rawMaterialId?.toString() ?? '',
        rawMaterialName: item.rawMaterialName,
        unit: item.unit,
        quantity: Number(item.quantity),
      }));

    const payload = {
      merchantId: id,
      items: filteredItems,
    };

    mutation.mutate(payload, {
      onSuccess: () => toast.success('Inventory submitted successfully!'),
      onError: () => toast.error('Failed to submit inventory.'),
    });
  };

  const columns: Column<SubMerchantRow>[] = [
    {
      header: 'Inventory',
      accessor: 'inventory',
    },
    {
      header: 'Unit',
      accessor: 'unit',
    },
    {
      header: 'Raw Material',
      accessor: 'rawMaterialName',
    },
    {
      header: 'Quantity',
      accessor: 'quantityInput',
      cell: (_row: any, index: number) => (
        <Controller
          control={methods.control}
          name={`quantityInput.${index}`}
          render={({field}) => (
            <input
              {...field}
              type="number"
              min={0}
              className="placeholder-gray-500 dark:placeholder-gray-400 w-full max-w-[6rem] rounded-md border border-stroke bg-white px-3 py-1 text-sm text-black focus:outline-none dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
            />
          )}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-800 dark:text-gray-200 text-lg">
          Loading...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="text-lg text-red-600 dark:text-red-400">
          Error: {error?.message || 'Failed to load merchant data'}
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-6 transition-colors duration-200 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => navigate({to: '/merchantlist'})}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              <BiArrowBack className="text-lg" />
              Back to Merchant List
            </button>
          </div>

          <h1 className="text-gray-900 mb-4 text-xl font-bold dark:text-white sm:text-2xl">
            Merchant Inventory Details
          </h1>

          {/* Generic Table */}
          <GenericTables data={inputData} columns={columns} />

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <GenericButton
              type="button"
              onClick={methods.handleSubmit(handleSubmit)}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
              disabled={mutation.status === 'pending'}
            >
              {mutation.status === 'pending' ? 'Submitting...' : 'Submit'}
            </GenericButton>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default MerchantDetailed;
