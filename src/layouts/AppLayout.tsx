import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {useAuthContext} from '@/context/AuthContext';
import {Outlet, useNavigate, useLocation} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

const AppLayout = () => {
  const {isAuthenticated, user} = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({to: '/signin'});
      return;
    }

    if (user?.role === 'ADMIN' && location.pathname === '/') {
      navigate({to: '/'}); // 🛠 redirect to ADMIN dashboard or landing page
    }
  }, [isAuthenticated, user, navigate, location.pathname]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
