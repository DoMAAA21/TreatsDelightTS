import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Compressor from 'compressorjs';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getProductDetails, clearProduct } from '../../../store/reducers/product/productDetailsSlice';
import { updateProduct, updateProductReset, clearErrors } from '../../../store/reducers/product/productSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { colors } from '../../../components/theme';
import FormSkeletonLoader from '../../../components/FormLoader';
import { successMsg, errorMsg } from '../../../components/toast';
import { categories } from '../../../components/inputs';
import blankLogo from '../../../assets/blanklogo.png';





type ProductImage = {
    index?: number;
    url?: string;
};

interface ProductFormData {
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    portion: boolean;
    firstImage: File | String | null;
    secondImage?: File | String | null;
    thirdImage?: File | String | null;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required').min(1, 'Minimum of 1').max(100, 'Maximum of 100 characters'),
    costPrice: Yup.number().required('Cost price is Required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    sellPrice: Yup.number().required('Sell price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    stock: Yup.number().required('Stock is Required').min(0, 'Minimum of 0').max(999, 'Maximum of 999').integer('Stock cannot be decimal'),
    category: Yup.string().required('Category is required'),
    active: Yup.boolean().required('Active or Not'),
});



const EditProductPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const { product, loading: productLoading } = useAppSelector((state) => state.productDetails)
    const { loading, isUpdated, error } = useAppSelector((state) => state.product);
    const [firstImagePrev, setFirstImagePrev] = useState<string>(blankLogo);
    const [secondImagePrev, setSecondImagePrev] = useState<string>(blankLogo);
    const [thirdImagePrev, setThirdImagePrev] = useState<string>(blankLogo);
    const [firstImage, setFirstImage] = useState<File | null>(null);
    const [secondImage, setSecondImage] = useState<File | null>(null);
    const [thirdImage, setThirdImage] = useState<File | null>(null);


    useEffect(() => {

        if (product && product.images && product.images.length > 0 && !loading) {
            const productImages: (string | ProductImage)[] = product.images;
            const imagePreviews: (string | null)[] = Array(3).fill(null);
        
            productImages.forEach((image) => {
                if (typeof image === 'object' && image.index !== undefined && image.index >= 0 && image.index < 3 && image.url) {
                    imagePreviews[image.index] = image.url;
                }
            });
        
            setFirstImagePrev(imagePreviews[0] || blankLogo);
            setSecondImagePrev(imagePreviews[1] || blankLogo);
            setThirdImagePrev(imagePreviews[2] || blankLogo);
        }
        

        if (id !== undefined && product && product._id !== id) {
            dispatch(getProductDetails(id));
        }


        if (error) {
            errorMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg('Product updated successfully');
            navigate('/admin/product-all');
            dispatch(updateProductReset());
            dispatch(clearProduct());
        }

    }, [dispatch, id, product, isUpdated])

    const selectImage = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        new Compressor(file, {
            quality: 0.7,
            success(result) {

                const compressedFile = new File([result], file.name, { type: file.type });
                if (index === 0) {
                    setFirstImagePrev(URL.createObjectURL(compressedFile));
                    setFirstImage(compressedFile)
                } else if (index === 1) {
                    setSecondImagePrev(URL.createObjectURL(compressedFile));
                    setSecondImage(compressedFile);
                } else if (index === 2) {
                    setThirdImagePrev(URL.createObjectURL(compressedFile));
                    setThirdImage(compressedFile);
                }
            },
        });
    };

    const initialValues = {
        name: product?.name || '',
        description: product?.description || '',
        costPrice: product?.costPrice || 0,
        sellPrice: product?.sellPrice || 0,
        stock: product?.stock || 0,
        category: product?.category || '',
        active: product?.active === true ? 'True' : 'False',
        portion: false,
        firstImage: ''
    }


    const onSubmit = (data: ProductFormData) => {
        const isActive = data.active === "True" ? true : false;
        const productData: ProductFormData = {
            name: data.name,
            description: data.description,
            costPrice: data.costPrice,
            sellPrice: data.sellPrice,
            category: data.category,
            stock: data.stock,
            portion: false,
            active: isActive,
            firstImage: firstImage,
            secondImage: secondImage ? secondImage : null,
            thirdImage: thirdImage ? thirdImage : null,
        };
        if (id) {
            dispatch(updateProduct({ id, productData }));
        }
    };

    if (productLoading) {
        return <FormSkeletonLoader />
    }

    return (
        <div className="flex justify-center">
            <div className="lg:w-100 w-11/12 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
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
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500" />
                            </div>



                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                                <div className="flex-1">
                                    <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">
                                        Cost Price
                                    </label>
                                    <Field
                                        type="numeric"
                                        id="costPrice"
                                        name="costPrice"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="costPrice" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700">
                                        Sell Price
                                    </label>
                                    <Field
                                        type="numeric"
                                        id="sellPrice"
                                        name="sellPrice"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="sellPrice" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w-full mb-4">
                                <div className="w-full sm:w-1/5">
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                        Stock
                                    </label>
                                    <Field
                                        type="numeric"
                                        id="stock"
                                        name="stock"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="stock" component="div" className="text-red-500" />
                                </div>

                                <div className="w-full sm:w-4/5">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <Field
                                        as="select"
                                        id="category"
                                        name="category"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    >
                                        <option value="" disabled>Select</option>
                                        {categories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}


                                    </Field>
                                    <ErrorMessage name="religion" component="div" className="text-red-500" />
                                </div>
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
                                    <option value="True">Active</option>
                                    <option value="False">Not Active</option>

                                </Field>
                                <ErrorMessage name="active" component="div" className="text-red-500" />
                            </div>


                            <div className="space-y-2">
                                <div>Images (Left most is required)</div>
                                <div className="flex space-x-4">
                                    <button type="button" onClick={() => document.getElementById('imageInput0')?.click()}>
                                        <img
                                            src={firstImagePrev}
                                            className="rounded-circle w-64 h-64 object-cover cursor-pointer"
                                            alt="Avatar Preview"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => selectImage(0, event)}
                                            id="imageInput0"
                                            style={{ display: 'none' }}
                                        />
                                    </button>

                                    <button type="button" onClick={() => document.getElementById('imageInput1')?.click()}>
                                        <img
                                            src={secondImagePrev}
                                            className="rounded-circle w-64 h-64 object-cover cursor-pointer"
                                            alt="Avatar Preview"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => selectImage(1, event)}
                                            id="imageInput1"
                                            style={{ display: 'none' }}
                                        />
                                    </button>

                                    <button type="button" onClick={() => document.getElementById('imageInput2')?.click()}>
                                        <img
                                            src={thirdImagePrev}
                                            className="rounded-circle w-64 h-64 object-cover cursor-pointer"
                                            alt="Avatar Preview"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => selectImage(2, event)}
                                            id="imageInput2"
                                            style={{ display: 'none' }}
                                        />
                                    </button>
                                </div>
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

export default EditProductPage;
