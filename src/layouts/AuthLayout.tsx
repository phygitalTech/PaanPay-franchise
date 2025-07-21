import {useAuthContext} from '@/context/AuthContext';
import {Navigate, Outlet} from '@tanstack/react-router';

const AuthLayout = () => {
  const {isAuthenticated} = useAuthContext();

  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
