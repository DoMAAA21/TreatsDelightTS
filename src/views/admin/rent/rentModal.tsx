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

}

const validationSchema = Yup.object({
    amount: Yup.number().min(1,'Minimum of 1').required('Amount is required'),
    type: Yup.string().required('Transaction type is required'),
});




const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [show, setShow] = useState < boolean > (false);
    const [issuedAt, setIssuedAt] = useState(new Date());

   
    const handleChange = (selectedDate: Date) => {
		setIssuedAt(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}
    const initialValues = {
        amount: 0,
        type: '',
        issuedAt: new Date(),
        storeId: ''
    }

    const typeOptions = [{ label: 'To pay', value: 'topay' }, { label: 'Paid', value: 'paid' }];

    const onSubmit = (data: FormData) => {

        if(id){
            const rentData: FormData = {
                amount: data.amount,
                type: data.type,
                storeId: id,
                issuedAt: issuedAt
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
                            <div className="flex justify-end">
                                <button onClick={onClose} className="text-white rounded-3xl p-1 px-3 bg-red-500 hover:bg-red-700">
                                    X
                                </button>
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
                                            <Field
                                                as="select"
                                                id="type"
                                                name="type"
                                                className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                            >
                                                <option value="" label="Select a type" disabled />
                                                {typeOptions.map((option) => (
                                                    <option key={option.label} value={option.value} label={option.label} />
                                                ))}
                                            </Field>
                                            <ErrorMessage name="type" component="div" className="text-red-500" />
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                              Date
                                            </label>
                                            <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} value={issuedAt} />
                                        </div>
                                        
                                        <div className="mb-4">
                                            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                                                Note
                                            </label>
                                            <Field
                                                as="textarea"
                                                id="note"
                                                name="note"
                                                className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                            />
                                            <ErrorMessage name="note" component="div" className="text-red-500" />
                                        </div>



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
