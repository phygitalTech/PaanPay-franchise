import {
  addRawMaterialCategory,
  addRawMaterialAdmin,
  getRawMaterialCategoriesAdmin,
  getCategorydata,
} from '@/lib/api/Admin/rawmaterial';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAddRawMaterialCategoryName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {name: string; id: string}) => {
      const {id, ...rest} = data;
      return addRawMaterialCategory(id, rest);
    },
    onSuccess: () => {
      toast.success('Raw Material Category added successfully!');
    },
    onError: () => {
      toast.error('Failed to add Raw Material Category');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['RAW MATERIAL CATEGORIES'],
      });
    },
  });
};

export const useDeleteRawMaterialCategoryAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(
        `/admin/raw-material-category/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['raw-material-categories']});
    },
  });
};

export const useAddRawMaterialAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => getRawMaterialCategoriesAdmin(id),
    onSuccess: () => {
      toast.success('Raw Material added successfully!');
    },
    onError: () => {
      toast.error('Failed to add Raw Material');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['RAW MATERIAL CATEGORIES']});
    },
  });
};

export const useGetCategorydata = (id: string) => {
  return useQuery({
    queryKey: ['category-data'],
    queryFn: () => getCategorydata(id),
  });
};

export const useGetRawMaterialCategoriesAdmin = (id: string) => {
  return useQuery({
    queryKey: ['raw-material-categories'],
    queryFn: () => getRawMaterialCategoriesAdmin(id),
  });
};

export const useDeleteRawMaterialAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(
        `/admin/raw-material/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['raw-materials']});
    },
  });
};
