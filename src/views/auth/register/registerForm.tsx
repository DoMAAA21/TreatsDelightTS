import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { colors } from '../../../components/theme';
import { clearErrors, register } from '../../../store/reducers/auth/authenticationSlice';
import { successMsg, topErrorMsg } from '../../../components/toast';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { religions, courses } from '../../../components/inputs';

interface FormData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    religion: string;
    course: string;
    role: string;
}

const validationSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    religion: Yup.string().required('Religion is required'),
    course: Yup.string().required('Course is required'),
});
const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
        if (error) {
            topErrorMsg(error);
            dispatch(clearErrors());
        }
    }, [isAuthenticated, error]);

    const initialValues: FormData = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        religion: '',
        course: '',
        role: 'Customer'
    };


    const onSubmit = (data: FormData) => {
        const userData: FormData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            religion: data.religion,
            course: data.course,
            role: 'Customer',
        };

        dispatch(register(userData)).then(()=>{
            successMsg('Register Success')
        });
    };
    return (
        <div className="mx-auto max-w-xs">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form>
                    <Field
                        type="text"
                        name="fname"
                        placeholder="First Name"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    />
                    <ErrorMessage name="fname" component="div" className="text-red-500  ml-4" />
                    <Field
                        type="text"
                        name="lname"
                        placeholder="Last Name"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <ErrorMessage name="lname" component="div" className="text-red-500  ml-4" />
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500  ml-4" />
                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 ml-4" />
                    <Field
                        as="select"
                        name="religion"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    >
                        <option value="">Select Religion</option>
                        {religions.map(religion => (
                            <option key={religion.value} value={religion.value}>{religion.label}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="religion" component="div" className="text-red-500 ml-4" />
                    <Field
                        as="select"
                        name="course"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.value}  value={course.value}>{course.label}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="course" component="div" className="text-red-500 ml-4" />
                    <button
                        type="submit"
                        className={`mt-5 tracking-wide ${colors.primary} font-semibold w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                        disabled={loading}
                    >
                        <span className="ml-3">{loading ? 'Registering...' : 'Register'}</span>
                    </button>
                </Form>

            </Formik>
        </div>
    );
};

export default RegisterForm;