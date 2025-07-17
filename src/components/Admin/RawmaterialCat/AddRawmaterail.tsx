import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {rawmaterialcategorySchema} from '@/lib/validation/rawmaterialSchema';
import {z} from 'zod';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useAddRawMaterialCategory,
  useGetRawMaterialCategory,
} from '@/lib/react-query/Admin/rawmaterial';

type FormValues = z.infer<typeof rawmaterialcategorySchema>;

const AddRawMaterial: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawmaterialcategorySchema),
    defaultValues: {name: ''},
  });

  const {mutate: addCategory, isPending} = useAddRawMaterialCategory();
  const {
    data: categoriesData,
    isError: errorCategories,
    isPending: pendingCategories,
  } = useGetRawMaterialCategory();
  console.log('dataaaaaaa', categoriesData);

  const onSubmit = (data: FormValues) => {
    addCategory({name: data.name});
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <h1 className="text-lg font-bold">Add Raw Material Category</h1>
        <GenericInputField
          name="name"
          label="Raw Material Category"
          placeholder="Enter category name"
        />
        <div className="flex justify-end">
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddRawMaterial;
