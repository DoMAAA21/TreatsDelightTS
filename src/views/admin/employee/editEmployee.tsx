import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useChangeImage from '../../../hooks/useChangeImage';
import { getEmployeeDetails, clearEmployee } from '../../../store/reducers/employee/employeeDetailsSlice';
import { updateEmployee, updateEmployeeReset, clearErrors} from '../../../store/reducers/employee/employeeSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { colors } from '../../../components/theme';
import { religions } from '../../../components/inputs';
import FormSkeletonLoader from '../../../components/FormLoader';
import defaultAvatar from '../../../assets/defaultavatar.png';
import { successMsg, errorMsg} from '../../../components/toast';






interface EmployeeFormData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    religion: string;
    avatar: File | Blob | string | null;
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

    const { employee, loading: employeeLoading } = useAppSelector((state) => state.employeeDetails)
    const { loading, isUpdated, error } = useAppSelector((state) => state.employee);
    const { imagePreview, compressedImage, handleImageChange, setImagePreview } = useChangeImage(defaultAvatar);



    useEffect(() => {

        if (employee && employee.avatar && employee.avatar.url) {
            setImagePreview(employee?.avatar?.url);
        }

        if (id !== undefined && employee && employee._id !== id) {
            dispatch(getEmployeeDetails(id));
        }



        if (error) {
            errorMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg('Employee updated successfully');
            navigate('/admin/employee-all');
            dispatch(updateEmployeeReset());
            dispatch(clearEmployee());
        }




    }, [dispatch, id, employee, isUpdated])

    const initialValues = {
        fname: employee?.fname || '',
        lname: employee?.lname || '',
        email: employee?.email || '',
        password: '',
        role: employee?.role || '',
        course: employee?.course || '',
        religion: employee?.religion || '',
        avatar: '',
    };

    const onSubmit = (data: EmployeeFormData) => {
        const employeeData: EmployeeFormData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            religion: data.religion,
            role: 'Owner',
            avatar: compressedImage,
        };
        if (id) {
            dispatch(updateEmployee({ id, employeeData }));
        }
    };

    if (employeeLoading) {
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
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                                <div className="flex-1">
                                    <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <Field
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="fname" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="lname" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                                    Religion
                                </label>
                                <Field
                                    as="select"
                                    id="religion"
                                    name="religion"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                >
                                    <option value="" disabled>Select religion</option>
                                    {religions.map(religion => (
                                        <option key={religion.label} value={religion.value}>{religion.label}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="religion" component="div" className="text-red-500" />
                            </div>



                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>


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
