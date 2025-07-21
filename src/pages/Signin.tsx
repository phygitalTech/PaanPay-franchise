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
    <div className="flex min-h-screen w-screen items-center justify-between bg-white py-12 dark:bg-black">
      <div className="max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-boxdark md:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white">
          Sign In
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Phone Input */}
          <div>
            <label className="mb-2 block font-medium text-black dark:text-white">
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
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              <span className="absolute right-4 top-3.5">
                <FiMail size={20} />
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block font-medium text-black dark:text-white">
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
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              <span className="absolute right-4 top-3.5">
                <FiLock size={20} />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary p-3 text-sm font-semibold text-white transition hover:bg-opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Sign Up Link */}
          <p className="text-gray-600 dark:text-gray-300 mt-6 text-center text-sm">
            Don’t have an account?{' '}
            <Link className="font-medium text-primary" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
