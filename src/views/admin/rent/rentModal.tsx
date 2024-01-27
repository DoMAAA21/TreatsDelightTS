import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { colors } from '../../../components/theme';


interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface FormData {
    amount: number;
    type: string;
}

const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required'),
    type: Yup.string().required('Transaction type is required'),
});

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {

    const initialValues = {
        amount: 0,
        type: '',
    }

    const typeOptions = [{ label: 'To pay', value: 'topay' }, { label: 'Paid', value: 'paid' }];

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50" >
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
                        <div className="z-50 bg-white p-2 rounded-lg shadow-md w-2/5">
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
                                                <option value="" label="Select a type" disabled/>
                                                {typeOptions.map((option) => (
                                                    <option key={option.label} value={option.value} label={option.label} />
                                                ))}
                                            </Field>
                                            <ErrorMessage name="type" component="div" className="text-red-500" />
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
