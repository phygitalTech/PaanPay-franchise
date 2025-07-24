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
import {useAuthContext} from '@/context/AuthContext';

type FormValues = z.infer<typeof rawmaterialExtraSchema>;

const ExtraItem: React.FC = () => {
  const {user} = useAuthContext();
  const adminId = user?.id;
  const methods = useForm<FormValues>({
    resolver: zodResolver(rawmaterialExtraSchema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  const {mutate: addItem, isPending} = useAddExtraItem(adminId!);
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
        className="space-y-8 bg-white p-6 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Extra Item</h1>
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
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default ExtraItem;
