import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

export const getDashboardDetails = async (id: string) => {
  try {
    const response = await api.get(`/admin/dashboard/${id}`);
    console.log('resssssssss', response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to get details');
    }
  }
};

export const getCompletedOrders = async (id: string) => {
  try {
    const response = await api.get(`/admin/completed/${id}`);
    console.log('resssssssss', response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to get completed order details',
      );
    }
  }
};

export const getPendingOrders = async (id: string) => {
  try {
    const response = await api.get(`/admin/pending/${id}`);
    console.log('resssssssss', response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to get pending order details',
      );
    }
  }
};
