import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';
export const getRawMaterialById = async (id: string) => {
  const res = await api.get(`/admin/rawMaterial/single/${id || STATIC_ID}`);
  return res.data;
};

export const updateRawMaterialAdmin = async ({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    rawMaterialCategoryId: string;
  };
}) => {
  try {
    const response = await api.put(`/admin/rawMaterial/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update raw material',
      );
    }
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
    const response = await api.put(
      `/admin/rawMaterialCategory/${id || STATIC_ID}`,
      data,
    );
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
