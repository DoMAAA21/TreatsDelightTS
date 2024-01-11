import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import FinanceLogo from '../../../assets/svg/finance.svg';
import { fetchAllUsers } from '../../../store/reducers/user/allUsersSlice';

const WidgetNav = () => {
    const dispatch = useAppDispatch();

    const { users, loading } = useAppSelector((state) => state.allUsers);

    const userCount = users.length;
    useEffect(() => {
        dispatch(fetchAllUsers());

    }, [users]);

    const dashboardnavs = [
        { title: 'Total Users', qty: userCount, icon: FinanceLogo, subtitle: 'Subtitle or description 1' },
        { title: 'Clickable Box 2', qty:'', icon: FinanceLogo, subtitle: 'Subtitle or description 2' },
        { title: 'Clickable Box 3', qty:'', icon: FinanceLogo, subtitle: 'Subtitle or description 3' },
        { title: 'Clickable Box 3', qty:'', icon: FinanceLogo, subtitle: 'Subtitle or description 3' },
        { title: 'Clickable Box 3', qty:'', icon: FinanceLogo, subtitle: 'Subtitle or description 3' },
        { title: 'Clickable Box 3', qty:'', icon: FinanceLogo, subtitle: 'Subtitle or description 3' },

    ];

    return (
        <>
            {/* <div className="my-10"> */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 h-40">
                    {dashboardnavs.map((nav, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 lg:p-10 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex flex-col items-center"
                        >
                            <div className="bg-indigo-300 p-4 w-20 h-20 rounded-full mb-4">
                                <img className="w-12 h-12" src={nav.icon} alt="widget logo" />
                            </div>
                            <div className="flex flex-col items-center">
                                <h2 className="text-xl font-semibold">
                                    <span className="text-xl font-bold text-indigo-700 mb-2">{nav.qty} </span>
                                    {nav.title}</h2>
                                <p className="text-gray-600">{nav.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            {/* </div> */}
        </>
    )
}

export default WidgetNav