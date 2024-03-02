import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNav } from './config';
import Logo from '../../assets/1128logo.png';
import { successMsg } from '../../components/toast';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import Cart from '../../assets/icons/cart.svg';

const Navbar: React.FC = () => {
  const { navConfig } = useNav();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }
  const toggleDropdown = () => {
    setOptionsOpen(!isOptionsOpen);
  };

  const closeDropdown = () => {
    setOptionsOpen(false);
  };

  const logoutHandler = async () => {
    await dispatch(logout());
    navigate('/login')
    successMsg("Logged Out Successfully");
  };

  const isLinkActive = (path: string) => {

    const isActiveRoute = location.pathname.startsWith(path);
    return isActiveRoute;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setOptionsOpen]);

  const allowedOnAdminRoles = ["admin", "owner", "employee"];

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
        <nav className="bg-slate-300 border-gray-200 px-4 lg:px-6 py-2 border">
          <div className="flex flex-wrap items-center  max-w-screen-xl">

            <Link to="/home" className="flex items-center">
              <img src={Logo} className="h-20 sm:h-16" alt="Logo" />
            </Link>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>

            <div className="flex items-center lg:order-2">
              <Link to="/cart" className="absolute right-20">
                <img src={Cart} className="w-8 h-8" alt="Cart Icon" />
                {cartItems.length > 0 && (
                  <span className="absolute bottom-4 left-4 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-black">{cartItems.length}</span>
                )}
              </Link>
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
                      className={`block py-2 pr-4 pl-4 text-xl ${isLinkActive(item.path) ? 'text-lime-950' : 'text-teal-700'}
                      } hover:text-sky-500`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>



          <div className="absolute hidden lg:flex right-3 top-2 h-16  items-center z-10" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                type="button"
                className="h-10 w-10 rounded-full overflow-hidden focus:outline-none"
              >
                {isAuthenticated ? (<img src={user?.avatar?.url} alt="User Avatar" className="h-full w-full object-cover" />) : null}
              </button>
              {isOptionsOpen && (
                <div className="absolute top-full w-32 right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2 text-center">
                    <li className="mb-2">
                    <Link to="/admin/profile" className="hover:text-indigo-500 cursor-pointer">
                      Profile
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
              <li>
                <a className="block py-2 pr-4 pl-4 text-xl text-gray-700 hover:text-violet-700" onClick={logoutHandler}>Logout</a>
              </li>

            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;