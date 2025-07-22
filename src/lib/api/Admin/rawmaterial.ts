import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

export type Payload = {
  name: string;
};
export const addRawMaterialCategoryAPI = async (id: string, data: Payload) => {
  try {
    console.log('id', id);
    const res = await api.post(`/admin/rawMaterialCategory/${id}`, data);

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to add category',
      );
    }
    throw error;
  }
};

export const getRawMaterialCategoryByIdAPI = async (id: string) => {
  try {
    const res = await api.get(`/admin/rawMaterialCategory/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch category',
      );
    }
    throw error;
  }
};

export const deleteRawMaterialCategoryAPI = async (id: string) => {
  try {
    const res = await api.delete(`/admin/rawMaterialCategory/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete category',
      );
    }
    throw error;
  }
};

export const addRawMaterial = async (
  id: string,
  data: {
    name: string;
    price: number;
    unit: string;
    rawMaterialCategoryId: string;
  },
) => {
  try {
    const response = await api.post(`/admin/rawMaterial/${id}`, data);
    //console.log('Raw material added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add raw material:', error);
    throw error;
  }
};

export const fetchCategories = async (id: string) => {
  const response = await api.get(`/admin/rawMaterialCategory/${id}`);
  // console.log('response dataaaa', response.data);
  return response.data;
};

export const getAllrawmaterial = async (id: string) => {
  try {
    const res = await api.get(`/admin/rawMaterial/${id}`);
    //console.log('response dataaaa', res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch raw material',
      );
    }
    throw error;
  }
};

export const deleteRawMaterialAdmin = async (id: string) => {
  try {
    const response = await api.put(`/admin/rawMaterial/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete raw material',
      );
    }
    console.error('Failed to delete raw material:', error);
    throw error;
  }
};

export const addExtraItem = async (
  id: string,
  data: {name: string; price: number},
) => {
  try {
    console.log('eeeeeeeeeeeeeeeeeeadded:', data);

    const response = await api.post(`/admin/extraItem/${id}`, data);
    //console.log('eeeeeeeeeeeeeeeeeeadded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add raw material:', error);
    throw error;
  }
};

export const fetchExtraItemById = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/${id}`);
    //console.log('Fetched extra itemmmmmmmmmmm:', response.data);
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
export const fetchExtraItems = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/${id}`);
    //console.log('Fetched extra items:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch extra items',
      );
    }
    throw error;
  }
};

export const fetchExtraItemsData = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/${id}`);
    //console.log('Fetched extra itemsssssss:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch extra items',
      );
    }
    throw error;
  }
};
export const deleteExtraItem = async (id: string) => {
  try {
    const response = await api.delete(`/admin/extraItem/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete extra item',
      );
    }
    console.error('Failed to delete extra item:', error);
    throw error;
  }
};
