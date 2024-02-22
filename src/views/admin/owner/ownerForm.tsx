import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Field, ErrorMessage } from 'formik';
import { religions } from '../../../components/inputs';
import { fetchAllStores } from '../../../store/reducers/store/allStoressSlice';

const OwnerForm = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector(state => state.allStores);

    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    return (
        <>
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
                <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">
                    Store
                </label>
                <Field
                    as="select"
                    id="store"
                    name="storeId"
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                >
                    <option value="" disabled>Select store</option>
                    {stores.map(store => (
                        <option key={store._id} value={`${store._id}-${store.name}`}>{store.name}</option>
                    ))}
                </Field>
                <ErrorMessage name="storeId" component="div" className="text-red-500" />
            </div>



            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Field
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="username"
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
                    autoComplete="current-password"
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
        </>
    )
}

export default OwnerForm