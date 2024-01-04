import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useChangeImage from '../../../hooks/useChangeImage';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { colors } from '../../../components/theme';
import { newStore, newStoreReset } from '../../../store/reducers/store/newStoreSlice';
import { successMsg, errorMsg } from '../../../components/toast';
import defaultAvatar from '../../../assets/defaultavatar.png';


interface FormData {
    name: string;
    slogan: string;
    stall: number;
    location: string;
    active: boolean | string;
    logo: File | string | null;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    slogan: Yup.string().required('Slogan is required'),
    stall: Yup.number().min(1, 'Minimum of 1').max(99, 'Maximum of 99'),
    location: Yup.string().required('Location is required'),
    active: Yup.boolean().required('Active or Not'),
});



const AddStorePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useAppSelector((state) => state.newStore);
    const { imagePreview, compressedImage, handleImageChange } = useChangeImage(defaultAvatar);

    const initialValues = {
        name: '',
        slogan: '',
        stall: 0,
        location: '',
        active: '',
        logo: '',
    };

    useEffect(() => {

        if (error) {
            errorMsg(error);
            dispatch(newStoreReset());
        }

        if (success) {
            navigate('/admin/store-all');
            dispatch(newStoreReset());
            successMsg('Store created successfully');
        }
    }, [dispatch, error, success, navigate]);

    const onSubmit = (data: FormData) => {
        const isActive = data.active === "True" ? true : false;
        const storeData: FormData = {
            name: data.name,
            slogan: data.slogan,
            stall: data.stall,
            location: data.location,
            active: isActive,
            logo: compressedImage,
        };

        dispatch(newStore(storeData));
    };

    return (
        <div className="flex justify-center">
            <div className="lg:w-100 w-11/12 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Add Store</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700">
                                    Slogan
                                </label>
                                <Field
                                    type="text"
                                    id="slogan"
                                    name="slogan"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="slogan" component="div" className="text-red-500" />
                            </div>




                            <div className="mb-4">
                                <label htmlFor="stall" className="block text-sm font-medium text-gray-700">
                                    Stall
                                </label>
                                <Field
                                    type="numeric"
                                    id="stall"
                                    name="stall"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="stall" component="div" className="text-red-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                   Location
                                </label>
                                <Field
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="location" component="div" className="text-red-500" />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="active" className="block text-sm font-medium text-gray-700">
                                    Active
                                </label>
                                <Field
                                    as="select"
                                    id="active"
                                    name="active"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="True" >Active</option>
                                    <option value="False" >Not Active</option>

                                </Field>
                                <ErrorMessage name="religion" component="div" className="text-red-500" />
                            </div>


                            <div className="flex items-center mt-4">
                                <div >
                                    <figure className="mr-3 item-rtl">
                                        <img
                                            src={imagePreview}
                                            className="rounded-circle w-64 h-64 object-cover"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <Field
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
                                    Choose Logo
                                </label>
                            </div>

                            <div className="flex justify-center px-2">
                                <button
                                    type="submit"
                                    className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddStorePage;
