import React from 'react';
import {Link, useNavigate} from '@tanstack/react-router';
import {FiMail, FiUser, FiLock, FiPhone} from 'react-icons/fi';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const customerSchema = z.object({
  Fullname: z.string().min(3, 'name is required'),
  email: z.string().min(1, 'email is required'),
  password: z.string().min(8, 'password is required'),
  phone: z.string().min(10, 'username is required'),
});

type formValues = z.infer<typeof customerSchema>;
const SignUp: React.FC = () => {
  const methods = useForm<formValues>({
    resolver: zodResolver(customerSchema),
  });

  const navigator = useNavigate();
  // const {mutateAsync: saveCustomer} = useCustomerSignUp();

  // const onSubmit = async (data: formValues) => {
  //   await saveCustomer(data);
  //   navigator({to: '/signin'});
  //   methods.reset();
  // };
  return (
    <>
      <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign Up
      </h2>

      <form>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              {...methods.register('Fullname')}
              className={`w-full rounded-lg border ${methods.formState.errors.Fullname ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Username (mobile no)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your username"
              {...methods.register('phone')}
              className={`w-full rounded-lg border ${methods.formState.errors.phone ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4.5 top-4">
              <FiUser size={22} />
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...methods.register('email')}
              className={`w-full rounded-lg border ${methods.formState.errors.email ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <FiMail size={22} />
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              {...methods.register('password')}
              className={`w-full rounded-lg border ${methods.formState.errors.password ? 'border-red-500' : 'border-stroke'} bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <FiLock size={22} />
            </span>
          </div>
        </div>

        <div className="mb-5">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/signin" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
