import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useChangeImage from '../../../hooks/useChangeImage';
import { getUserDetails, clearUser } from '../../../store/reducers/user/userDetailsSlice';
import { updateUser, updateUserReset, clearErrors } from '../../../store/reducers/user/userSlice';
import { Formik, Form } from 'formik';
import OwnerForm from './ownerForm';
import { colors } from '../../../components/theme';
import FormSkeletonLoader from '../../../components/loaders/FormLoader';
import defaultAvatar from '../../../assets/defaultavatar.png';
import { successMsg, errorMsg } from '../../../components/toast';






interface UserFormData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    religion: string;
    avatar: File | Blob | string | null;
    storeId: string;
    storeName?: string;
    role: string;
}

const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    religion: Yup.string().required('Religion is required'),
});



const EditOwnerPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { user, loading: userLoading } = useAppSelector((state) => state.userDetails)
    const { loading, isUpdated, error } = useAppSelector((state) => state.user);
    const { imagePreview, compressedImage, handleImageChange, setImagePreview } = useChangeImage(defaultAvatar);



    useEffect(() => {

        if (user && user.avatar && user.avatar.url) {
            setImagePreview(user?.avatar?.url);
        }

        if (id !== undefined && user && user._id !== id) {
            dispatch(getUserDetails(id));
        }



        if (error) {
            errorMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg('Owner updated successfully');
            navigate('/admin/owner-all');
            dispatch(updateUserReset());
            dispatch(clearUser());
        }




    }, [dispatch, id, user, isUpdated])

    const initialValues = {
        fname: user?.fname || '',
        lname: user?.lname || '',
        email: user?.email || '',
        password: '',
        role: user?.role || '',
        course: user?.course || '',
        religion: user?.religion || '',
        storeId: user?.store ? `${user.store.storeId}-${user.store.name}` : '' || '',
        avatar: '',
    };

    const onSubmit = (data: UserFormData) => {

        const [storeId, storeName] = data.storeId.split('-');
        const userData: UserFormData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            religion: data.religion,
            role: 'Owner',
            storeId: storeId,
            storeName: storeName,
            avatar: compressedImage,
        };
        if (id) {
            dispatch(updateUser({ id, userData }));
        }
    };

    if (userLoading) {
        return <FormSkeletonLoader />
    }

    return (
        <div className="flex justify-center">
            <div className="lg:w-100 w-11/12 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Edit Owner</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <OwnerForm />
                            <div className="flex items-center mt-4">
                                <div >
                                    <figure className="mr-3 item-rtl">
                                        <img
                                            src={imagePreview}
                                            className="rounded-circle lg:w-64 lg:h-64 w-60 h-40 object-cover"
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
                                    Choose Avatar
                                </label>
                            </div>

                            <div className="flex justify-center px-2">
                                <button
                                    type="submit"
                                    className={`mt-6 ${colors.primary} py-2 px-4 rounded-lg w-full`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div role="status">
                                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : 'Submit'}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditOwnerPage;
