import {
  getCompletedOrders,
  getDashboardDetails,
  getPendingOrders,
} from '@/lib/api/Admin/dashboard';
import {useQuery} from '@tanstack/react-query';

export const useGetDashboardDetails = (id: string) =>
  useQuery({
    queryKey: ['dashboard', id],
    queryFn: () => getDashboardDetails(id),
    enabled: !!id,
  });

export const useGetCompletedOrderDetails = (id: string) =>
  useQuery({
    queryKey: ['complete', id],
    queryFn: () => getCompletedOrders(id),
    enabled: !!id,
  });

export const useGetPendingOrderDetails = (id: string) =>
  useQuery({
    queryKey: ['pending', id],
    queryFn: () => getPendingOrders(id),
    enabled: !!id,
  });
