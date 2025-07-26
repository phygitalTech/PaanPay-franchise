{
  /* eslint-disable  */
}
import {
  addExtraItem,
  addRawMaterial,
  addRawMaterialCategoryAPI,
  deleteExtraItem,
  deleteRawMaterialAdmin,
  deleteRawMaterialCategoryAPI,
  fetchCategories,
  fetchExtraItemById,
  getAllrawmaterial,
  getRawMaterialCategory,
  Payload,
} from '@/lib/api/Admin/rawmaterial';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {} from './../../api/Admin/rawmaterial';
import {getAllExtraItems} from '@/lib/api/Admin/products';

export const useAddRawMaterialCategory = (id: string) => {
  const queryClient = useQueryClient();
  const {mutate, isError, error, isPending} = useMutation({
    mutationFn: (data: Payload) => addRawMaterialCategoryAPI(id, data),
    onSuccess: () => {
      toast.success('Category added!');
      queryClient.invalidateQueries({
        queryKey: ['raw_cat'],
      });
    },
    onError: (error) => {
      toast.error(error?.message || 'Add failed');
    },
  });

  return {mutate, isError, error, isPending};
};

export const useGetRawMaterialCategory = (id: string) => {
  return useQuery({
    queryKey: ['raw_cat'],
    queryFn: () => getRawMaterialCategory(id),
  });
};

// export const useGetCategoryData = (id: string) => {
//   return useQuery({
//     queryKey: ['rawMaterialCategories'],
//     queryFn: () => fetchCategories(id),
//   });
// };

export const useDeleteRawMaterialCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRawMaterialCategoryAPI(id),
    onSuccess: () => {
      toast.success('Category deleted!');
      queryClient.invalidateQueries({
        queryKey: ['raw_cat'],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Delete failed');
    },
  });
};

export const useAddRawMaterialAdmin = (id: string) => {
  // console.log('useAddRawMaterialAdmin');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      price: number;
      unit: string;
      rawMaterialCategoryId: string;
    }) => addRawMaterial(id, data),
    onSuccess: () => {
      toast.success('Raw material saved successfully!');
      queryClient.invalidateQueries({
        queryKey: ['rawMaterial'],
      });
    },
    onError: (error) => {
      toast.error('Failed to save raw material');
      console.error(error);
    },
  });
};

export const useGetAllRawMaterials = (id: string) => {
  return useQuery({
    queryKey: ['rawMaterial'],
    queryFn: () => getAllrawmaterial(id),
  });
};

export const useDeleteRawMaterialAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRawMaterialAdmin(id),
    onSuccess: () => {
      toast.success('Raw material deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['rawMaterial'],
      });
    },
  });
};

export const useAddExtraItem = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {name: string; price: number}) => addExtraItem(id, data),
    onSuccess: () => {
      toast.success('Extra item added successfully!');
      queryClient.invalidateQueries({
        queryKey: ['extra-item', id],
      });
    },
    onError: (error) => {
      toast.error(`Failed to add extra item: ${error.message}`);
    },
  });
};

export const useGetExtraItemsDataByid = (id: string) => {
  return useQuery({
    queryKey: ['extra-item'],
    queryFn: () => fetchExtraItemById(id),
  });
};

export const useGetExtraItemsData = (id: string) => {
  return useQuery({
    queryKey: ['extra-item', id],
    queryFn: () => getAllExtraItems(id),
  });
};

export const useDeleteExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExtraItem(id),
    onSuccess: () => {
      toast.success('Extra item deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['extra-item'],
      });
    },
  });
};
