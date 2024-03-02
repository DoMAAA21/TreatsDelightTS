import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { useAppDispatch } from '../../../hooks';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import BlankLogo from '../../../assets/blanklogo.png';

interface ViewContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string | number;
}


const ViewContractModal: React.FC<ViewContractModalProps> = ({ isOpen, onClose, id }) => {
    const dispatch = useAppDispatch();
    const { store } = useAppSelector(state => state.storeDetails);
    const [contractImage, setContractImage] = useState("");

    useEffect(() => {
        if (id != "" && isOpen) {
            dispatch(getStoreDetails(id));
        }
        const imageUrl = store?.contract?.url ?? BlankLogo;
        setContractImage(imageUrl);

        if(!isOpen){
            setContractImage("")
        }
    }, [dispatch, id, store, isOpen])



    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
                        <div className="z-50 bg-white p-2 rounded-lg shadow-md lg:w-3/4 w-11/12">
                            <div className="flex items-center justify-end">
                                <div className="flex items-center">
                                    <button onClick={onClose} className="text-white rounded-3xl p-1 px-3 bg-red-500 hover:bg-red-700">
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="p-2 flex justify-center">
                                <h1></h1>
                                <div className="flex items-center mt-4">
                                    <div className="w-full h-full">
                                        <figure className="mr-3 item-rtl">
                                            <img
                                                src={contractImage}
                                                className="w-auto h-full object-contain rounded-lg"
                                                alt="Avatar Preview"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            )}
        </>
    );
};

export default ViewContractModal;
