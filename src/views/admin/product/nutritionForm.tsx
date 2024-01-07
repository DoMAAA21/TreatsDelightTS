import { useEffect } from "react";
import useFetchNutritionFacts from "../../../hooks/useFetchNutrition";
import { colors } from "../../../components/theme";
import { errorMsg, successMsg } from "../../../components/toast";
import OpenAILogo from '../../../assets/icons/openAi.svg'


interface UseNutritionFactsProps {
    formik: {
        values: {
            name: string;
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
            fiber: number;
            sugar: number;
            sodium: number;
        };
        touched: {
            calories?: boolean;
            protein?: boolean;
            carbs?: boolean;
            fat?: boolean;
            fiber?: boolean;
            sugar?: boolean;
            sodium?: boolean;
        };
        errors: {
            calories?: string;
            protein?: string;
            carbs?: string;
            fat?: string;
            fiber?: string;
            sugar?: string;
            sodium?: string;
        };
        setFieldValue: (field: string, value: any) => void;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    };
}


const NutritionForm = ({ formik }: UseNutritionFactsProps) => {

    const { gptLoading, gptSuccess, gptError, fetchNutrition, setGptError, setGptSuccess } = useFetchNutritionFacts({ formik }, 'product');

    useEffect(() => {
        if (gptError) {
            errorMsg(gptError)
            setGptError(null)
        }
        if (gptSuccess) {
            successMsg('Nutrition fetched')
            setGptSuccess(false);
        }
    }, [gptError, gptSuccess]);
    const fetchNutritionFacts = async () => {
        fetchNutrition();
    };
    return (
        <>
            <div className="flex items-center mb-2">
                <div className="flex-1 border-t"></div>
                <p className="font-semibold">Nutrition</p>
                <div className="flex-1 border-t"></div>
            </div>
            <button type="button" onClick={fetchNutritionFacts} className={`mt-2 mb-2 ${colors.info} py-2 px-4 rounded-lg w-full flex items-center justify-center`}>
                {gptLoading ? (
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        <img src={OpenAILogo} alt="" className="w-6 h-6" />
                        <span className="ml-2">Ask ChatGPT</span>
                    </>
                )}
            </button>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                {/* Calories */}
                <div className="flex-1">
                    <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                        Calories <span className="text-xs text-gray-500">(kcal)</span>
                    </label>
                    <input
                        type="number"
                        id="calories"
                        name="calories"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.calories}
                    />
                    {formik.touched.calories && formik.errors.calories ? (
                        <div className="text-red-500">{formik.errors.calories}</div>
                    ) : null}
                </div>

                {/* Protein */}
                <div className="flex-1">
                    <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                        Protein <span className="text-xs text-gray-500">(g)</span>
                    </label>
                    <input
                        type="number"
                        id="protein"
                        name="protein"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.protein}
                    />
                    {formik.touched.protein && formik.errors.protein ? (
                        <div className="text-red-500">{formik.errors.protein}</div>
                    ) : null}
                </div>

                {/* Carbs */}
                <div className="flex-1">
                    <label htmlFor="carbs" className="block text-sm font-medium text-gray-700">
                        Carbs <span className="text-xs text-gray-500">(g)</span>
                    </label>
                    <input
                        type="number"
                        id="carbs"
                        name="carbs"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.carbs}
                    />
                    {formik.touched.carbs && formik.errors.carbs ? (
                        <div className="text-red-500">{formik.errors.carbs}</div>
                    ) : null}
                </div>

                {/* Fats */}
                <div className="flex-1">
                    <label htmlFor="fat" className="block text-sm font-medium text-gray-700">
                        Fats <span className="text-xs text-gray-500">(g)</span>
                    </label>
                    <input
                        type="number"
                        id="fat"
                        name="fat"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fat}
                    />
                    {formik.touched.fat && formik.errors.fat ? (
                        <div className="text-red-500">{formik.errors.fat}</div>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center w- mb-4">
                {/* Fiber */}
                <div className="flex-1">
                    <label htmlFor="fiber" className="block text-sm font-medium text-gray-700">
                        Fiber <span className="text-xs text-gray-500">(g)</span>
                    </label>
                    <input
                        type="number"
                        id="fiber"
                        name="fiber"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fiber}
                    />
                    {formik.touched.fiber && formik.errors.fiber ? (
                        <div className="text-red-500">{formik.errors.fiber}</div>
                    ) : null}
                </div>

                {/* Sugar */}
                <div className="flex-1">
                    <label htmlFor="sugar" className="block text-sm font-medium text-gray-700">
                        Sugar <span className="text-xs text-gray-500">(g)</span>
                    </label>
                    <input
                        type="number"
                        id="sugar"
                        name="sugar"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sugar}
                    />
                    {formik.touched.sugar && formik.errors.sugar ? (
                        <div className="text-red-500">{formik.errors.sugar}</div>
                    ) : null}
                </div>

                {/* Sodium */}
                <div className="flex-1">
                    <label htmlFor="sodium" className="block text-sm font-medium text-gray-700">
                        Sodium <span className="text-xs text-gray-500">(mg)</span>
                    </label>
                    <input
                        type="number"
                        id="sodium"
                        name="sodium"
                        className="mt-1 p-2 w-full border border-gray-400 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sodium}
                    />
                    {formik.touched.sodium && formik.errors.sodium ? (
                        <div className="text-red-500">{formik.errors.sodium}</div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default NutritionForm