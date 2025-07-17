import {api} from '@/utils/axios';
import toast from 'react-hot-toast';

export const getAllCustomers = async (id: string) => {
  try {
    const response = await api.get(`/admin/customers/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to get customers');
    throw error;
  }
};

export const getAllMerchants = async (id: string) => {
  try {
    const response = await api.get(`/admin/merchants/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to get merchant');
    throw error;
  }
};
