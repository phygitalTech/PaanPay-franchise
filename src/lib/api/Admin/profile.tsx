import {api} from '@/utils/axios';
import {AxiosError} from 'axios';

export type profilePayload = {
  email: string;
  password: string;
  phone: string;
  address: string;
  imageFile?: File;
};

export const getProfile = async (id: string) => {
  try {
    const res = await api.get(`/admin/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch profile details',
      );
    }
    throw error;
  }
};

export const updateProfile = async (id: string, data: profilePayload) => {
  try {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    formData.append('password', data.password);

    if (data.imageFile) {
      formData.append('imageFile', data.imageFile);
    }

    const res = await api.put(`/admin/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update profile details',
      );
    }
    throw error;
  }
};

export const getProblemRequest = async (id: string) => {
  try {
    const res = await api.get(`/admin/help/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch problem request',
      );
    }
    throw error;
  }
};
