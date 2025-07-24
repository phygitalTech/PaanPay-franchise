{
  /* eslint-disable */
}

import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {rawMaterialValidationSchema} from '@/lib/validation/dishSchemas';
import {z} from 'zod';
import {Route} from '@/routes/_app/rawmaterial/update.$id';

import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericSearchDropdown from '@/components/Forms/SearchDropDown/GenericSearchDropdown';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useGetRawMaterialById,
  useUpdateRawMaterial,
} from '@/lib/react-query/Admin/updaterawmaterial';

import {useNavigate} from '@tanstack/react-router';
import {useAuthContext} from '@/context/AuthContext';
import {useGetRawMaterialCategory} from '@/lib/react-query/Admin/rawmaterial';

type FormValues = z.infer<typeof rawMaterialValidationSchema>;

const Updaterawmaterial = () => {
  const navigate = useNavigate();

  const {id} = Route.useParams();
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawMaterialValidationSchema),
  });

  const {user} = useAuthContext();
  const {data, isLoading} = useGetRawMaterialById(id);
  const {
    mutateAsync: updateRawMaterial,
    isSuccess,
    isPending,
  } = useUpdateRawMaterial();
  const {data: categories} = useGetRawMaterialCategory(user?.id!);

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.name,
        unit: data.unit,
        price: data.price,
        inventory: data.inventory,
        sellPrice: data.sellPrice,
        rawMaterialCategory: data.rawMaterialCategoryId,
      });
    }
  }, [data, methods]);

  const errors = (error: any) => {
    console.log('form error', error);
  };

  const onSubmit = (formData: FormValues) => {
    const payload = {
      name: formData.name,
      unit: formData.unit,
      price: Number(formData.price),
      inventory: Number(formData.inventory),
      sellPrice: Number(formData.sellPrice),
      rawMaterialCategoryId: formData.rawMaterialCategory,
    };

    updateRawMaterial(
      {id, data: payload},
      {
        onSuccess: () => navigate({to: '/rawmaterial/rawmaterial'}),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, errors)}
        className="space-y-8 bg-white p-8 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Update Raw Material</h1>
        </div>

        <GenericInputField name="name" label="Name" placeholder="Enter name" />

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

        <GenericSearchDropdown
          name="rawMaterialCategory"
          label="Category"
          options={
            categories?.map((cat: any) => ({
              label: cat.name,
              value: cat.id,
            })) || []
          }
        />

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

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton
            type="button"
            onClick={() => navigate({to: `/rawmaterial/rawmaterial`})}
          >
            Cancel
          </GenericButton>
          <GenericButton type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Updaterawmaterial;
