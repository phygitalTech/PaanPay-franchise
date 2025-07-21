/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from '@tanstack/react-router';
import {useForm, FormProvider} from 'react-hook-form';
import {BiArrowBack} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa6';

import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import GenericButton from '@/components/Forms/Buttons/GenericButton';

import {useGetAllRawMaterials} from '@/lib/react-query/Admin/rawmaterial';
import {
  useGetPurchaseById,
  useSubmitPurchaseRequest,
} from '@/lib/react-query/Admin/Purchase/purchaseMutation';
import {useAuthContext} from '@/context/AuthContext';

type SubMerchantRow = {
  rawMaterialId: string;
  rawMaterialName: string;
  unit: string;
  quantity: number;
  quantityInput: string;
};

const PurchaseAcceptPage: React.FC = () => {
  const methods = useForm();
  const {setValue, handleSubmit} = methods;

  const navigate = useNavigate();
  const {id} = useParams({from: '/_app/request/purchaseaccept/$id'});
  const {user} = useAuthContext();

  const {data: rawMaterials = [], isLoading: rawMaterialLoading} =
    useGetAllRawMaterials(user?.id!);

  console.log(rawMaterials);
  const {data, isLoading, isError, error} = useGetPurchaseById(id);
  const {mutate: submitMutation} = useSubmitPurchaseRequest(id);

  const [inputData, setInputData] = useState<SubMerchantRow[]>([]);

  useEffect(() => {
    if (data?.purchaserequestItem?.length > 0) {
      const rows = data.purchaserequestItem.map((item: any) => ({
        rawMaterialId: item.rawMaterial?.id || '',
        rawMaterialName: item.rawMaterial?.name || '',
        unit: item.rawMaterial?.unit || '',
        quantity: item.quantity,
        quantityInput: item.quantity.toString(),
      }));
      setInputData(rows);

      rows.forEach((row: SubMerchantRow, index: number) => {
        setValue(`rows.${index}.rawMaterialId`, row.rawMaterialId);
        setValue(`rows.${index}.quantityInput`, row.quantityInput);
      });
    }
  }, [data]);

  const handleDropdownChange = (value: string, index: number) => {
    const selected = rawMaterials.find((item: any) => item.id === value);

    if (!selected) return;

    const updatedData = inputData.map((item, i) =>
      i === index
        ? {
            ...item,
            rawMaterialId: selected.id,
            rawMaterialName: selected.name,
            unit: selected.unit,
          }
        : item,
    );

    setInputData(updatedData);

    // Update RHF form fields
    setValue(`rows.${index}.rawMaterialId`, selected.id);
    setValue(`rows.${index}.quantityInput`, updatedData[index].quantityInput);
  };

  useEffect(() => {
    console.log('inputData:', inputData);
  }, [inputData]);

  const handleAddRow = () => {
    const newRow: SubMerchantRow = {
      rawMaterialId: '',
      rawMaterialName: '',
      unit: '',
      quantity: 0,
      quantityInput: '',
    };
    const newData = [...inputData, newRow];
    setInputData(newData);

    const index = newData.length - 1;
    setValue(`rows.${index}.rawMaterialId`, '');
    setValue(`rows.${index}.quantityInput`, '');
  };

  const handleRemoveRow = (indexToRemove: number) => {
    const newData = inputData.filter((_, idx) => idx !== indexToRemove);
    setInputData(newData);
  };

  const onSubmit = (formData: any) => {
    const payload = {
      merchantId: data?.merchantId || '',
      items: formData.rows.map((row: any) => ({
        rawMaterialId: row.rawMaterialId,
        quantity: parseFloat(row.quantityInput),
      })),
    };

    submitMutation(payload, {
      onSuccess: () => {
        navigate({to: '/request/purchaserequest'});
      },
    });
  };

  if (isLoading || rawMaterialLoading)
    return (
      <div className="text-gray-800 dark:text-gray-100 py-10 text-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="py-10 text-center text-red-500">
        Error: {error?.message}
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen dark:border-strokedark"
      >
        <div className="mx-auto max-w-6xl space-y-6 p-4 dark:border-strokedark">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate({to: '/request/purchaserequest'})}
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700"
          >
            <BiArrowBack className="mr-2 h-5 w-5" />
            Back
          </button>

          {/* Page Title */}
          <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
            <h1 className="text-xl font-bold"> Purchase Request</h1>
          </div>

          {/* Buttons inside card below table */}
          <div className="mt-4 flex justify-end">
            {/* Add Row Button */}
            <GenericButton
              type="button"
              className="bg-yellow-600 text-white hover:bg-yellow-700"
              onClick={handleAddRow}
            >
              + Add Row
            </GenericButton>
          </div>

          {/* Table */}
          {/* Table Section with Matching Tailwind Style */}
          <section className="rounded-md bg-white shadow dark:bg-boxdark">
            <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
                  <tr className="dark:bg-meta-4 [&_th]:border [&_th]:border-stroke [&_th]:px-4 [&_th]:py-3 [&_th]:text-center [&_th]:dark:border-strokedark [&_th]:dark:text-white">
                    <th>Raw Material</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-100">
                  {inputData.map((row, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 hover:bg-gray-100 text-center transition dark:even:bg-boxdark-2 dark:hover:bg-graydark"
                    >
                      {/* Raw Material Dropdown */}
                      <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                        <select
                          name={`rows.${index}.rawMaterialId`}
                          className="dark:border-gray-600 dark:bg-gray-700 text-gray-800 w-full rounded-md border border-gray bg-white p-1.5 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:border-strokedark dark:bg-black dark:text-white sm:text-sm"
                          value={row.rawMaterialId}
                          onChange={(e) =>
                            handleDropdownChange(e.target.value, index)
                          }
                        >
                          <option value="">Select Raw Material</option>
                          {rawMaterials.map((r: any) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Quantity Input */}
                      <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                        <GenericInputField
                          name={`rows.${index}.quantityInput`}
                          type="number"
                          placeholder="Enter Quantity"
                          classname="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </td>

                      {/* Unit */}
                      <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                        <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 inline-flex rounded-full px-2 text-xs font-semibold">
                          {row?.unit}
                        </span>
                      </td>

                      {/* Delete Button */}
                      <td className="border border-stroke px-4 py-3 dark:border-strokedark">
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="mt-4 flex justify-end">
            {/* Submit Button */}
            <GenericButton
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </GenericButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default PurchaseAcceptPage;
