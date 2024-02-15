
interface UseMealFormProps {
    formik: {
        values: {
            name: string;
            description: string;
            costPrice: number;
            sellPrice: number;
            active: string;
            halal: string;
        };
        touched: {
            name?: boolean;
            description?: boolean;
            costPrice?: boolean;
            sellPrice?: boolean;
            stock?: boolean;
            active?: boolean;
            halal?: boolean;
        };
        errors: {
            name?: string;
            description?: string;
            costPrice?: string;
            sellPrice?: string;
            active?: string;
            halal?: string;
        };
        setFieldValue: (field: string, value: any) => void;
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    };
}
const MealForm = ({ formik }: UseMealFormProps) => {

    return (
        <>
            <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">{formik.errors.description}</div>
                ) : null}
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                <div className="flex-1">
                    <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">
                        Cost Price
                    </label>
                    <input
                        type="number"
                        id="costPrice"
                        name="costPrice"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.costPrice}
                    />
                    {formik.touched.costPrice && formik.errors.costPrice ? (
                        <div className="text-red-500">{formik.errors.costPrice}</div>
                    ) : null}
                </div>

                <div className="flex-1">
                    <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
                        Sell Price
                    </label>
                    <input
                        type="number"
                        id="sellPrice"
                        name="sellPrice"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sellPrice}
                    />
                    {formik.touched.sellPrice && formik.errors.sellPrice ? (
                        <div className="text-red-500">{formik.errors.sellPrice}</div>
                    ) : null}
                </div>

            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                <div className="flex-1">
                    <label htmlFor="active" className="block text-sm font-medium text-gray-700">
                        Active
                    </label>
                    <select
                        id="active"
                        name="active"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.active}
                    >
                        <option value="" label="Select active status" />
                        <option value="True" label="Active" />
                        <option value="False" label="Not active" />
                    </select>
                    {formik.touched.active && formik.errors.active ? (
                        <div className="text-red-500">{formik.errors.active}</div>
                    ) : null}
                </div>

                <div className="flex-1">
                    <label htmlFor="halal" className="block text-sm font-medium text-gray-700">
                        Halal
                    </label>
                    <select
                        id="halal"
                        name="halal"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.halal}
                    >
                        <option value="" label="Select" />
                        <option value="True" label="Halal" />
                        <option value="False" label="Not Halal" />
                    </select>
                    {formik.touched.halal && formik.errors.halal ? (
                        <div className="text-red-500">{formik.errors.halal}</div>
                    ) : null}
                </div>
            </div>


        </>
    )
}

export default MealForm