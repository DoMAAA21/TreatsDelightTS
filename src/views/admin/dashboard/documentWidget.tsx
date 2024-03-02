import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import RentIcon from '../../../assets/svg/rentSign.svg';
import PlugIcon from '../../../assets/svg/plug.svg';


const getExpirationColor = (expireDate: string): string => {
    if (!expireDate) {
        return 'black';
    }
    const differenceInMilliseconds = new Date(expireDate).getTime() - new Date().getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    if (differenceInDays < 0) {
        return 'red';
    } else if (differenceInDays <= 30) {
        return '#FBBF24';
    } else {
        return 'green';
    }
};

const DocumentWidget = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { store } = useAppSelector((state) => state.storeDetails);

    useEffect(() => {
        if (user?.store?.storeId) {
            dispatch(getStoreDetails(user.store.storeId));
        }
    }, [dispatch]);

    const documents = [
        { title: 'Permit expiration', expire: store?.permit?.expiration ? new Date(store.permit.expiration).toISOString().slice(0, 10) : 'Update Your Permit', icon: RentIcon },
        { title: 'Contract expiration', expire: store?.contract?.expiration ? new Date(store.contract.expiration).toISOString().slice(0, 10) : 'Update Your Permit', icon: PlugIcon, },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
                <div
                    key={index}
                    className="bg-white lg:p-2 p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-300 flex items-center"
                    style={{ height: "fit-content" }}
                >

                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-lg font-semibold">
                            <span className="text-lg font-bold  flex" style={{ color: getExpirationColor(doc.expire) }}>
                                {doc.expire}
                            </span>
                            <p className="text-md text-center font-normal">{doc.title}</p>
                        </h2>

                    </div>
                </div>
            ))}
        </div>

    );
};

export default DocumentWidget;
