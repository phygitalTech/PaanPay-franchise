/* eslint-disable */
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  deletePurchaseRequest,
  getAllPurchaseRequestById,
  getAllPurchaseRequests,
} from '../../../api/Admin/purchaseAPI';
import toast from 'react-hot-toast';
import {api} from '@/utils/axios';

export const useGetPurchaseRequest = (id: string) => {
  return useQuery({
    queryKey: ['purchaseRequests'],
    queryFn: () => getAllPurchaseRequests(id),
  });
};

export const useDeletePurchaseRequest = () => {
  const queryClient = useQueryClient();

  const {mutateAsync: deletePurchase} = useMutation({
    mutationFn: deletePurchaseRequest,
    onSuccess: () => {
      toast.success('Purchase request deleted successfully');
      queryClient.invalidateQueries({queryKey: ['purchase-request']});
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete purchase request');
    },
  });

  return {deletePurchase};
};

export const useGetPurchaseById = (id: string) => {
  return useQuery({
    queryKey: ['purchaseRequest', id],
    queryFn: () => getAllPurchaseRequestById(id),
  });
};

export const useSubmitPurchaseRequest = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post(
        `/admin/purchase/requests/${id}`,
        payload,
      );
      console.log('Submit response ----', response);
      return response;
    },
    onSuccess: (data) => {
      toast.success('Purchase request submitted successfully');
      queryClient.invalidateQueries({queryKey: ['purchaseRequests']});
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit purchase request');
    },
  });
};
