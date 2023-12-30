import { Outlet } from 'react-router-dom';
import Navbar from './navbar';


const DefaultLayout = () => {


    return (
        <>
            <Navbar />
            <div className="p-4 w-full h-full">
                <Outlet />
            </div>
        </>

    );
};

export default DefaultLayout;
