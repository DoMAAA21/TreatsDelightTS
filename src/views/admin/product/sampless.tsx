import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import Compressor from 'compressorjs';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { colors } from '../../../components/theme';
import { newProduct, newProductReset } from '../../../store/reducers/product/newProductSlice';
import { successMsg, errorMsg } from '../../../components/toast';
import { categories } from '../../../components/inputs';
import blankLogo from '../../../assets/blanklogo.png';
import axios from 'axios';



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
    calories: Yup.number().required('Calorie is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    protein: Yup.number().required('Protein is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    carbs: Yup.number().required('Carbs is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    fat: Yup.number().required('Fat is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    fiber: Yup.number().required('Fiber is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    sugar: Yup.number().required('Sugar is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
    sodium: Yup.number().required('Sodium is required').min(0, 'Minimum of 0').max(999, 'Maximum of 999'),
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
    const [name, setName] = useState<string>('');
   

    // const [calories, setCalories] = useState<number>(0);

    console.log(name)



    const initialValues = {
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
        firstImage: '',



    };

    useEffect(() => {

        if (error) {
            errorMsg(error);
            dispatch(newProductReset());
        }

        if (success) {
            navigate('/admin/product-all');
            dispatch(newProductReset());
            successMsg('Product created successfully');
        }
    }, [dispatch, error, success, navigate]);

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

    const fetchNutritionFacts = async () => {
        try {
            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-16k',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: `can u give the nutrition facts (calories, protein, carbs, fat, fiber, sugar, sodium) of ${name} per 100grams the nutrition facts values dont is plain dont include _ in json format no explanation only json` },
                    ],
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + import.meta.env.VITE_OPEN_AI_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const nutritionFacts = result.data.choices[0].message.content;
            console.log(nutritionFacts)
            //   const parsedNutritionFacts = parseNutritionFacts(nutritionFacts);

            // Set form values with the parsed nutrition facts
            // Example: setCalories(parsedNutritionFacts.calories);
        } catch (error) {
            console.error('Error communicating with GPT-3:', error);
        }
    }



    const onSubmit = (data: FormData) => {
        const isActive = data.active === "True" ? true : false;

        const formData: FormData = {
            name: data.name,
            description: data.description,
            costPrice: data.costPrice,
            sellPrice: data.sellPrice,
            category: data.category,
            stock: data.stock,
            portion: false,
            active: isActive,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            fiber: data.fiber,
            sugar: data.sugar,
            sodium: data.sodium,
            firstImage: firstImage,
            secondImage: secondImage ? secondImage : null,
            thirdImage: thirdImage ? thirdImage : null,
        };

        dispatch(newProduct(formData));
    };

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
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    onChange={(e:any) => setName(e.target.value)}
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
                                        type="number"
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
                                        type="number"
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
                                        type="number"
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

                            <div className="flex items-center mb-4">
                                <div className="flex-1 border-t"></div>
                                <p className="font-semibold">Nutrition</p>
                                <div className="flex-1 border-t"></div>
                            </div>

                            <button
                                type="button"
                                className={`mr-4 ${colors.primary} py-2 px-4 rounded-lg`}
                                onClick={fetchNutritionFacts}
                            >
                                Fetch Nutrition Facts
                            </button>


                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                                <div className="flex-1">
                                    <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                                        Calories
                                    </label>
                                    <Field
                                        type="number"
                                        id="calories"
                                        name="calories"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="calories" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                                        Protein
                                    </label>
                                    <Field
                                        type="number"
                                        id="protein"
                                        name="protein"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="protein" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="carbs" className="block text-sm font-medium text-gray-700">
                                        Carbs
                                    </label>
                                    <Field
                                        type="number"
                                        id="carbs"
                                        name="carbs"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="carbs" component="div" className="text-red-500" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="fat" className="block text-sm font-medium text-gray-700">
                                        Fats
                                    </label>
                                    <Field
                                        type="number"
                                        id="fat"
                                        name="fat"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="fat" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                                <div className="flex-1">
                                    <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                                        Fiber
                                    </label>
                                    <Field
                                        type="number"
                                        id="fiber"
                                        name="fiber"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="fiber" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="sugar" className="block text-sm font-medium text-gray-700">
                                        Sugar
                                    </label>
                                    <Field
                                        type="number"
                                        id="sugar"
                                        name="sugar"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="sugar" component="div" className="text-red-500" />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="sodium" className="block text-sm font-medium text-gray-700">
                                        Sodium
                                    </label>
                                    <Field
                                        type="number"
                                        id="sodium"
                                        name="sodium"
                                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                                    />
                                    <ErrorMessage name="sodium" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>Images (Leftmost is required)</div>
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
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
