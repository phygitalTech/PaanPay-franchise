import {Link, useNavigate} from '@tanstack/react-router';
import {FiLock, FiMail} from 'react-icons/fi';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {useAuthContext} from '@/context/AuthContext';
import {useLogin} from '@/lib/react-query/queriesAndMutations/auth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    phone: '',
    password: '',
  });

  const {mutateAsync: login, isPending, isSuccess} = useLogin();
  const {user, isAuthenticated} = useAuthContext();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/';
    }
  }, [isSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.phone || !credentials.password) {
      toast.error('Please enter phone number and password');
      return;
    }

    try {
      await login(credentials);
    } catch (err) {
      // Error already handled in useEffect
    }
  };

  return (
    <>
      <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign In
      </h2>
      <form onSubmit={handleLogin}>
        {/* Phone/Email Input */}
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your phone number"
              value={credentials.phone}
              onChange={(e) =>
                setCredentials({...credentials, phone: e.target.value})
              }
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <span className="absolute right-4 top-4">
              <FiMail size={22} />
            </span>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({...credentials, password: e.target.value})
              }
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <span className="absolute right-4 top-4">
              <FiLock size={22} />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-5">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don’t have an account?{' '}
            <Link className="text-primary" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
    // <div className="mx-auto mt-10 max-w-md">

    // </div>
  );
};

export default SignIn;
