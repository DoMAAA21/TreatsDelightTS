import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { newRent } from '../../../store/reducers/rent/newRentSlice';
import { colors } from '../../../components/theme';
import Datepicker from "tailwind-datepicker-react"
import { options } from '../../../components/DatePickerOptions';



interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface FormData {
    amount: number;
    type: string;
    storeId: number | string;
    issuedAt: Date;
    paidAt: Date;

}

const validationSchema = Yup.object({
    amount: Yup.number().min(0.001, 'Minimum of 0.001').required('Amount is required'),
});




const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [showIssuedAt, setShowIssuedAt] = useState(false);
    const [showPaidAt, setShowPaidAt] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [type, setType] = useState("topay");
    const [issuedAt, setIssuedAt] = useState(new Date());
    const [paidAt, setPaidAt] = useState(new Date());

    const initialValues = {
        amount: 0,
        type: 'topay',
        issuedAt: new Date(),
        storeId: '',
        paidAt: new Date()
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setType(selectedValue);
        setIsPaid(selectedValue === 'paid');
    };

   
    const onSubmit = (data: FormData) => {

        if (id) {
            const rentData: FormData = {
                amount: data.amount,
                type,
                storeId: id,
                issuedAt,
                paidAt
            };
            dispatch(newRent(rentData))
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
                                <h2 className="text-2xl font-semibold ml-2 text-indigo-500">Add Rent</h2>
                                <div className="flex items-center">
                                    <button onClick={onClose} className="text-white rounded-3xl p-1 px-3 bg-red-500 hover:bg-red-700">
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="p-2">
                                <h1></h1>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    <Form>
                                        <div className="mb-4">
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                Amount
                                            </label>
                                            <Field
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                            />
                                            <ErrorMessage name="amount" component="div" className="text-red-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                Type
                                            </label>
                                            <select
                                                id="type"
                                                name="type"
                                                className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                                onChange={handleTypeChange}
                                                disabled
                                            >
                                                <option value="" label="Select a type"/>
                                                <option value="topay">To pay</option>
                                                <option value="paid">Paid</option>
                                            </select>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="issuedAt" className="block text-sm font-medium text-gray-700">
                                                Issued At
                                            </label>
                                            <Datepicker options={options} onChange={(date) => setIssuedAt(date)} show={showIssuedAt} setShow={(show) => setShowIssuedAt(show)} value={issuedAt} />
                                        </div>
                                        {isPaid && (
                                            <div className="mb-2">
                                                <label htmlFor="paidAt" className="block text-sm font-medium text-gray-700">
                                                    Paid At
                                                </label>
                                                <Datepicker options={options} onChange={(date) => setPaidAt(date)} show={showPaidAt} setShow={(show) => setShowPaidAt(show)} value={paidAt} />
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}>
                                            Submit
                                        </button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionModal;
