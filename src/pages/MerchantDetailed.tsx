/* eslint-disable */
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
import GenericTable, {Column} from '@/components/Forms/Table/GenericTable';
import {useAuthContext} from '@/context/AuthContext';
import GenericMultiselectDropdown from '@/components/Forms/SearchDropDown/GenericMultiselectDropdown';
import {
  useGetAllProduct,
  useGetAllProductCategory,
} from '@/lib/react-query/Admin/products';
import {useGetRawMaterialCategory} from '@/lib/react-query/Admin/rawmaterial';

type SubMerchantRow = {
  merchantId: string;
  inventory: string | number;
  rawMaterialName: string;
  rawMaterialId?: string;
  quantity: number;
  quantityInput: string;
  unit: string;
};

type FormValues = {
  quantityInput: Record<string, string>;
};

type MerchantInventory = {
  id: string;
  inventory: number;
  rawMaterialId: string;
  rawMaterialName: string;
  unit: string;
};

const MerchantDetailed: React.FC = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const {id} = useParams({from: '/_app/merchantdetail/$id'}) as {id: string};

  const {data, isLoading, isError, error} = useGetMerchantById(id);
  const {data: rawCategory} = useGetRawMaterialCategory(user?.id!);
  const {mutateAsync: submitMerchantInventory, isPending} =
    useSubmitMerchantInventory();
  const [inputData, setInputData] = useState<SubMerchantRow[]>([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState<string[]>([]);
  const [filteredRawData, setFilteredRawData] = useState<MerchantInventory[]>(
    [],
  );

  console.log('selectedraw', selectedRawMaterial);

  const methods = useForm<FormValues>({
    defaultValues: {
      quantityInput: {},
    },
  });
  let matchedMerchantData;
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      matchedMerchantData =
        data.data.filter((raw: any) =>
          selectedRawMaterial.includes(raw.rawMaterialId),
        ) || [];

      setFilteredRawData(matchedMerchantData);
      console.log('filtered', filteredRawData);
    }
  }, [selectedRawMaterial, data]);

  useEffect(() => {
    if (Array.isArray(filteredRawData)) {
      const rows: SubMerchantRow[] = filteredRawData.map((item: any) => ({
        merchantId: item.id,
        inventory: item.inventory ?? '',
        rawMaterialName: item.rawMaterialName ?? '',
        rawMaterialId: item.rawMaterialId ?? '',
        unit: item.unit ?? '',
        quantity: 0,
        quantityInput: '0',
      }));

      // Set default values for each row input
      const defaultQuantityInputs: Record<string, string> = {};
      rows.forEach((row) => {
        defaultQuantityInputs[row.rawMaterialId ?? ''] = '0';
      });

      methods.reset({
        quantityInput: defaultQuantityInputs,
      });

      setInputData(rows);
    }
  }, [filteredRawData]);

  const handleSubmit = (formValues: FormValues) => {
    const updatedInputData = inputData.map((row) => {
      const val = formValues.quantityInput?.[row.rawMaterialId ?? ''] || '0';
      const parsed = Number(val);

      return {
        ...row,
        quantityInput: val,
        quantity: isNaN(parsed) ? 0 : parsed,
      };
    });

    const filteredItems = updatedInputData
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        inventory: item.inventory.toString(),
        rawMaterialId: item.rawMaterialId?.toString() ?? '',
        rawMaterialName: item.rawMaterialName,
        unit: item.unit,
        quantity: item.quantity,
      }));

    submitMerchantInventory({
      adminId: user?.id!,
      items: filteredItems,
      merchantId: id!,
    });
  };

  const columns: Column<SubMerchantRow>[] = [
    {
      header: 'Raw Material',
      accessor: 'rawMaterialName',
    },
    {
      header: 'Unit',
      accessor: 'unit',
    },
    {
      header: 'Inventory',
      accessor: 'inventory',
    },
    {
      header: 'Quantity',
      accessor: 'quantityInput',
      render: (row: SubMerchantRow) => (
        <Controller
          control={methods.control}
          name={`quantityInput.${row.rawMaterialId}`}
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
    <div className="rounded-sm px-4 pb-2 pt-4 dark:bg-boxdark sm:px-6">
      <FormProvider {...methods}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
          <div className="mx-auto">
            <h1 className="mb-4 text-xl font-semibold sm:text-2xl">
              Merchant Inventory Details
            </h1>
            <div className="mb-4 bg-white p-4 dark:bg-boxdark">
              <h1 className="mb-4 text-lg font-semibold">Raw Material</h1>
              {rawCategory?.map((each: any) => {
                const categoryRawOptions =
                  each?.rawMaterial?.map((pro: any) => ({
                    value: pro.id,
                    label: pro.name,
                  })) || [];

                return (
                  <GenericMultiselectDropdown
                    key={each.id}
                    name={`productCategory_${each.id}`} // unique name for each
                    label={each?.name}
                    options={categoryRawOptions}
                    onChange={(selected: any) => {
                      setSelectedRawMaterial((prev) => {
                        const combined = [...new Set([...prev, ...selected])]; // just use selected as is
                        return combined;
                      });
                    }}
                  />
                );
              })}
            </div>

            {/* Generic Table */}
            <GenericTable data={inputData} columns={columns} paginationOff />

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <GenericButton
                type="button"
                onClick={methods.handleSubmit(handleSubmit)}
                className="rounded-md bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
                disabled={isPending}
              >
                {isPending ? 'Submitting...' : 'Submit'}
              </GenericButton>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default MerchantDetailed;
