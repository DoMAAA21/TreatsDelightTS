import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useChangeImage from '../../../hooks/useChangeImage';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { colors } from '../../../components/theme';
import { religions } from '../../../components/inputs';
import { newUser, newUserReset } from '../../../store/reducers/user/newUserSlice';
import { successMsg, errorMsg } from '../../../components/toast';
import defaultAvatar from '../../../assets/defaultavatar.png';


interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  religion: string;
  avatar: File | string | null;
  role: string;
}

const validationSchema = Yup.object({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  religion: Yup.string().required('Religion is required'),
});



const AddUserPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector((state) => state.newUser);
  const { imagePreview, compressedImage, handleImageChange } = useChangeImage(defaultAvatar);

  const initialValues: FormData = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    religion: '',
    avatar: '',
    role: 'Owner'
  };

  useEffect(() => {

    if (error) {
      errorMsg(error);
      dispatch(newUserReset());
    }

    if (success) {
      navigate('/admin/owner-all');
      dispatch(newUserReset());
      successMsg('User created successfully');
    }
  }, [dispatch, error, success, navigate]);

  const onSubmit = (data: FormData) => {
    const userData: FormData = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
      religion: data.religion,
      role: 'Owner',
      avatar: compressedImage,
    };

    dispatch(newUser(userData));
  };

  return (
    <div className="flex justify-center">
      <div className="lg:w-100 w-11/12 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Add Owner</h2>
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
                  Choose Avatar
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

export default AddUserPage;
