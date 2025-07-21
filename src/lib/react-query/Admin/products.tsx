import {
  deleteProduct,
  getAllExtraItems,
  getAllProduct,
  getAllProductCategory,
  getAllRawMaterial,
  getProductById,
  getProductCreationStatus,
  ProductPayload,
  saveProduct,
  saveProductCreationStatus,
  updateProduct,
} from '@/lib/api/Admin/products';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type RawMaterial = {
  id: string;
  name: string;
  price: number | null;
  rawMaterialCategoryId: string;
  unit: string;
};

export type ExtraItem = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  merchantId: string;
  adminId: string | null;
};

export type ResExtra = {
  extraItems: ExtraItem[];
};

export type StatusData = {
  status: boolean;
};

export const useGetAllRawMaterial = (id: string) =>
  useQuery<RawMaterial[]>({
    queryKey: ['raw', id],
    queryFn: () => getAllRawMaterial(id),
    enabled: !!id,
  });

export const useGetAllExtraItems = (id: string) =>
  useQuery<ResExtra[]>({
    queryKey: ['extra', id],
    queryFn: () => getAllExtraItems(id),
    enabled: !!id,
  });

export const useGetAllProductCategory = (id: string) =>
  useQuery({
    queryKey: ['category', id],
    queryFn: () => getAllProductCategory(id),
    enabled: !!id,
  });

export const useGetAllProduct = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => getAllProduct(id),
    enabled: !!id,
  });

export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: ['product'],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

export const useGetProductCreationStatus = (id: string) =>
  useQuery({
    queryKey: ['product_status'],
    queryFn: () => getProductCreationStatus(id),
    enabled: !!id,
  });

export const useSaveProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductPayload) => saveProduct(id, data),
    onSuccess: () => {
      toast.success('Product Saved Succesfully');
      queryClient.invalidateQueries({queryKey: ['product', id]});
    },
    onError: () => {
      toast.error('Failed To Save product');
    },
  });
};

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductPayload) => updateProduct(id, data),
    onSuccess: () => {
      toast.success('Product updated Succesfully');
      queryClient.invalidateQueries({queryKey: ['product', id]});
    },
    onError: () => {
      toast.error('Failed To update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success('Product Deleted Succesfully');
      queryClient.invalidateQueries({queryKey: ['product']});
    },
    onError: () => {
      toast.error('Failed To Delete product');
    },
  });
};

export const useSaveProductCreationStatus = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StatusData) => saveProductCreationStatus(id, data),
    onSuccess: () => {
      toast.success('Product Creation Status Saved Succesfully');
      queryClient.invalidateQueries({queryKey: ['product_status']});
    },
    onError: () => {
      toast.error('Failed To Save product creation status');
    },
  });
};
