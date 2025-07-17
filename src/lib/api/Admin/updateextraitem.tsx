import {api} from '@/utils/axios';
import {AxiosError} from 'axios';
const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';
export const getExtraItemById = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/single/${id}`);

    console.log('Fetched Extra Item:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch extra item',
      );
    }
    throw error;
  }
};

export const updateExtraItemAdmin = async ({
  id,
  data,
}: {
  id: string;
  data: {name: string; price: number};
}) => {
  try {
    const response = await api.put(`/admin/extraItem/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update extra item',
      );
    }
    throw error;
  }
};
