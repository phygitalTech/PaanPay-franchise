import {getMerchantId} from '@/lib/api/Admin/merchantdetail';
import {api} from '@/utils/axios';
import {useMutation, useQuery, QueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetMerchantById = (id: string) =>
  useQuery({
    queryKey: ['merchant', id],
    queryFn: () => getMerchantId(id),
    enabled: !!id,
  });

interface InventoryItem {
  inventory: string;
  rawMaterialId: string;
  rawMaterialName: string;
  unit: string;
  quantity: number;
}

interface MerchantInventoryPayload {
  adminId: string;
  merchantId: string;
  items: InventoryItem[];
}

export const useSubmitMerchantInventory = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (payload: MerchantInventoryPayload) => {
      try {
        const response = await api.post(
          `/admin/purchase/${payload.adminId}`,
          payload,
        );
        toast.success('Inventory submitted successfully');
        return response.data;
      } catch (error) {
        toast.error('Failed to submit inventory');
        throw error.response.data.message;
      }
    },
  });
};

export const useGetReportData = (id: string) => {
  return useQuery({
    queryKey: ['reportData'],
    queryFn: async () => {
      const response = await api.get(`/admin/reports/${id}`);
      console.log('first', response.data);
      return response.data;
    },
  });
};
