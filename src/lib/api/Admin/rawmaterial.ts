import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

const STATIC_ID = '4d3b46a8-e9b3-4fc8-a2fa-9cf0164569c5';

export const addRawMaterialCategoryAPI = async (data: {name: string}) => {
  try {
    const res = await api.post(`/admin/rawMaterialCategory/${STATIC_ID}`, data);
    // console.log('response data', res);
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

export const getRawMaterialCategoryByIdAPI = async () => {
  try {
    const res = await api.get(`/admin/rawMaterialCategory/${STATIC_ID}`);
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
    const res = await api.put(`/admin/rawMaterialCategory/${id || STATIC_ID}`);
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

export const addRawMaterial = async (data: {
  name: string;
  price: number;
  unit: string;
  rawMaterialCategoryId: string;
}) => {
  try {
    const response = await api.post(`/admin/rawMaterial/${STATIC_ID}`, data);
    //console.log('Raw material added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add raw material:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  const response = await api.get(`/admin/rawMaterialCategory/${STATIC_ID}`);
  // console.log('response dataaaa', response.data);
  return response.data;
};

export const getAllrawmaterial = async () => {
  try {
    const res = await api.get(`/admin/rawMaterial/${STATIC_ID}`);
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

export const addExtraItem = async (data: {name: string; price: number}) => {
  try {
    console.log('eeeeeeeeeeeeeeeeeeadded:', data);

    const response = await api.post(`/admin/extraItem/${STATIC_ID}`, data);
    //console.log('eeeeeeeeeeeeeeeeeeadded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to add raw material:', error);
    throw error;
  }
};

export const fetchExtraItemById = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/${id || STATIC_ID}`);
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
export const fetchExtraItems = async () => {
  try {
    const response = await api.get(`/admin/extraItem/${STATIC_ID}`);
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

export const fetchExtraItemsData = async () => {
  try {
    const response = await api.get(`/admin/extraItem/${STATIC_ID}`);
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
    const response = await api.delete(`/admin/extraItem/${id || STATIC_ID}`);
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
