import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';
export const getAllPurchaseRequests = async (id: string) => {
  const response = await api.get(`/admin/purchase/requests/${id || STATIC_ID}`);
  // console.log('Purchase requests fetched:', response.data);
  return response.data;
};

export const deletePurchaseRequest = async (id: string) => {
  try {
    const response = await api.delete(
      `/admin/purchase/requests/${id || STATIC_ID}`,
    );
    // console.log('Purchase request deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting purchase request:', error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete purchase request',
      );
    }
    throw error;
  }
};

export const getAllPurchaseRequestById = async (id: string) => {
  const response = await api.get(`/admin/purchase/requests/single/${id}`);
  //console.log('Purchase request fetcheddddddddddddd:', response.data);
  return response.data;
};
