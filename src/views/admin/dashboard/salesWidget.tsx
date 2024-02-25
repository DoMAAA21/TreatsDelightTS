import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import RentIcon from '../../../assets/svg/rentSign.svg';
import PlugIcon from '../../../assets/svg/plug.svg';


const SalesWidget = () => {
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
        // { title: 'Electricity', qty: store?.electricity, icon: PlugIcon, },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {expenses.map((exp, index) => (
                <div
                    key={index}
                    className="bg-white lg:p-18 md:p-16 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex"
                >
                    <div className="bg-indigo-400 p-4 w-20 h-20 rounded-full mr-4 flex-shrink-0 transition-transform hover:scale-110">
                        <img className="w-12 h-12 pb-2" src={exp.icon} alt="widget logo" />
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

export default SalesWidget;
