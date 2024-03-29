import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNav } from './config';
import Logo from '../../assets/logo.png';
import { successMsg } from '../../components/toast';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import { clearCart } from '../../store/reducers/cart/cartSlice';
import { clearNotifications } from '../../store/reducers/notification/allNotificationsSlice';
import Cart from '../../assets/icons/cart.svg';
import Bell from '../../assets/icons/bell.svg';
import NotificationPopup from '../notification/notificationPopup';


const Navbar: React.FC = () => {
  const { navConfig } = useNav();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { unRead } = useAppSelector((state) => state.allNotifications);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);


  const closeMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const toggleDropdown = () => {
    setOptionsOpen(!isOptionsOpen);
    setShowNotificationPopup(false);
  };

  const closeNotificationPopup = () =>{
    setShowNotificationPopup(false);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
    setOptionsOpen(false);
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    dispatch(clearCart());
    dispatch(clearNotifications());
    navigate('/login')
    successMsg("Logged Out Successfully");
  };



  const isLinkActive = (path: string) => {

    const isActiveRoute = location.pathname.startsWith(path);
    return isActiveRoute;
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setOptionsOpen(false);
        setShowNotificationPopup(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOptionsOpen, showNotificationPopup]);

  const allowedOnAdminRoles = ["admin", "owner", "employee", "doctor"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2 border">

          <div className="flex flex-wrap items-center  max-w-screen-xl">

            <Link to="/home" className="flex items-center">
              <img src={Logo} className="h-20 sm:h-16" alt="Logo" />
            </Link>

            <div className="flex items-center lg:order-2 justify-between">
              <Link to="/cart" className="absolute lg:right-40 md:right-32 right-28">
                <img src={Cart} className="w-8 h-8" alt="Cart Icon" />
                {cartItems.length > 0 && (
                  <span className="absolute bottom-4 left-4 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-black">{cartItems.length}</span>
                )}
              </Link>
              {isAuthenticated && (
              <button
                onClick={toggleNotificationPopup}
                className="absolute lg:right-20 md:right-16 right-14"
              >
                <div ref={notificationRef} className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200">
                  <div className="w-5 h-5">
                    <img src={Bell} className="w-full h-full" alt="Notification Bell Icon " />
                    {unRead > 0 && (
                       <span className="absolute bottom-6 left-7 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-black">{unRead}</span>
                    )}
                  </div>
                </div>
              </button>
              )}
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className="hidden items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="pl-10 flex flex-col mt-4 font-medium lg:flex-row lg:space-x-2 lg:mt-0">
                {navConfig.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.path}
                      className={`block py-2 pr-4 pl-4 text-xl ${isLinkActive(item.path) ? 'text-sky-500' : 'text-black'}
                      } hover:text-sky-500`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute lg:flex right-3 lg:top-2 md:top-6 top-6 h-16 items-center z-10" ref={dropdownRef}>
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="h-10 w-10 rounded-full overflow-hidden focus:outline-none"
                >
                  <img src={user?.avatar?.url} alt="User Avatar" className="h-full w-full object-cover" />

                </button>

              ) :
                <div className="bg-indigo-500 rounded-lg px-3 py-2">
                  <a className=" text-md text-white my-3 font-medium cursor-pointer" onClick={() => { navigate('/login') }} >Login</a>
                </div>
              }
              {isOptionsOpen && (
                <div className="absolute top-full w-32 right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2 text-center">
                    <li className="mb-2">
                      <Link to="/me" onClick={() => setOptionsOpen(false)} className="hover:text-indigo-500 cursor-pointer">
                        Profile
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/me/my-orders" onClick={() => setOptionsOpen(false)} className="hover:text-indigo-500 cursor-pointer">
                        My Orders
                      </Link>
                    </li>
                    {user && allowedOnAdminRoles.includes(user.role.toLowerCase())
                      &&
                      (
                        <li className="mb-2">
                          <a className="hover:text-indigo-500 cursor-pointer" onClick={() => { navigate('/admin') }} >Dashboard</a>
                        </li>
                      )}

                    <li>
                      <a className="hover:text-indigo-500 cursor-pointer" onClick={logoutHandler}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}

              <NotificationPopup isOpen={showNotificationPopup} onClose={closeNotificationPopup}/>
            </div>
          </div>

        </nav>


      </header>


      {isMobileMenuOpen && (
        <>
          <div
            className="fixed bg-gray-800 w-full h-full top-16 left-0 opacity-50 z-10 mt-14"
            onClick={closeMobileMenu}
          ></div>
          <div
            className="fixed bg-white w-full lg:hidden transition-all duration-300 mt-0 z-20"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium">
              {navConfig.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={`block py-2 pr-4 pl-4 text-xl ${isLinkActive(item.path) ? 'text-violet-700' : 'text-gray-700'}
                      } hover:text-violet-700`}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>

                </li>
              ))}

            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;