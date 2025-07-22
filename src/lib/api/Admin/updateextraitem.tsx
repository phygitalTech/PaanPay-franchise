import {api} from '@/utils/axios';
import {AxiosError} from 'axios';
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
