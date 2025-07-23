/* eslint-disable*/

import GenericButton from '@/components/Forms/Buttons/GenericButton';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import {useAuthContext} from '@/context/AuthContext';
import {useSaveProductCat} from '@/lib/react-query/Admin/ProductCat';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {z} from 'zod';

export const productCategory = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Unit is required'),
  imageFile: z
    .any()
    .optional()
    .refine(
      (file) => {
        // Allow if not present (undefined or null), otherwise must be a File
        return file === undefined || file === null || file instanceof File;
      },
      {message: 'Invalid file type'},
    ),
});

type FormValues = z.infer<typeof productCategory>;
const CreateProductCategory = () => {
  const {user} = useAuthContext();

  const admin_id = user?.id;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const methods = useForm<FormValues>({
    resolver: zodResolver(productCategory),
    defaultValues: {name: ''},
  });

  const {mutate: addProductCategory, isPending} = useSaveProductCat(admin_id!);

  const error = (error: any) => {
    console.log('form error', error);
  };
  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
      imageFile: imageFile ?? undefined,
    };
    addProductCategory({payload});
    methods.reset();
    setImagePreview(null);
    console.log('data', data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success('Image selected successfully!');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, error)}
        className="space-y-8 bg-white p-6 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Add Product Category</h1>
        </div>
        <GenericInputField
          name="name"
          label="Product Category"
          placeholder="Enter product category name"
        />

        <GenericInputField
          name="description"
          label="Product Description"
          placeholder="Enter product category description"
        />

        <div className="col-span-6">
          <label className="text-gray-700 mb-1 block text-sm font-medium">
            Product category image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="dark:border-form-strokedark dark:bg-boxdark"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-h-52 w-full rounded-lg object-cover dark:border-form-strokedark dark:bg-boxdark"
            />
          )}
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

export default CreateProductCategory;
