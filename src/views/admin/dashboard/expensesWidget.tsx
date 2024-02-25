import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import RentIcon from '../../../assets/svg/rentSign.svg';
import FaucetIcon from '../../../assets/svg/faucet.svg';
import PlugIcon from '../../../assets/svg/plug.svg';


const ExpensesWidget = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { store } = useAppSelector((state) => state.storeDetails);

    useEffect(() => {
        if (user?.store?.storeId) {
            dispatch(getStoreDetails(user.store.storeId));
        }
    }, [dispatch]);

    const expenses = [
        { title: 'Rent', qty: store?.rent, icon: RentIcon },
        { title: 'Electricity', qty: store?.electricity, icon: PlugIcon, },
        { title: 'Water', qty: store?.water, icon: FaucetIcon, },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((exp, index) => (
                <div
                    key={index}
                    className="bg-white lg:p-6 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex items-center"
                    style={{ height: "fit-content" }}
                >
                    <div className="bg-indigo-400 p-4 w-16 h-16 rounded-full mr-4 flex-shrink-0 transition-transform hover:scale-110">
                        <img className="w-10 h-10 pb-2" src={exp.icon} alt="widget logo" />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-semibold">
                            <span className="text-lg font-bold mb-2" style={{ color: (exp.qty || 0) < 0 ? 'red' : 'green' }}>
                                {((exp.qty || 0) < 0 ? `-₱${Math.abs(exp.qty || 0)}` : `₱${exp.qty || 0}`)} </span>
                            <p> {exp.title}</p>
                        </h2>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ExpensesWidget;
