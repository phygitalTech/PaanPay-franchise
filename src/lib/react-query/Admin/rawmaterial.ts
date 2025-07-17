{
  /* eslint-disable  */
}
import {z} from 'zod';
import {
  addRawMaterialCategoryAPI,
  getRawMaterialCategoryByIdAPI,
  deleteRawMaterialCategoryAPI,
  addRawMaterial,
  fetchCategories,
  getAllrawmaterial,
  deleteRawMaterialAdmin,
  addExtraItem,
  deleteExtraItem,
  fetchExtraItemsData,
  fetchExtraItems,
  fetchExtraItemById,
} from '@/lib/api/Admin/rawmaterial';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {api} from '@/utils/axios';
import {} from './../../api/Admin/rawmaterial';

const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';

export const useAddRawMaterialCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRawMaterialCategoryAPI,
    onSuccess: () => {
      toast.success('Category added!');
      queryClient.invalidateQueries({
        queryKey: ['RAW_MATERIAL_CATEGORIES'],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Add failed');
    },
  });
};

export const useGetRawMaterialCategory = () => {
  return useQuery({
    queryKey: ['RAW_MATERIAL_CATEGORIES'],
    queryFn: getRawMaterialCategoryByIdAPI,
  });
};

export const useDeleteRawMaterialCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRawMaterialCategoryAPI(id),
    onSuccess: () => {
      toast.success('Category deleted!');
      queryClient.invalidateQueries({
        queryKey: ['RAW_MATERIAL_CATEGORIES'],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Delete failed');
    },
  });
};

export const useAddRawMaterialAdmin = () => {
  // console.log('useAddRawMaterialAdmin');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRawMaterial,
    onSuccess: () => {
      toast.success('Raw material saved successfully!');
      queryClient.invalidateQueries({
        queryKey: ['rawMaterialList'],
      });
    },
    onError: (error) => {
      toast.error('Failed to save raw material');
      console.error(error);
    },
  });
};

export const useGetCategoryData = () => {
  return useQuery({
    queryKey: ['rawMaterialCategories'],
    queryFn: fetchCategories,
  });
};

export const useGetAllRawMaterials = () => {
  return useQuery({
    queryKey: ['rawMaterialList'],
    queryFn: getAllrawmaterial,
  });
};

export const useDeleteRawMaterialAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRawMaterialAdmin(id),
    onSuccess: () => {
      toast.success('Raw material deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['rawMaterialList'],
      });
    },
  });
};

export const useAddExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {name: string; price: number}) => addExtraItem(data),
    onSuccess: () => {
      toast.success('Extra item added successfully!');
      queryClient.invalidateQueries({
        queryKey: ['extra-item '],
      });
    },
    onError: (error) => {
      toast.error(`Failed to add extra item: ${error.message}`);
    },
  });
};

export const useGetExtraItemsDataByid = (id: string) => {
  return useQuery({
    queryKey: ['extra-item', id],
    queryFn: () => fetchExtraItemById(id),
  });
};
export const useGetExtraItemsData = () => {
  return useQuery({
    queryKey: ['extra-item'],
    queryFn: fetchExtraItemsData,
  });
};

export const useDeleteExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExtraItem(id),
    onSuccess: () => {
      toast.success('Extra item deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['extra-itemssss'],
      });
    },
  });
};
