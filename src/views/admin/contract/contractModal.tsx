import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { useAppDispatch } from '../../../hooks';
import { updateContract } from '../../../store/reducers/contract/contractSlice';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import { colors } from '../../../components/theme';
import Datepicker from 'tailwind-datepicker-react'
import { options } from '../../../components/DatePickerOptions';
import useChangeImage from '../../../hooks/useChangeImage';
import BlankLogo from '../../../assets/blanklogo.png';

interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string | number;
}
interface FormData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;
    image : File | null ;

}





const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, id }) => {
    const dispatch = useAppDispatch();
    const { store } = useAppSelector(state => state.storeDetails);
    const [showStartedAt, setShowStartedAt] = useState(false);
    const [showExpiration, setShowExpiration] = useState(false);

    const [startedAt, setStartedAt] = useState(new Date());
    const [expiration, setExpiration] = useState(new Date());
    const { imagePreview, compressedImage, handleImageChange, setImagePreview } = useChangeImage(BlankLogo);



    useEffect(() => {
        if (id !== undefined && store && store._id !== id && id !== "" && isOpen) {
            dispatch(getStoreDetails(id));
        }
        const imageUrl = store?.contract?.url ?? BlankLogo;
        setImagePreview(imageUrl);
       
    }, [dispatch, id, store])

    const onSubmit :  React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (id) {
            const contractData: FormData = {
                storeId: id,
                startedAt,
                expiration,
                image: compressedImage
            };
            dispatch(updateContract(contractData))
        }

    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50" >
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
                        <div className="z-50 bg-white p-2 rounded-lg shadow-md lg:w-2/5 w-4/5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold ml-2 text-indigo-500">Update Store Contract</h2>
                                <div className="flex items-center">
                                    <button onClick={onClose} className="text-white rounded-3xl p-1 px-3 bg-red-500 hover:bg-red-700">
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="p-2">
                                <h1></h1>
                               
                                    <form onSubmit={onSubmit}>

                                        <div className="mb-2">
                                            <label htmlFor="startedAt" className="block text-sm font-medium text-gray-700">
                                                Started At
                                            </label>
                                            <Datepicker options={options} onChange={(date) => setStartedAt(date)} show={showStartedAt} setShow={(show) => setShowStartedAt(show)} value={startedAt} />
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                                                Expiration
                                            </label>
                                            <Datepicker options={options} onChange={(date) => setExpiration(date)} show={showExpiration} setShow={(show) => setShowExpiration(show)} value={expiration} />
                                        </div>

                                        <div className="flex items-center mt-4">
                                            <div >
                                            <label htmlFor="startedAt" className="block text-sm font-medium text-gray-700">
                                                Contract
                                            </label>
                                                <figure className="mr-3 item-rtl">
                                                    <img
                                                        src={imagePreview}
                                                        className="rounded-circle w-64 h-64 object-cover"
                                                        alt="Avatar Preview"
                                                    />
                                                </figure>
                                            </div>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    className="custom-file-input"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                            <label
                                                htmlFor="image"
                                                className="bg-blue-500 px-4 py-2 text-white rounded cursor-pointer"
                                            >
                                                Choose File
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}>
                                            Submit
                                        </button>
                                    </form>
                              
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContractModal;
