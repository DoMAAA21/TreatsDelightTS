import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const DefaultLayout = () => {


    return (
        <div className="max-w-full">
        
            <div  className="w-full top-0 z-50 sticky">
                <Navbar />
            </div>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </div>

    );
};

export default DefaultLayout;