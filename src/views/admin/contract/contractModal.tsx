import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { updateContract } from '../../../store/reducers/contract/contractSlice';
import { getStoreDetails } from '../../../store/reducers/store/storeDetailsSlice';
import { colors } from '../../../components/theme';
import Datepicker from 'tailwind-datepicker-react'
import { options } from '../../../components/DatePickerOptions';


interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string | number;
}
interface FormData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;
    file: File | null;
}

const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, id }) => {
    const dispatch = useAppDispatch();
    const { store } = useAppSelector(state => state.storeDetails);
    const { loading } = useAppSelector(state => state.contract);
    const [showStartedAt, setShowStartedAt] = useState(false);
    const [showExpiration, setShowExpiration] = useState(false);

    const [startedAt, setStartedAt] = useState(new Date());
    const [expiration, setExpiration] = useState(new Date());
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (id !== undefined && store && store._id !== id && id !== "" && isOpen) {
            dispatch(getStoreDetails(id));
        }
    }, [dispatch, id, isOpen, store]);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (id) {
            const contractData: FormData = {
                storeId: id,
                startedAt,
                expiration,
                file
            };
            dispatch(updateContract(contractData))
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50">
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

                                    <div className="mb-2">
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                            Contract (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            accept="application/pdf"
                                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
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
