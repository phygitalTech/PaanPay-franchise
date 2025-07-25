import {
  getExtraItemById,
  updateExtraItemAdmin,
} from '@/lib/api/Admin/updateextraitem';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetExtaItemById = (id: string) => {
  return useQuery({
    queryKey: ['extra-item ', id],
    queryFn: () => getExtraItemById(id),
    enabled: !!id,
  });
};

export const useUpdateExtraItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {id: string; data: {name: string; price: number}}) =>
      updateExtraItemAdmin(data),
    onSuccess: () => {
      toast.success('Extra item updated successfully!');
      queryClient.invalidateQueries({
        queryKey: ['extra-item'],
      });
    },
    onError: (error) => {
      toast.error(`Failed to update extra item: ${error.message}`);
    },
  });
};
