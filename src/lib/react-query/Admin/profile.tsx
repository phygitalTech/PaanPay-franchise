import {
  getProfile,
  profilePayload,
  updateProfile,
} from '@/lib/api/Admin/profile';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetProfile = (id: string) =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });

export const useUpdateProfile = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: profilePayload) => updateProfile(id, data),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });
};
