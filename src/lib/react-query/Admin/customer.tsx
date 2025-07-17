import {getAllCustomers, getAllMerchants} from '@/lib/api/Admin/Customer';
import {useQuery} from '@tanstack/react-query';

export const useGetCustomers = (id: string) =>
  useQuery({
    queryKey: ['customer'],
    queryFn: () => getAllCustomers(id),
    enabled: !!id,
  });

export const useGetMerchant = (id: string) =>
  useQuery({
    queryKey: ['merchant'],
    queryFn: () => getAllMerchants(id),
    enabled: !!id,
  });
