import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllUsers } from '../../../store/reducers/user/allUsersSlice';
import FinanceLogo from '../../../assets/svg/finance.svg';
import UsersLogo from '../../../assets/svg/users.svg';

const WidgetNav = () => {
    const dispatch = useAppDispatch();
    const [count, setCount] = useState(0);

    const { users, loading } = useAppSelector((state) => state.allUsers);

    const userCount = users.length;

    useEffect(() => {
        dispatch(fetchAllUsers());

        const interval = setInterval(() => {
            setCount((prevCount) => {
                const newCount = prevCount + 1;
                return newCount <= userCount ? newCount : userCount;
            });
        }, 10);

        console.log('hatdog')

        return () => clearInterval(interval);
    }, [dispatch, userCount]);

    const dashboardnavs = [
        { title: 'Total Users', qty: count, icon: UsersLogo, subtitle: 'Using this app.' },
        { title: 'Clickable Box 2', qty: '', icon: FinanceLogo, subtitle: 'Subtitle or description 2' },
        { title: 'Clickable Box 3', qty: '', icon: FinanceLogo, subtitle: 'Subtitle or description 3' },
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
