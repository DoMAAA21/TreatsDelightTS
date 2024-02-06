import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Compressor from 'compressorjs';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { colors } from '../../../components/theme';
import { newProduct, newProductReset } from '../../../store/reducers/product/newProductSlice';
import { successMsg, errorMsg } from '../../../components/toast';
import blankLogo from '../../../assets/svg/blank.svg';
import NutritionForm from './nutritionForm';
import ProductForm from './productForm';

interface FormData {
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    portion: boolean;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;
    firstImage: File | String | null;
    secondImage?: File | String | null;
    thirdImage?: File | String | null;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required').min(1, 'Minimum of 1').max(100, 'Maximum of 100 characters'),
    costPrice: Yup.number().required('Cost price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    sellPrice: Yup.number().required('Sell price is required').min(1, 'Minimum of 1').max(999, 'Maximum of 999'),
    stock: Yup.number().required('Stock is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999').integer('Stock cannot be decimal'),
    category: Yup.string().required('Category is required'),
    active: Yup.boolean().required('Active or Not'),
    calories: Yup.number().required('Calorie is required').min(0, 'Minimum of 0'),
    protein: Yup.number().required('Protein is required').min(0, 'Minimum of 0'),
    carbs: Yup.number().required('Carbs is required').min(0, 'Minimum of 0'),
    fat: Yup.number().required('Fat is required').min(0, 'Minimum of 0'),
    fiber: Yup.number().required('Fiber is required').min(0, 'Minimum of 0'),
    sugar: Yup.number().required('Sugar is required').min(0, 'Minimum of 0'),
    sodium: Yup.number().required('Sodium is required').min(0, 'Minimum of 0'),
    cholesterol: Yup.number().required('Cholesterol is required').min(0, 'Minimum of 0'),
});

const AddProductPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useAppSelector((state) => state.newProduct);
    const [firstImagePrev, setFirstImagePrev] = useState<string>(blankLogo);
    const [secondImagePrev, setSecondImagePrev] = useState<string>(blankLogo);
    const [thirdImagePrev, setThirdImagePrev] = useState<string>(blankLogo);
    const [firstImage, setFirstImage] = useState<File | null>(null);
    const [secondImage, setSecondImage] = useState<File | null>(null);
    const [thirdImage, setThirdImage] = useState<File | null>(null);
    

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            costPrice: 0,
            sellPrice: 0,
            portion: false,
            stock: 0,
            category: '',
            active: '',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
            cholesterol: 0,
            firstImage: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const isActive = values.active === 'True' ? true : false;

            const formData: FormData = {
                name: values.name,
                description: values.description,
                costPrice: values.costPrice,
                sellPrice: values.sellPrice,
                category: values.category,
                stock: values.stock,
                portion: false,
                active: isActive,
                calories: values.calories,
                protein: values.protein,
                carbs: values.carbs,
                fat: values.fat,
                fiber: values.fiber,
                sugar: values.sugar,
                sodium: values.sodium,
                cholesterol: values.cholesterol,
                firstImage: firstImage,
                secondImage: secondImage ? secondImage : null,
                thirdImage: thirdImage ? thirdImage : null,
            };
            dispatch(newProduct(formData));
        },
    });

    useEffect(() => {
        if (error ) {
            errorMsg(error);
            dispatch(newProductReset());
        }

        if (success) {
            navigate('/admin/product-all');
            dispatch(newProductReset());
            successMsg('Product created successfully');
        }
    }, [dispatch, error, success, navigate ]);



    const selectImage = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        new Compressor(file, {
            quality: 0.7,
            success(result) {
                const compressedFile = new File([result], file.name, { type: file.type });
                if (index === 0) {
                    setFirstImagePrev(URL.createObjectURL(compressedFile));
                    setFirstImage(compressedFile);
                } else if (index === 1) {
                    setSecondImagePrev(URL.createObjectURL(compressedFile));
                    setSecondImage(compressedFile);
                } else if (index === 2) {
                    setThirdImagePrev(URL.createObjectURL(compressedFile));
                    setThirdImage(compressedFile);
                }
            },
            error(err) {
                console.log(err.message);
            },
        });
    };

    return (
        <div className="flex justify-center">
            <div className="lg:w-100 w-11/12 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                    <form onSubmit={formik.handleSubmit}>

                        <ProductForm formik={formik}/>
                       
                        <NutritionForm formik={formik}/>

                        <div className="space-y-2">
                            <div>Images <span className="text-xs text-gray-500">(Leftmost is required)</span></div>
                            <div className="flex space-x-2">
                                <button type="button" onClick={() => document.getElementById('imageInput0')?.click()}>
                                    <img
                                        src={firstImagePrev}
                                        className="rounded-circle w-24 h-24 object-cover cursor-pointer lg:w-40 lg:h-40" // Adjust the size for both full-width and mobile
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
                                        className="rounded-circle w-24 h-24 object-cover cursor-pointer lg:w-40 lg:h-40" // Adjust the size for both full-width and mobile
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
                                        className="rounded-circle w-24 h-24 object-cover cursor-pointer lg:w-40 lg:h-40" // Adjust the size for both full-width and mobile
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
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddProductPage;

