{
  /* eslint-disable */
}

import React, {useEffect, useState} from 'react';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import GenericInputField from '../../Forms/Input/GenericInputField';
import GenericButton from '../../Forms/Buttons/GenericButton';
import GenericSearchDropdown from '../../Forms/SearchDropDown/GenericSearchDropdown';
import {rawMaterialValidationSchema} from '@/lib/validation/dishSchemas';
import {toast} from 'react-hot-toast';
import {
  useAddRawMaterialAdmin,
  useGetCategoryData,
} from '@/lib/react-query/Admin/rawmaterial';
import {addRawMaterial} from '@/lib/api/Admin/rawmaterial';

export type Category = {
  id: string;
  name: string;
};

export type RawMaterialFormValues = {
  name: string;
  unit: string;
  price: string;
  rawMaterialCategory: string;
};

const SelectRawMaterial: React.FC = () => {
  const methods = useForm<RawMaterialFormValues>({
    resolver: zodResolver(rawMaterialValidationSchema),
    defaultValues: {
      name: '',
      unit: '',
      price: '',
      rawMaterialCategory: '',
    },
  });

  const {mutate: addRawMaterialAdmin, isPending} = useAddRawMaterialAdmin();
  console.log('first');

  const {data: categoriesData, isError, error} = useGetCategoryData();

  const onSubmit = async (data: RawMaterialFormValues) => {
    const payload = {
      name: data.name,
      price: Number(data.price),
      unit: data.unit,
      rawMaterialCategoryId: data.rawMaterialCategory,
    };

    try {
      const res = await addRawMaterialAdmin(payload);
      console.log('res', res);
    } catch (error) {
      console.error('Direct call failed:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
          <h1 className="text-xl font-bold">Raw Material</h1>
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericInputField
            name="name"
            label="Raw Material Name"
            placeholder="Enter raw material name"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericSearchDropdown
            name="rawMaterialCategory"
            label="Raw Material Category"
            options={
              categoriesData?.map((category: any) => ({
                label: category.name,
                value: category.id,
              })) || []
            }
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericSearchDropdown
            name="unit"
            label="Unit"
            options={[
              {label: 'kg', value: 'KG'},
              {label: 'bottle', value: 'BOTTLE'},
              {label: 'gm', value: 'GRAM'},
              {label: 'ltr', value: 'LITRE'},
              {label: 'mili ltr', value: 'ML'},
              {label: 'pcs', value: 'PIECE'},
              {label: 'dozen', value: 'DOZEN'},
              {label: 'none', value: 'NONE'},
            ]}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericInputField
            name="price"
            label="Price"
            placeholder="Enter price"
          />
        </div>

        <div className="flex justify-end">
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default SelectRawMaterial;
