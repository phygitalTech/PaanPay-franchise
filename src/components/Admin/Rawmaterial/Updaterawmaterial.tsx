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
  useUpdateRawdata,
} from '@/lib/react-query/Admin/updaterawmaterial';
import {useGetCategoryData} from '@/lib/react-query/Admin/rawmaterial';
import {useNavigate} from '@tanstack/react-router';

type FormValues = z.infer<typeof rawMaterialValidationSchema>;

const Updaterawmaterial = () => {
  const navigate = useNavigate();

  const {id} = Route.useParams();
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawMaterialValidationSchema),
  });

  const {data, isLoading} = useGetRawMaterialById(id);
  const {mutate: updateRawMaterial, isPending} = useUpdateRawdata();
  const {data: categories} = useGetCategoryData();

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.name,
        unit: data.unit,
        price: data.price,
        rawMaterialCategory: data.rawMaterialCategoryId,
      });
    }
  }, [data, methods]);

  const onSubmit = (formData: FormValues) => {
    const payload = {
      name: formData.name,
      unit: formData.unit,
      price: Number(formData.price),
      rawMaterialCategoryId: formData.rawMaterialCategory,
    };

    updateRawMaterial({id, data: payload});
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
          <h1 className="text-xl font-bold">Update Raw Material</h1>
        </div>

        <GenericInputField name="name" label="Name" placeholder="Enter name" />

        <GenericSearchDropdown
          name="unit"
          label="Unit"
          options={[
            {label: 'kg', value: 'KILOGRAM'},
            {label: 'bottle', value: 'BOTTLE'},
            {label: 'gm', value: 'GRAM'},
            {label: 'ltr', value: 'LITRE'},
            {label: 'pcs', value: 'PIECE'},
            {label: 'meter', value: 'METER'},
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

        <GenericInputField
          name="price"
          label="Price"
          placeholder="Enter price"
        />

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
