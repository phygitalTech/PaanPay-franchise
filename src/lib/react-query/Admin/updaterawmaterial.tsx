import {
  getCategoryById,
  getRawMaterialById,
  updateCategoryAdmin,
  updateRawMaterial,
} from '@/lib/api/Admin/updaterawmaterialapi';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type RawMaterial = {
  name: string;
  price: number;
  unit: string;
  inventory: number;
  sellPrice: number;
  rawMaterialCategoryId: string;
};

interface MutationParams {
  id: string;
  data: RawMaterial;
}

export const useGetRawMaterialById = (id: string) => {
  return useQuery({
    queryKey: ['rawMaterial', id],
    queryFn: () => getRawMaterialById(id),
    enabled: !!id,
  });
};

// export const useUpdateRawdata = () => {
//   const queryClient = useQueryClient();
//   const {mutate, isPending} = useMutation({
//     mutationFn: (data: any) => updateRawMaterialAdmin(data),
//     onSuccess: () => {
//       toast.success('Raw material updated successfully!');
//       queryClient.invalidateQueries({
//         queryKey: ['rawMaterialList'],
//       });
//     },
//     onError: (error) => {
//       toast.error(`Failed to update raw material: ${error.message}`);
//     },
//   });

// };

export const useUpdateRawMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: MutationParams) => updateRawMaterial(id, data),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['rawMaterial']}),
    onError: (error: {message: string}) =>
      console.error('Failed to update raw material:', error),
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['rawMaterialCategory', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryAdmin,
    onSuccess: () => {
      toast.success('Category updated successfully!');
      queryClient.invalidateQueries({
        queryKey: ['rawMaterialCategory'],
      });
    },
    onError: (error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });
};
