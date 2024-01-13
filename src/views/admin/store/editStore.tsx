import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useChangeImage from '../../../hooks/useChangeImage';
import { getStoreDetails, clearStore } from '../../../store/reducers/store/storeDetailsSlice';
import { updateStore, updateStoreReset, clearErrors } from '../../../store/reducers/store/storeSlice';
import { Formik, Form } from 'formik';
import StoreForm from './storeForm';
import { colors } from '../../../components/theme';
import FormSkeletonLoader from '../../../components/loaders/FormLoader';
import defaultAvatar from '../../../assets/defaultavatar.png';
import { successMsg, errorMsg } from '../../../components/toast';


interface StoreFormData {
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



const EditStorePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { store, loading: storeLoading } = useAppSelector((state) => state.storeDetails)
    const { loading, isUpdated, error } = useAppSelector((state) => state.store);
    const { imagePreview, compressedImage, handleImageChange, setImagePreview } = useChangeImage(defaultAvatar);



    useEffect(() => {

        if (store && store.logo && store.logo.url) {
            setImagePreview(store?.logo?.url);
        }

        if (id !== undefined && store && store._id !== id) {
            dispatch(getStoreDetails(id));
        }


        if (error) {
            errorMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg('Store updated successfully');
            navigate('/admin/store-all');
            dispatch(updateStoreReset());
            dispatch(clearStore());
        }




    }, [dispatch, id, store, isUpdated])

    const initialValues = {
        name: store?.name || '',
        slogan: store?.slogan || '',
        stall: store?.stall || 0,
        location: store?.location || '',
        active: store?.active === true ? 'True' : 'False',
        logo: ''
    }


    const onSubmit = (data: StoreFormData) => {
        const isActive = data.active === "True" ? true : false;
        const storeData: StoreFormData = {
            name: data.name,
            slogan: data.slogan,
            stall: data.stall,
            location: data.location,
            active: isActive,
            logo: compressedImage,
        };
        if (id) {
            dispatch(updateStore({ id, storeData }));
        }
    };

    if (storeLoading) {
        return <FormSkeletonLoader />
    }

    return (
        <div className="flex justify-center">
            <div className="lg:w-100 w-11/12 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Edit Store</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <StoreForm />
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

export default EditStorePage;
