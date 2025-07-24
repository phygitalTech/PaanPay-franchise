// /components/Admin/RawmaterialCat/UpdateCategory.tsx
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useGetCategoryById,
  useUpdateCategory,
} from '@/lib/react-query/Admin/updaterawmaterial';
import {useNavigate} from '@tanstack/react-router';
import {Route} from '@/routes/_app/rawmaterial/updatecategory.$id';

const UpdateCategory = () => {
  const navigate = useNavigate();
  const {id} = Route.useParams();

  // No Zod schema, just name field
  const methods = useForm<{name: string}>({
    defaultValues: {name: ''},
  });

  const {data, isLoading} = useGetCategoryById(id);
  const {mutate: updateCategory, isPending} = useUpdateCategory();

  useEffect(() => {
    if (data) {
      methods.reset({name: data.name});
    }
  }, [data, methods]);

  const onSubmit = (formData: {name: string}) => {
    updateCategory(
      {id, data: {name: formData.name}},
      {
        onSuccess: () => navigate({to: '/rawmaterial/addrawmaterial'}),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">
            Update Raw Material Category
          </h1>
        </div>

        <GenericInputField
          name="name"
          label="Category Name"
          placeholder="Enter name"
        />

        <div className="flex justify-end space-x-4">
          <GenericButton
            type="button"
            onClick={() => navigate({to: '/rawmaterial/addrawmaterial'})}
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

export default UpdateCategory;
