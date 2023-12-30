import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import Compressor from 'compressorjs';
// import { newUserReset, newUser } from '../../../store/reducers/auth/newUserSlice';
import defaultAvatar from '../../../assets/defaultavatar.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: string;
  course: string;
  religion: string;
  store?: string;
  avatar: string;
}

const validationSchema = Yup.object({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  religion: Yup.string().required('Religion is required'),
  course: Yup.string().required('Course is required'),
  role: Yup.string().required('Role is required'),
});



const AddUserPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, success } = useSelector((state: any) => state.newUser);
  const [avatar, setAvatar] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatar);

  const initialValues: FormData = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    role: '',
    course: '',
    religion: '',
    avatar: '',
  };

//   useEffect(() => {

//     if (error) {
//       errorMsg(error);
//       dispatch(newUserReset());
//     }

//     if (success) {
//       navigate('/dashboard/users');
//       dispatch(newUserReset());
//       successMsg('User created successfully');
//     }
//   }, [dispatch, error, success, navigate]);

  const onSubmit = (data: FormData) => {
    const userData: FormData = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
      course: data.course,
      religion: data.religion,
      role: data.role,
      avatar,
      store: data.store || '', // Include store only if it exists
    };

    if (data.role === "Employee" && data.store) {
      const selectedStoreValue = data.store.split('-');
      const storeId = selectedStoreValue[0];
      userData.store = storeId;
    }

    dispatch(newUser(userData));
  };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.name === "avatar") {
//       const file = e.target.files && e.target.files[0];

//       if (file) {
//         new Compressor(file, {
//           quality: 0.6,
//           maxWidth: 800,
//           maxHeight: 800,
//           success(result) {
//             const reader = new FileReader();
//             reader.onload = () => {
//               if (reader.readyState === 2) {
//                 setAvatarPreview(reader.result as string);
//                 setAvatar(reader.result as string);
//               }
//             };
//             reader.readAsDataURL(result);
//           },
//           error(err) {
//             console.error('Image compression error:', err);
//           },
//         });
//       }
//     }
//   };

  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Field
                type="text"
                id="fname"
                name="fname"
                className="mt-1 p-2 border rounded-md w-full"
              />
              <ErrorMessage name="fname" component="div" className="text-red-500" />
            </div>

            {/* Repeat the above pattern for other form fields... */}

            <div className="flex items-center mt-4">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    // src={avatarPreview}
                    className="rounded-circle"
                    alt="Avatar Preview"
                    width={200}
                    height={200}
                  />
                </figure>
              </div>
              <div className="custom-file">
                <Field
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="avatar"
                  accept="image/*"
                //   onChange={onChange}
                  required
                  style={{ display: 'none' }}
                />
              </div>
              <label
                htmlFor="avatar"
                className="bg-blue-500 px-4 py-2 text-white rounded cursor-pointer"
              >
                Choose Avatar
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
            //   disabled={loading}
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddUserPage;
