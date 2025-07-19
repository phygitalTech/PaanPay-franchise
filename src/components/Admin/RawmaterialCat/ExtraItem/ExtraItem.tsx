import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {rawmaterialExtraSchema} from '@/lib/validation/rawmaterialSchema';
import {z} from 'zod';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useAddExtraItem,
  useGetExtraItemsDataByid,
} from '@/lib/react-query/Admin/rawmaterial';

type FormValues = z.infer<typeof rawmaterialExtraSchema>;

const ExtraItem: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawmaterialExtraSchema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  const {mutate: addItem} = useAddExtraItem();
  // console.log('Added Extra Itemsss:', addItem);
  const {
    data: extraItemsData,
    isError,
    isLoading,
  } = useGetExtraItemsDataByid('');
  console.log('Extra Items Dataaaaaaa:', extraItemsData);

  const onSubmit = (data: FormValues) => {
    addItem({
      name: data.name,
      price: Number(data.price),
    });

    console.log('Submitted Dataaaaa:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="mb-6 rounded-md bg-emerald-600 px-6 py-4 text-white shadow">
          <h1 className="text-xl font-bold">Extra Item</h1>
        </div>

        {/* Row for name and price */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <GenericInputField
              name="name"
              label="Extra Item Name"
              placeholder="Enter name"
            />
          </div>
          <div className="w-1/2">
            <GenericInputField
              name="price"
              label="Price"
              type="number"
              placeholder="Enter price"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <GenericButton type="submit">Save</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default ExtraItem;
