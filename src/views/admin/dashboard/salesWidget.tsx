import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchSalesThisMonth, fetchSalesToday } from '../../../store/reducers/analytic/salesSlice';
import PesoIcon from '../../../assets/svg/peso.svg';
import MoneyIcon from '../../../assets/svg/money.svg';



const SalesWidget = () => {
    const dispatch = useAppDispatch();
    const { salesThisMonth, salesToday } = useAppSelector((state) => state.sales);


    useEffect(() => {
        dispatch(fetchSalesThisMonth());
        dispatch(fetchSalesToday());
    }, [dispatch]);

    const sales = [
        { title: 'Sales This Month', qty: salesThisMonth, icon: PesoIcon },
        { title: 'Sales Today', qty: salesToday, icon: MoneyIcon, },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {sales.map((sales, index) => (
                <div
                    key={index}
                    className="bg-white lg:p-18 md:p-16 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex"
                >
                    <div className="bg-indigo-400 p-4 w-24 h-24 rounded-full mr-4 flex-shrink-0 transition-transform hover:scale-110">
                        <img className="w-16 h-16 pb-2" src={sales.icon} alt="widget logo" />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-semibold">
                            <span className="text-3xl font-bold mb-2 text-green-700">
                                {`₱${sales.qty ?? 0}`}
                            </span>
                            <p className="text-lg font-semibold"> {sales.title}</p>
                        </h2>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default SalesWidget;
