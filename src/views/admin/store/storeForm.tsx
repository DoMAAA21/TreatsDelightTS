import { Field, ErrorMessage } from "formik"

const StoreForm = () => {
    return (
        <>
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
                <ErrorMessage name="active" component="div" className="text-red-500" />
            </div>
        </>
    )
}

export default StoreForm