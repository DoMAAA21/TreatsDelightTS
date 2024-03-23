import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { newElectricity } from '../../../store/reducers/electricity/newElectricitySlice';
import { colors } from '../../../components/theme';
import Datepicker from "tailwind-datepicker-react"
import { options } from '../../../components/DatePickerOptions';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    consumed: number;
    price: number;
    additionals: number;
    total: number;
    type: string;
    storeId: number | string;
    issuedAt: Date;
    startAt: Date;
    endAt: Date;
    paidAt: Date;

}

const validationSchema = Yup.object({
    consumed: Yup.number().min(0.001, 'Minimum of 0.001').required('Consumed is required'),
    price: Yup.number().min(0, 'Minimum of 0').required('Price is required'),
});




const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { loading } = useAppSelector(state => state.newElectricity);
    const [showIssuedAt, setShowIssuedAt] = useState(false);
    const [showPaidAt, setShowPaidAt] = useState(false);
    const [showStartAt, setShowStartAt] = useState(false);
    const [showEndAt, setShowEndAt] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [type, setType] = useState("topay");
    const [issuedAt, setIssuedAt] = useState(new Date());
    const [paidAt, setPaidAt] = useState(new Date());
    const [startAt, setStartAt] = useState(new Date());
    const [endAt, setEndAt] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())); //add 1 month

    const initialValues = {
        consumed: 0,
        price: 0,
        additionals: 0,
        total: 0,
        type: 'topay',
        issuedAt: new Date(),
        storeId: '',
        paidAt: new Date(),
        startAt: new Date(),
        endAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setType(selectedValue);
        setIsPaid(selectedValue === 'paid');
    };


    const onSubmit = (data: FormData) => {

        if (id) {
            const electricityData: FormData = {
                consumed: data.consumed,
                price: data.price,
                additionals: data.additionals,
                total: data.total,
                type: type,
                storeId: id,
                issuedAt,
                startAt,
                endAt,
                paidAt
            };
            dispatch(newElectricity(electricityData))
        }

    };

    const calculateTotal = (values: FormData) => {
        const consumed = values.consumed || 0;
        const price = values.price || 0;
        const additionals = values.additionals || 0;
        return (consumed * price) + additionals;
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50" >
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
                        <div className="z-50 bg-white p-2 rounded-lg shadow-md lg:w-2/5 w-4/5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold ml-2 text-indigo-500">Add Electricity</h2>
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
                                    {({ values, handleChange, setFieldValue }) => (
                                        <Form>
                                            <div className="mb-4 flex">
                                                <div className="flex-1 mr-2">
                                                    <label htmlFor="consumed" className="block text-sm font-medium text-gray-700">
                                                        Consumed
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id="consumed"
                                                        name="consumed"
                                                        className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            handleChange(e);
                                                            setFieldValue('total', calculateTotal({ ...values, consumed: parseFloat(e.target.value) }));
                                                        }}
                                                    />
                                                    <ErrorMessage name="consumed" component="div" className="text-red-500" />
                                                </div>

                                                <div className="flex-1">
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                        Price per watts
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id="price"
                                                        name="price"
                                                        className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            handleChange(e);
                                                            setFieldValue('total', calculateTotal({ ...values, price: parseFloat(e.target.value) }));
                                                        }}
                                                    />
                                                    <ErrorMessage name="price" component="div" className="text-red-500" />
                                                </div>
                                            </div>


                                            <div className="mb-4">
                                                <label htmlFor="additionals" className="block text-sm font-medium text-gray-700">
                                                    Additionals/ Deductions
                                                </label>
                                                <Field
                                                    type="number"
                                                    id="additionals"
                                                    name="additionals"
                                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"

                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        handleChange(e);
                                                        setFieldValue('total', calculateTotal({ ...values, additionals: parseFloat(e.target.value) }));
                                                    }}
                                                />
                                                <ErrorMessage name="additionals" component="div" className="text-red-500" />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                                                    Total
                                                </label>
                                                <Field
                                                    type="number"
                                                    id="total"
                                                    name="total"
                                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                                    disabled
                                                />

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
                                                    <option value="" label="Select a type" disabled />
                                                    <option value="topay">To pay</option>
                                                    <option value="paid">Paid</option>
                                                </select>
                                            </div>

                                            
                                            <div className="flex flex-wrap -mx-2">
                                                <div className="w-full md:w-1/2 px-2 mb-2">
                                                    <label htmlFor="startAt" className="block text-sm font-medium text-gray-700">
                                                        Start At
                                                    </label>
                                                    <Datepicker options={options} onChange={(date) => setStartAt(date)} show={showStartAt} setShow={(show) => setShowStartAt(show)} value={startAt} />
                                                </div>

                                                <div className="w-full md:w-1/2 px-2 mb-2">
                                                    <label htmlFor="endAt" className="block text-sm font-medium text-gray-700">
                                                        End At
                                                    </label>
                                                    <Datepicker options={options} onChange={(date) => setEndAt(date)} show={showEndAt} setShow={(show) => setShowEndAt(show)} value={endAt} />
                                                </div>

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
                                                disabled={loading}
                                                className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}>
                                                {loading ? '...' : 'Submit'}
                                            </button>
                                        </Form>
                                    )}
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
