import {api} from '@/utils/axios';
import toast from 'react-hot-toast';

export type ProductCatPayload = {
  payload: {
    name: string;
    description: string;
    imageFile?: File;
  };
};

export const saveProductCat = async (id: string, data: ProductCatPayload) => {
  try {
    console.log('fgshgdsgt');
    console.log('form', data);
    const formData = new FormData();

    // Append normal fields
    formData.append('name', data.payload.name);
    formData.append('description', data.payload.description);

    // Append file (if exists)
    if (data.payload.imageFile) {
      formData.append('imageFile', data.payload.imageFile);
    }

    const response = await api.post(`/admin/productCategory/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('product res', response);
    return response;
  } catch (error) {
    toast.error('Failed to add product');
    throw error;
  }
};

export const updateProductCat = async (id: string, data: ProductCatPayload) => {
  try {
    console.log('form', data);
    const formData = new FormData();
    formData.append('name', data.payload.name);
    formData.append('description', data.payload.description);

    if (data.payload.imageFile) {
      formData.append('imageFile', data.payload.imageFile);
    }

    const response = await api.put(`/admin/productCategory/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    toast.error('Failed to update product category');
    throw error;
  }
};

export const getAllProductCategory = async (id: string) => {
  try {
    const response = await api.get(`/admin/productCategory/${id}`);
    console.log('category res', response);
    return response;
  } catch (error) {
    toast.error('Failed to get product category');
    throw error;
  }
};

export const deleteProductCat = async (id: string) => {
  try {
    const response = await api.delete(`/admin/productCategory/${id}`);
    return response;
  } catch (error) {
    toast.error('Failed to delete product category');
    throw error;
  }
};

export const getProductCatById = async (id: string) => {
  try {
    const response = await api.get(`/admin/productCategory/single/${id}`);
    console.log('one product res', response);
    return response;
  } catch (error) {
    toast.error('Failed to get product category');
    throw error;
  }
};
