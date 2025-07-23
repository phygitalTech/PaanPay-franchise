/* eslint-disable*/

import {catererSchema} from '@/lib/validation/cartererSchema';
import {FieldErrors, FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import GenericButton from '../Forms/Buttons/GenericButton';
import GenericInputField from '../Forms/Input/GenericInputField';
import GenericSearchDropdown from '../Forms/SearchDropDown/GenericSearchDropdown';
import GenericTextArea from '../Forms/TextArea/GenericTextArea';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';
import {profileSchema} from '@/lib/validation/profileSchemas';
import {useAuthContext} from '@/context/AuthContext';
import {useGetProfile, useUpdateProfile} from '@/lib/react-query/Admin/profile';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const {user, role} = useAuthContext();
  // console.log('Profile User :', user);

  const methods = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: '',
      phoneNumber: '',
      address: '',
      email: '',
      password: '',
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {data: profileData} = useGetProfile(user?.id!);
  const {mutateAsync: updateProfile} = useUpdateProfile(user?.id!);

  console.log('profile', profileData);
  // const {data: profiledata} = useGetCaterorById(user?.caterorId || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success('Image selected successfully!');
    }
  };
  useEffect(() => {
    if (profileData) {
      methods.reset({
        fullname: profileData?.data?.user?.Fullname || '',
        phoneNumber: profileData?.data.user?.phone || '',
        address: profileData?.data.address || '',
        email: profileData?.data.user?.email || '',

        //  password: profileData?.data.user?.password,
      });
      setImagePreview(profileData?.data?.image);
    }
  }, [profileData, methods]);

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Data', data);
    updateProfile({
      phone: data.phoneNumber,
      email: data.email,
      address: data.address,
      password: data.password,
      imageFile: imageFile ?? undefined,
    });
    setImagePreview(null);
  };

  const error = (errors: FieldErrors) => {
    console.log('form error', errors);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, error)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">
            Update Your Profile
          </h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="fullname"
              label="Full Name"
              placeholder="Enter your Full Name"
              disabled
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter the Phone Number"
            />
          </div>

          <div className="col-span-12 md:col-span-full">
            <GenericTextArea
              name="address"
              label="Residential Address"
              placeholder="Enter the Residential Address"
            />
          </div>

          {/* <div className="col-span-12 md:col-span-6">
            <GenericSearchDropdown
              name="state"
              label="State"
              options={[
                {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
                {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
                {label: 'Assam', value: 'Assam'},
                {label: 'Bihar', value: 'Bihar'},
                {label: 'Chhattisgarh', value: 'Chhattisgarh'},
                {label: 'Goa', value: 'Goa'},
                {label: 'Gujarat', value: 'Gujarat'},
                {label: 'Haryana', value: 'Haryana'},
                {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
                {label: 'Jharkhand', value: 'Jharkhand'},
                {label: 'Karnataka', value: 'Karnataka'},
                {label: 'Kerala', value: 'Kerala'},
                {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
                {label: 'Maharashtra', value: 'Maharashtra'},
                {label: 'Manipur', value: 'Manipur'},
                {label: 'Meghalaya', value: 'Meghalaya'},
                {label: 'Mizoram', value: 'Mizoram'},
                {label: 'Nagaland', value: 'Nagaland'},
                {label: 'Odisha', value: 'Odisha'},
                {label: 'Punjab', value: 'Punjab'},
                {label: 'Rajasthan', value: 'Rajasthan'},
                {label: 'Sikkim', value: 'Sikkim'},
                {label: 'Tamil Nadu', value: 'Tamil Nadu'},
                {label: 'Telangana', value: 'Telangana'},
                {label: 'Tripura', value: 'Tripura'},
                {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
                {label: 'Uttarakhand', value: 'Uttarakhand'},
                {label: 'West Bengal', value: 'West Bengal'},
                {label: 'Delhi', value: 'Delhi'},
                {label: 'Puducherry', value: 'Puducherry'},
              ]}
              defaultOption=""
            />
          </div> */}

          {/* <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="city"
              label="City"
              placeholder="Enter your City"
            />
          </div> */}

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="email"
              label="Email"
              placeholder="Enter your Email"
              disabled
            />
          </div>
          {/* 
          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="username"
              label="Username"
              placeholder="Enter your Username"
              disabled
            />
          </div> */}

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="password"
              label="Password"
              placeholder="Enter the Password"
              type="password"
            />
          </div>

          {/* <div className="col-span-12 md:col-span-6">
            <input
              type="file"
              {...methods.register('imageFile')}
              className="mt-10 bg-white file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:bg-black"
              multiple={false}
            />
            {imageError && (
              <p className="mt-2 text-sm text-red-600">{imageError}</p>
            )}
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Profile Preview"
                  className="h-auto max-h-48 w-full rounded-md object-cover"
                />
              </div>
            )}
          </div> */}

          <div className="col-span-6">
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Product category image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="dark:border-form-strokedark dark:bg-boxdark"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-52 w-full rounded-lg object-cover dark:border-form-strokedark dark:bg-boxdark"
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <GenericButton type="submit">Save</GenericButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Profile;
