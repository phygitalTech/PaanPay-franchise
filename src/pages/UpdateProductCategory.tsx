/* eslint-disable*/
import {useAuthContext} from '@/context/AuthContext';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {productCategory} from './CreateProductCategory';
import {z} from 'zod';
import toast from 'react-hot-toast';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {
  useGetProductCatById,
  useUpdateProductCat,
} from '@/lib/react-query/Admin/ProductCat';
import {Route} from '@/routes/_app/productcategory/updateproductcategory.$id';
import {useNavigate} from '@tanstack/react-router';

type FormValues = z.infer<typeof productCategory>;
const UpdateProductCategory = () => {
  const {id} = Route.useParams();
  const {user} = useAuthContext();

  const admin_id = user?.id;
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const methods = useForm<FormValues>({
    resolver: zodResolver(productCategory),
    defaultValues: {name: ''},
  });

  const {data: ProductCategory} = useGetProductCatById(id);
  console.log('product cat', ProductCategory);
  const {mutate: updateProductCategory, isPending} = useUpdateProductCat(id!);

  const error = (error: any) => {
    console.log('form error', error);
  };
  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
      imageFile: imageFile ?? undefined,
    };
    updateProductCategory(
      {payload},
      {
        onSuccess: () => navigate({to: '/productcategory/productcategory'}),
      },
    );
    methods.reset({
      name: '',
      description: '',
      imageFile: '',
    });
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success('Image selected successfully!');
    }
  };

  useEffect(() => {
    if (ProductCategory) {
      methods.reset({
        name: ProductCategory?.category?.name,
        description: ProductCategory?.category?.description,
      });
      setImagePreview(ProductCategory?.category?.image);
    }
  }, [ProductCategory]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, error)}
        className="space-y-8 bg-white p-8 dark:bg-boxdark"
      >
        <div className="mb-6 py-4">
          <h1 className="text-lg font-semibold">Update Product Category</h1>
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
            {isPending ? 'Updating...' : 'Update'}
          </GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProductCategory;
