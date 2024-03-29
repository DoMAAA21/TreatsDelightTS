import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import { successMsg } from '../../components/toast';
import { clearCart } from '../../store/reducers/cart/cartSlice';
import { clearNotifications } from '../../store/reducers/notification/allNotificationsSlice';
import Bell from '../../assets/icons/bell.svg';
import NotificationPopup from '../notification/notificationPopup';


interface NavbarProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Navbar: FC<NavbarProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const { unRead } = useAppSelector((state) => state.allNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setOptionsOpen(!isOptionsOpen);
    setShowNotificationPopup(false);
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
    setOptionsOpen(false);
  };

  const closeNotificationPopup = () =>{
    setShowNotificationPopup(false);
  }

  const logoutHandler  = async () => {
    await dispatch(logout());
    dispatch(clearCart());
    dispatch(clearNotifications());
    navigate('/login')
    successMsg("Logged Out Successfully");
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

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 border-b h-16 w-full relative">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center h-16 lg:order-2">
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
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:order-2"
                aria-controls="mobile-menu-2"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="absolute right-3 top-0 h-16 flex items-center z-10" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="h-10 w-10 rounded-full overflow-hidden focus:outline-none"
                >
                  {isAuthenticated ? (<img src={user?.avatar?.url} alt="User Avatar" className="h-full w-full object-cover" />) : null}
                </button>

                <NotificationPopup isOpen={showNotificationPopup} onClose={closeNotificationPopup}/>
                {isOptionsOpen && (
                  <div className="absolute top-full w-32 right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2 text-center">
                      <li className="mb-2">
                      <Link to="/me" className="hover:text-indigo-500 cursor-pointer">
                        Profile
                      </Link>
                      </li>
                      <li>
                        <a className="hover:text-indigo-500 cursor-pointer" onClick={logoutHandler}>Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
