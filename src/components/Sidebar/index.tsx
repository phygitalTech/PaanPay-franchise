/* eslint-disable*/

import {SidebarProps} from '@/types';
import {Link, useLocation} from '@tanstack/react-router';
import {useEffect, useRef, useState} from 'react';
import {FaArrowLeftLong} from 'react-icons/fa6';
import {IoIosArrowDown} from 'react-icons/io';
import {PiSquaresFourLight} from 'react-icons/pi';
import {
  FaHome,
  FaClipboardList,
  FaBoxes,
  FaCogs,
  FaFileAlt,
} from 'react-icons/fa';
import {
  MdCategory,
  MdFastfood,
  MdProductionQuantityLimits,
} from 'react-icons/md';
import {
  GiForkKnifeSpoon,
  GiMaterialsScience,
  GiReceiveMoney,
} from 'react-icons/gi';
import {RiCustomerService2Line} from 'react-icons/ri';
import {HiOutlinePuzzle, HiOutlineUsers} from 'react-icons/hi';
import {BsBoxSeam} from 'react-icons/bs';
import {BiPackage} from 'react-icons/bi';
import {AiOutlineSetting} from 'react-icons/ai';

import SidebarLinkGroup from './SidebarLinkGroup';

import {useAuthContext} from '@/context/AuthContext';
import {useGetProfile} from '@/lib/react-query/Admin/profile';

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const location = useLocation();
  const {pathname} = location;
  const {role, user} = useAuthContext();
  const {data: ProfileData} = useGetProfile(user?.id!);

  const sidebarRoutes = [
    {
      label: 'Home',
      path: '/',
      icon: <FaHome size={22} />,
    },
    {
      label: 'Raw Material',
      icon: <GiMaterialsScience size={22} />,
      subRoutes: [
        {
          label: 'Raw Material Category',
          path: '/rawmaterial/addrawmaterial',
          icon: <MdCategory size={22} />,
        },
        {
          label: 'Raw Material',
          path: '/rawmaterial/rawmaterial',
          icon: <GiMaterialsScience size={22} />,
        },
      ],
    },
    {
      label: 'Extra Items',
      path: '/rawmaterial/extraitemraw',
      icon: <HiOutlinePuzzle size={22} />,
    },
    {
      label: 'Product Category',
      path: '/productcategory/productcategory',
      icon: <MdCategory size={22} />,
    },
    {
      label: 'Products',
      icon: <MdProductionQuantityLimits size={22} />,
      subRoutes: [
        {
          label: 'Add Product',
          path: '/product/saveproduct',
          icon: <BiPackage size={22} />,
        },
        {
          label: 'Product List',
          path: '/productlist',
          icon: <MdProductionQuantityLimits size={22} />,
        },
      ],
    },

    {
      label: 'Franchise product Request',
      path: '/merchantinventorydetails',
      icon: <GiReceiveMoney size={22} />,
    },
    {
      label: 'Purchase Request',
      path: '/request/purchaserequest',
      icon: <GiReceiveMoney size={22} />,
    },

    {
      label: 'Setting',
      path: '/setting/setting',
      icon: <AiOutlineSetting size={22} />,
    },
  ];

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // State to track whether the sidebar is being hovered
  const [isHovered, setIsHovered] = useState(false);
  // Ref for the timeout
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover events
  const handleMouseEnter = () => {
    // Clear any pending timeout to close the sidebar
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsHovered(true);
    setSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing the sidebar
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setSidebarOpen(false);
    }, 300); // 300ms delay before closing
  };

  // Handle click event for mobile (keep original functionality for smaller screens)
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const {target} = event;
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({keyCode}: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <aside
      ref={sidebar}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-black duration-300 ease-in-out dark:bg-boxdark lg:static ${
        sidebarOpen ? 'w-72.5' : 'w-20'
      } ${
        sidebarOpen || sidebarExpanded || isHovered
          ? 'translate-x-0'
          : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between px-4 py-5 lg:py-6">
        <button
          className="flex items-center gap-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <img src={ProfileData?.data?.image} alt="Logo" className="h-18" />
            </div>
          ) : (
            <div className="flex items-center rounded-full bg-white p-1">
              <img
                src={ProfileData?.data?.image}
                alt="Logo"
                className="h-10 w-10"
              />
            </div>
          )}
        </button>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <FaArrowLeftLong className="text-white" size={20} />
        </button>
      </div>

      {/* SIDEBAR MENU */}
      <div className="no-scrollbar flex flex-col overflow-y-auto px-2 duration-300 ease-linear">
        <nav className="mt-4 space-y-1 p-2">
          <ul>
            {sidebarRoutes.map((route, index) =>
              route.subRoutes ? (
                <SidebarLinkGroup
                  key={index}
                  activeCondition={pathname.includes(route.path!)}
                >
                  {(handleClick, open) => (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarOpen) {
                            handleClick();
                          } else {
                            setSidebarOpen(true);
                          }
                          // Ensure sidebar stays open when clicking on subroute buttons
                          handleMouseEnter();
                        }}
                        className={`group flex w-full items-center gap-2.5 rounded px-3 py-2 text-sm font-medium text-white hover:bg-graydark ${
                          pathname.includes(route.path!) ? 'bg-graydark' : ''
                        }`}
                      >
                        {route.icon}
                        {sidebarOpen && route.label}
                        {sidebarOpen && (
                          <IoIosArrowDown
                            className={`ml-auto transform duration-200 ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </button>
                      <div
                        className={`${
                          sidebarOpen && open ? 'block' : 'hidden'
                        } pl-6`}
                        onMouseEnter={handleMouseEnter}
                      >
                        {route.subRoutes.map((subRoute, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subRoute.path}
                            onClick={(e) => {
                              // Don't close sidebar when clicking a sublink
                              e.stopPropagation();
                            }}
                            className="block py-1.5 text-sm text-bodydark2 hover:text-white"
                            activeProps={{
                              className: 'text-white font-semibold',
                            }}
                          >
                            {subRoute.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ) : (
                <li key={index}>
                  <Link
                    to={route.path}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate but don't close sidebar immediately
                    }}
                    className={`group flex items-center gap-2.5 rounded px-3 py-2 text-sm font-medium text-white hover:bg-graydark ${
                      pathname.includes(route.path) ? 'bg-graydark' : ''
                    }`}
                  >
                    {route.icon}
                    {sidebarOpen && route.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
