import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

export const getMerchantPurchaseId = async (id: string) => {
  try {
    const response = await api.get(`/admin/purchase/${id}`);
    console.log('resssssssss', response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to get merchant',
      );
    }
  }
};

export const getMerchantById = async (id: string) => {
  try {
    const response = await api.get(`/merchant/${id}`);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to get merchant',
      );
    }
  }
};
