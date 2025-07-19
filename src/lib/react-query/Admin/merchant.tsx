import {getMerchantId} from '@/lib/api/Admin/merchantdetail';
import {api} from '@/utils/axios';
import {useMutation, useQuery, QueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';
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
  merchantId: string;
  items: InventoryItem[]; // 👈 changed from `inventoryData` to `items`
}

export const useSubmitMerchantInventory = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (payload: MerchantInventoryPayload) => {
      try {
        const response = await api.post(
          `/admin/purchase/${STATIC_ID}`,
          payload,
        );
        console.log('Response from submit:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error submitting inventory:', error);
        throw error;
      }
    },
  });
};

export const useGetReportData = () => {
  return useQuery({
    queryKey: ['reportData'],
    queryFn: async () => {
      const response = await api.get(`/admin/reports/${STATIC_ID}`);
      console.log('first', response.data);
      return response.data;
    },
  });
};
