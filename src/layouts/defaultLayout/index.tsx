import { Outlet } from 'react-router-dom';
import Navbar from './navbar';


const DefaultLayout = () => {


    return (
        <>
            <div className="w-full top-0 z-50 sticky">
                <Navbar />
            </div>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </>

    );
};

export default DefaultLayout;
