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
  useGetRawMaterialCategory,
} from '@/lib/react-query/Admin/rawmaterial';
import {addRawMaterial} from '@/lib/api/Admin/rawmaterial';
import {useAuthContext} from '@/context/AuthContext';

export type Category = {
  id: string;
  name: string;
};

export type RawMaterialFormValues = {
  name: string;
  unit: string;
  price: number;
  inventory: number;
  sellPrice: number;
  rawMaterialCategory: string;
};

const SelectRawMaterial: React.FC = () => {
  const {user} = useAuthContext();
  const adminId = user?.id;
  const methods = useForm<RawMaterialFormValues>({
    resolver: zodResolver(rawMaterialValidationSchema),
    defaultValues: {
      name: '',
      unit: '',
      price: 0,
      inventory: 0,
      sellPrice: 0,
      rawMaterialCategory: '',
    },
  });

  const {mutate: addRawMaterialAdmin, isPending} = useAddRawMaterialAdmin(
    adminId!,
  );
  console.log('first');

  const {
    data: categoriesData,
    isError,
    error,
  } = useGetRawMaterialCategory(adminId!);

  const errors = (error: any) => {
    console.log('form error', error);
  };

  const onSubmit = async (data: RawMaterialFormValues) => {
    const payload = {
      name: data.name,
      price: Number(data.price),
      unit: data.unit,
      inventory: Number(data.inventory),
      sellPrice: Number(data.sellPrice),
      rawMaterialCategoryId: data.rawMaterialCategory,
    };

    try {
      const res = await addRawMaterialAdmin(payload);
      methods.reset();
      console.log('res', res);
    } catch (error) {
      console.error('Direct call failed:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, errors)}
        className="space-y-8 bg-white p-6 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Raw Material</h1>
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
              {label: 'gm', value: 'GRAM'},
              {label: 'ml', value: 'ML'},
              {label: 'bottle', value: 'BOTTLE'},
              {label: 'ltr', value: 'LITRE'},
              {label: 'pcs', value: 'PIECE'},
              {label: 'meter', value: 'METER'},
              {label: 'dozen', value: 'DOZEN'},
              {label: 'none', value: 'NONE'},
            ]}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericInputField
            name="inventory"
            label="Inventory"
            placeholder="Enter inventory"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericInputField
            name="price"
            label="Purchase Price"
            placeholder="Enter purchase price"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <GenericInputField
            name="sellPrice"
            label="Selling Price"
            placeholder="Enter selling price"
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
