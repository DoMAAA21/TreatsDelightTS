import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
const DefaultLayout = () => {


    return (
        <>
            <div className="w-full">
                {/* <Navbar /> */}
            </div>
            {/* <div className="p-4 w-full h-full">
               
            </div> */}
            <Outlet />
        </>

    );
};

export default DefaultLayout;
