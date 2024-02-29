import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { newPermit } from '../../../store/reducers/permit/permitSlice';
import { colors } from '../../../components/theme';
import Datepicker from "tailwind-datepicker-react"
import { options } from '../../../components/DatePickerOptions';



interface PermitModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface FormData {
    storeId: number | string;
    startedAt: Date;
    expiration: Date;

}

const validationSchema = Yup.object({
    amount: Yup.number().min(1, 'Minimum of 1').required('Amount is required'),
});




const PermitModal: React.FC<PermitModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [showStartedAt, setShowStartedAt] = useState(false);
    const [showExpiration, setShowExpiration] = useState(false);
   
    const [startedAt, setStartedAt] = useState(new Date());
    const [expiration, setExpiration] = useState(new Date());

    const initialValues = {
        amount: 0,
        type: '',
        startedAt: new Date(),
        storeId: '',
        expiration: new Date()
    }

  
   
    const onSubmit = (data: FormData) => {

        if (id) {
            const permitData: FormData = {
                storeId: id,
                startedAt,
                expiration
            };
            dispatch(newPermit(permitData))
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
                                <h2 className="text-2xl font-semibold ml-2 text-indigo-500">Add Permit</h2>
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

export default PermitModal;
