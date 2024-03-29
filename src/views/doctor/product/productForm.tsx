interface UseProductFormProps {
    formik: {
        values: {
            name: string;
            description: string;
            costPrice: number;
            sellPrice: number;
            stock: number;
            category: string;
            active: string;
        };
        touched: {
            name?: boolean;
            description?: boolean;
            costPrice?: boolean;
            sellPrice?: boolean;
            stock?: boolean;
            category?: boolean;
            active?: boolean;
        };
        errors: {
            name?: string;
            description?: string;
            costPrice?: string;
            sellPrice?: string;
            stock?: string;
            category?: string;
            active?: string;
        };
        setFieldValue: (field: string, value: any) => void;
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    };
}
const ProductForm = ({ formik }: UseProductFormProps) => {

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
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    disabled
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
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    disabled
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
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.costPrice}
                        disabled
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
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sellPrice}
                        disabled
                    />
                    {formik.touched.sellPrice && formik.errors.sellPrice ? (
                        <div className="text-red-500">{formik.errors.sellPrice}</div>
                    ) : null}
                </div>

            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w-full mb-4">
                <div className="w-full sm:w-1/5">

                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stock}
                        disabled
                    />
                    {formik.touched.stock && formik.errors.stock ? (
                        <div className="text-red-500">{formik.errors.stock}</div>
                    ) : null}


                </div>
                <div className="w-full sm:w-4/5">

                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="string"
                        id="category"
                        name="category"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                        disabled
                    />
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-500">{formik.errors.category}</div>
                    ) : null}

                </div>
            </div>


            <div className="mb-4">
                <label htmlFor="active" className="block text-sm font-medium text-gray-700">
                    Active
                </label>
                <select
                    id="active"
                    name="active"
                    className="mt-1 p-2 w-full border border-gray-400 rounded-md text-gray-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.active}
                    disabled
                >
                    <option value="" label="Select active status" />
                    <option value="True" label="Yes" />
                    <option value="False" label="No" />
                </select>
                {formik.touched.active && formik.errors.active ? (
                    <div className="text-red-500">{formik.errors.active}</div>
                ) : null}
            </div>
            
        </>
    )
}

export default ProductForm