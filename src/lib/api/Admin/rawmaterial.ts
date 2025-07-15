import {api} from '@/utils/axios';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const addRawMaterialCategory = async (
  id: string,
  data: {name: string},
) => {
  try {
    const res = await api.post(
      `/admin/rawMaterialCategory/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
      data,
    );
    console.log('Response:', res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to add Raw Material category',
      );
    }
    throw error;
  }
};

export const useGetRawMaterialCategoriesAdmin = () => {
  return useQuery({
    queryKey: ['raw-material-categories'],
    queryFn: async () => {
      const res = await api.get('/admin/rawMaterialCategory');
      return res.data;
    },
  });
};

export const getRawMaterialCategoriesAdmin = async (id: string) => {
  console.log('id', id);
  try {
    const res = await api.get(
      `/admin/rawMaterialCategory/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
    );
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to fetch Raw Material categories',
      );
    }
    throw error;
  }
};

export const getCategorydata = async (id: string) => {
  try {
    const res = await api.get(
      `/admin/rawMaterialCategory/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
    );
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to fetch Raw Material categories',
      );
    }
    throw error;
  }
};

export const addRawMaterialAdmin = async (
  data: {
    name: string;
    unit: string;
    price: number;
    rawMaterialCategoryId: string;
  },
  id: string,
) => {
  try {
    const res = await api.post(
      `/admin/rawMaterial/${id || '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5'}`,
      data,
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to add Raw Material',
      );
    }
    throw error;
  }
};
