import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {rawmaterialcategorySchema} from '@/lib/validation/rawmaterialSchema';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useAddRawMaterialCategoryName} from '@/lib/react-query/Admin/rawmaterial';

type FormValues = z.infer<typeof rawmaterialcategorySchema>;

const RawMaterialCat: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawmaterialcategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const {mutate: addRawMaterialCategoryName, isPending} =
    useAddRawMaterialCategoryName();

  const onSubmit = (data: FormValues) => {
    addRawMaterialCategoryName({
      name: data.name,
      id: '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5',
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Raw Material Category
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="name"
              label="Raw Material Category"
              placeholder="Enter Raw Material Category Name"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default RawMaterialCat;
