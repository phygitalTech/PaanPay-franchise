import {StatusData} from '@/lib/react-query/Admin/products';
import {api} from '@/utils/axios';
import toast from 'react-hot-toast';

export type ProductPayload = {
  payload: {
    name: string;
    description: string;
    categoryId: string;
    imageFile?: File;
    size: {
      name: string;
      price: number;
      self: number;
      level1: number;
      level2: number;
      extraItems: {
        extraItemsId: string;
        price: number;
      }[];
      rawMaterials: {
        rawMaterialId: string;
        quantity: number;
      }[];
    }[];
  };
};

export const getAllRawMaterial = async (id: string) => {
  try {
    const response = await api.get(`/admin/rawMaterial/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to get products');
    throw error;
  }
};

export const getAllExtraItems = async (id: string) => {
  try {
    const response = await api.get(`/admin/extraItem/${id}`);
    console.log('res extra', response);
    return response;
  } catch (error) {
    toast.error('Failed to get extra item');
    throw error;
  }
};

export const getAllProductCategory = async (id: string) => {
  try {
    const response = await api.get(`/admin/productCategory/${id}`);
    console.log('product res', response);
    return response;
  } catch (error) {
    toast.error('Failed to get product category');
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/admin/product/single/${id}`);
    console.log('one product res', response);
    return response;
  } catch (error) {
    toast.error('Failed to get product');
    throw error;
  }
};

export const saveProduct = async (id: string, data: ProductPayload) => {
  try {
    console.log('fgshgdsgt');
    console.log('form', data);
    const formData = new FormData();

    // Append normal fields
    formData.append('name', data.payload.name);
    formData.append('description', data.payload.description);
    formData.append('categoryId', data.payload.categoryId);
    // Append file (if exists)
    if (data.payload.imageFile) {
      formData.append('imageFile', data.payload.imageFile);
    }

    // Append size as JSON string
    formData.append('size', JSON.stringify(data.payload.size));

    const response = await api.post(`/admin/product/${id}`, formData, {
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

export const updateProduct = async (id: string, data: ProductPayload) => {
  try {
    console.log('form', data);
    const formData = new FormData();
    formData.append('name', data.payload.name);
    formData.append('description', data.payload.description);
    formData.append('categoryId', data.payload.categoryId);
    if (data.payload.imageFile) {
      formData.append('imageFile', data.payload.imageFile);
    }
    formData.append('size', JSON.stringify(data.payload.size));
    const response = await api.put(`/admin/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    toast.error('Failed to update product');
    throw error;
  }
};

export const getAllProduct = async (id: string) => {
  try {
    const response = await api.get(`/admin/product/${id}`);
    return response;
  } catch (error) {
    toast.error('Failed to get product');
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/admin/product/${id}`);
    return response;
  } catch (error) {
    toast.error('Failed to delete product');
    throw error;
  }
};

export const getProductCreationStatus = async (id: string) => {
  try {
    const response = await api.get(`/admin/product/status/${id}`);
    return response;
  } catch (error) {
    toast.error('Failed to get product creation status');
    throw error;
  }
};

export const saveProductCreationStatus = async (
  id: string,
  data: StatusData,
) => {
  try {
    const response = await api.put(`/admin/product/status/${id}`, data);
    return response;
  } catch (error) {
    toast.error('Failed to save product creation status');
    throw error;
  }
};
