import { Outlet } from 'react-router-dom';
import Navbar from './navbar';


const DefaultLayout = () => {


    return (
        <>
            <div className="w-full">
                <Navbar />
            </div>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </>

    );
};

export default DefaultLayout;
