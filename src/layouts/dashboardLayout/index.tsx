import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';


const DashboardLayout = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="top-0 z-50 sticky">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      </div>
      <div className="flex w-full h-screen">
        <div className="lg:ml-64 w-full h-full">
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
          <div className="bg-[#ebf0f7] lg:min-h-screen ">
            <div className="px-4 pt-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
