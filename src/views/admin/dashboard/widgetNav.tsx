import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllUsers } from '../../../store/reducers/user/allUsersSlice';
import UsersLogo from '../../../assets/svg/users.svg';
import SalesLogo from '../../../assets/svg/sales.svg';

const WidgetNav = () => {
    const dispatch = useAppDispatch();


    const { users } = useAppSelector((state) => state.allUsers);

    const userCount = users.length;

    useEffect(() => {
        dispatch(fetchAllUsers());

        
    }, [dispatch]);

    const dashboardnavs = [
        { title: 'Total Users', qty: userCount, icon: UsersLogo, subtitle: 'Using this app.' },
        { title: 'Total Sales', qty: '$50000', icon: SalesLogo, subtitle: 'Using this app' },
        { title: 'Total Orders', qty: 125, icon: UsersLogo, subtitle: 'Made in this app' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardnavs.map((nav, index) => (
                <div
                    key={index}
                    className="bg-gray-100 lg:p-10 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex flex-col items-center"
                >
                    <div className="bg-indigo-400 p-4 w-20 h-20 rounded-full mb-4 transition-transform hover:scale-110">
                        <img className="w-12 h-12" src={nav.icon} alt="widget logo" />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold">
                            <span className="text-xl font-bold text-indigo-700 mb-2">{nav.qty} </span>
                            {nav.title}
                        </h2>
                        <p className="text-gray-600">{nav.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WidgetNav;
