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
import {useAuthContext} from '@/context/AuthContext';

type FormValues = z.infer<typeof rawmaterialcategorySchema>;

const AddRawMaterial: React.FC = () => {
  const {user} = useAuthContext();
  const admin_id = user?.id;
  console.log('user', user);
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawmaterialcategorySchema),
    defaultValues: {name: ''},
  });
  const {mutate: addCategory, isPending} = useAddRawMaterialCategory(admin_id!);
  const {data: categoriesData, isError: errorCategories} =
    useGetRawMaterialCategory(admin_id!);
  console.log('dataaaaaaa', categoriesData);

  const onSubmit = (data: FormValues) => {
    addCategory(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Add Raw Material Category</h1>
        </div>
        <GenericInputField
          name="name"
          label="Raw Material Category"
          placeholder="Enter category name"
        />
        <div className="flex justify-end">
          <GenericButton type="submit">
            {isPending ? 'saving...' : 'save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddRawMaterial;
