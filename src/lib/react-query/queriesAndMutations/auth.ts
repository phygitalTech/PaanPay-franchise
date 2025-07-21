import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  registerUser,
  verifyCode,
  loginUser,
  UpdateUser,
  logoutUser,
  requestRefreshAccessToken,
  changeCurrentPassword,
  resetPassword,
  requestResetPassword,
  getCurrentUser,
  registerAdmin,
} from '@/lib/api/Auth/auth';
import {AUTH_KEYS, QUERY_KEYS} from '../queryKeys'; // assuming you have query keys defined
import toast from 'react-hot-toast';
import {AxiosError} from 'axios';
import {jwtDecode} from 'jwt-decode';
import {unAuthenticatedApi} from '@/utils/axios';

// Hook to register a new user
const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerAdmin,
    onSuccess: () => {
      toast.success('User registered successfully');
      queryClient.invalidateQueries({queryKey: [AUTH_KEYS.GET_CURRENT_USER]});
    },
    onError: (error) => {
      toast.error('Failed to register user: ' + error.message);
    },
  });
};

// Hook to verify the verification code
const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      toast.success('Code verified successfully');
    },
    onError: (error) => {
      toast.error('Code verification failed: ' + error.message);
    },
  });
};

// Hook to log in a user
// export const LogIn = async (data: {phone: string; password: string}) => {
//   try {
//     const response = await unAuthenticatedApi.post('/users/login', data);

//     const decodedToken = jwtDecode(response?.data?.data?.accessToken);
//     localStorage.setItem('token', JSON.stringify(response?.data?.data));
//     localStorage.setItem('user', JSON.stringify(decodedToken));

//     return response.data.data; // Ensure this matches { accessToken: string }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//     throw new Error('An unexpected error occurred');
//   }
// };

export const LogIn = async (data: {phone: string; password: string}) => {
  try {
    const res = await unAuthenticatedApi.post('/users/login', data);

    // Drill down to the real token object
    const token = res.data?.data?.data?.token;
    if (res.data?.data?.data?.role !== 'ADMIN') {
      throw new Error('User is not authorized');
    }
    if (!token?.accessToken) throw new Error('No access token returned');
    console.log('res', res);

    const decoded = jwtDecode(token.accessToken);
    console.log('token', token);
    console.log('decoded');

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(decoded));

    return res.data.data; // { accessToken, refreshToken }
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
    throw err; // already a useful Error object
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: {phone: string; password: string}) => LogIn(data),
    onSuccess: () => {
      toast.success('Login successful');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

// Hook to update a user
const useUpdateUser = () => {
  return useMutation({
    mutationFn: UpdateUser,
    onSuccess: () => {
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update user: ' + error.message);
    },
  });
};

// Hook to log out a user
const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('Logged out successfully');
      queryClient.invalidateQueries({queryKey: [AUTH_KEYS.GET_CURRENT_USER]});
    },
    onError: (error) => {
      toast.error('Failed to logout: ' + error.message);
    },
  });
};

// Hook to refresh access token
const useRequestRefreshAccessToken = () => {
  return useMutation({
    mutationFn: requestRefreshAccessToken,
    onSuccess: () => {
      toast.success('Access token refreshed');
    },
    onError: (error) => {
      toast.error('Failed to refresh access token: ' + error.message);
    },
  });
};

// Hook to change the current password
const useChangeCurrentPassword = () => {
  return useMutation({
    mutationFn: changeCurrentPassword,
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      toast.error('Failed to change password: ' + error.message);
    },
  });
};

// Hook to request password reset
const useRequestResetPassword = () => {
  return useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      toast.success('Password reset request successful');
    },
    onError: (error) => {
      toast.error('Failed to request password reset: ' + error.message);
    },
  });
};

// Hook to reset the password
const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully');
    },
    onError: (error) => {
      toast.error('Failed to reset password: ' + error.message);
    },
  });
};

// Hook to get the current user
const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [AUTH_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export {
  useRegisterUser,
  useVerifyCode,
  useUpdateUser,
  useLogoutUser,
  useRequestRefreshAccessToken,
  useChangeCurrentPassword,
  useRequestResetPassword,
  useResetPassword,
  useGetCurrentUser,
};
