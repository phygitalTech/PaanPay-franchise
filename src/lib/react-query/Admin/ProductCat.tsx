import {
  deleteProductCat,
  getProductCatById,
  saveProductCat,
  updateProductCat,
} from '@/lib/api/Admin/productCategory';
import {getAllProductCategory} from '@/lib/api/Admin/products';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type ProductCatPayload = {
  payload: {
    name: string;
    description: string;
    imageFile?: File;
  };
};

export const useSaveProductCat = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductCatPayload) => saveProductCat(id, data),
    onSuccess: () => {
      toast.success('Product category Saved Succesfully');
      queryClient.invalidateQueries({queryKey: ['product_cat', id]});
    },
    onError: () => {
      toast.error('Failed To Save product category');
    },
  });
};

export const useUpdateProductCat = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductCatPayload) => updateProductCat(id, data),
    onSuccess: () => {
      toast.success('Product category updated Succesfully');
      queryClient.invalidateQueries({queryKey: ['product_cat']});
    },
    onError: () => {
      toast.error('Failed To update product category');
    },
  });
};

export const useDeleteProductCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductCat(id),
    onSuccess: () => {
      toast.success('Product category  Deleted Succesfully');
      queryClient.invalidateQueries({queryKey: ['product_cat']});
    },
    onError: () => {
      toast.error('Failed To Delete product category');
    },
  });
};

export const useGetAllProductCat = (id: string) =>
  useQuery({
    queryKey: ['product_cat', id],
    queryFn: () => getAllProductCategory(id),
    enabled: !!id,
  });

export const useGetProductCatById = (id: string) =>
  useQuery({
    queryKey: ['product_cat'],
    queryFn: () => getProductCatById(id),
    enabled: !!id,
  });
