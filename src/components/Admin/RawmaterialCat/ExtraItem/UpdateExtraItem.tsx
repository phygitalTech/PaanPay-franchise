// /components/Admin/RawmaterialCat/UpdateExtraItem.tsx
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useNavigate} from '@tanstack/react-router';
import {Route} from '@/routes/_app/rawmaterial/extraitemupdate.$id';
import {
  useGetExtaItemById,
  useUpdateExtraItem,
} from '@/lib/react-query/Admin/updateextraitem';
import {number, string} from 'zod';

// Define form schema
type FormData = {
  name: string;
  price: string;
};

const UpdateExtraItem = () => {
  const navigate = useNavigate();
  const {id} = Route.useParams();

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      price: '',
    },
  });

  const {data, isLoading} = useGetExtaItemById(id);
  const {mutate: updateExtraItem, isPending} = useUpdateExtraItem();

  useEffect(() => {
    if (data?.name && data?.price) {
      methods.reset({
        name: data.name,
        price: String(data.price),
      });
    }
  }, [data, methods]);

  const onSubmit = (formData: FormData) => {
    updateExtraItem(
      {
        id,
        data: {
          name: formData.name,
          price: Number(formData.price),
        },
      },
      {
        onSuccess: () =>
          navigate({to: '/rawmaterial/extraitemupdate/$id', params: {id}}),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <h1 className="text-gray-800 text-2xl font-bold dark:text-white">
          Update Extra Item
        </h1>

        <GenericInputField
          name="name"
          label="Extra Item Name"
          placeholder="Enter name"
        />

        <GenericInputField
          name="price"
          label="Price"
          placeholder="Enter price"
        />

        <div className="flex justify-end space-x-4 pt-4">
          <GenericButton
            type="button"
            onClick={() => navigate({to: '/rawmaterial/extraitemraw'})}
            className="bg-gray-300 hover:bg-gray-400 text-black"
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

export default UpdateExtraItem;
