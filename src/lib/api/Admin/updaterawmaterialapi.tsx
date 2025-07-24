import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

export type RawMaterial = {
  name: string;
  price: number;
  unit: string;
  inventory: number;
  sellPrice: number;
  rawMaterialCategoryId: string;
};

export const getRawMaterialById = async (id: string) => {
  const res = await api.get(`/admin/rawMaterial/single/${id}`);
  return res.data;
};

export const updateRawMaterial = async (
  categoryId: string,
  data: RawMaterial,
) => {
  try {
    console.log('edit data', data);
    const response = await api.put(`/admin/rawMaterial/${categoryId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error to save raw material :', error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  const res = await api.get(`/admin/rawMaterialCategory/single/${id}`);
  return res.data;
};

export const updateCategoryAdmin = async ({
  data,
  id,
}: {
  data: {
    name: string;
  };
  id?: string;
}) => {
  try {
    const response = await api.put(`/admin/rawMaterialCategory/${id}`, data);
    //console.log('Category updated:----------', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update category',
      );
    }
    throw error;
  }
};
