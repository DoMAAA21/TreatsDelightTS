import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { submitHealthDeclaration, updateUserReset } from '../../../store/reducers/user/userSlice';
import { getUserHealth } from '../../../store/reducers/user/userDetailsSlice';
import { successMsg } from '../../../components/toast';


interface HealthDeclaration {
    diabetic: boolean;
    hypertension: boolean;
    kidneyProblem: boolean;
    cardiovascular: boolean;
    obese: boolean;
    heartDisease: boolean;
    none: boolean;
}

const HealthDeclarationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isUpdated, loading } = useAppSelector(state => state.user);
    const { user } = useAppSelector(state => state.userDetails);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<HealthDeclaration>({
        diabetic: false,
        hypertension: false,
        kidneyProblem: false,
        cardiovascular: false,
        obese: false,
        heartDisease: false,
        none: false
    });

    useEffect(() => {
        dispatch(getUserHealth()).then(() => {
            setFormData({
                diabetic: user.health?.diabetic || false,
                hypertension: user.health?.hypertension || false,
                kidneyProblem: user.health?.kidneyProblem || false,
                cardiovascular: user.health?.cardiovascular || false,
                obese: user?.health?.obese || false,
                heartDisease: user?.health?.heartDisease || false,
                none: user?.health?.none || false,
            });
            setIsLoading(false);
        });


    }, [dispatch, isLoading])

    useEffect(() => {
        setIsLoading(true);
        if (isUpdated) {
            successMsg('Health declaration updated');

            dispatch(getUserHealth()).then(() => {
                setFormData({
                    diabetic: user.health?.diabetic || false,
                    hypertension: user.health?.hypertension || false,
                    kidneyProblem: user.health?.kidneyProblem || false,
                    cardiovascular: user.health?.cardiovascular || false,
                    obese: user?.health?.obese || false,
                    heartDisease: user?.health?.heartDisease || false,
                    none: user?.health?.none || false,
                });
                setIsLoading(false);
                dispatch(updateUserReset());
            })
        }
    }, [isUpdated])



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(submitHealthDeclaration(formData));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (name === 'none' && checked) {
            setFormData({
                diabetic: false,
                hypertension: false,
                kidneyProblem: false,
                cardiovascular: false,
                obese: false,
                heartDisease: false,
                none: true
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: checked,
                none: false
            }));
        }
    }



    return (

        <div className="max-w-md mx-auto bg-white shadow-md  rounded-lg px-8 pt-6 pb-8 mb-4 mt-20">
            {!isLoading && (
                <>
                    <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">Health Declaration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <p className="text-2xl font-light mb-2">Do you have any of the following health conditions? Check all that apply:</p>
                            <div className="flex flex-col text-2xl italic">
                                <label className={`inline-flex items-center mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="diabetic"
                                        checked={formData.diabetic}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Diabetic
                                </label>
                                <label className={`inline-flex items-center  mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="hypertension"
                                        checked={formData.hypertension}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Hypertension
                                </label>
                                <label className={`inline-flex items-center mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="kidneyProblem"
                                        checked={formData.kidneyProblem}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Kidney Problem
                                </label>
                                <label className={`inline-flex items-center mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="cardiovascular"
                                        checked={formData.cardiovascular}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Cardiovascular Disease
                                </label>
                                <label className={`inline-flex items-center mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="obese"
                                        checked={formData.obese}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Obese
                                </label>
                                <label className={`inline-flex items-center  mr-4 mb-2 ${formData.none ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="heartDisease"
                                        checked={formData.heartDisease}
                                        onChange={handleChange}
                                        disabled={formData.none}
                                        className="mr-2"
                                    />
                                    Heart Disease
                                </label>

                                <label className="inline-flex items-center  mr-4 mb-2">
                                    <input
                                        type="checkbox"
                                        name="none"
                                        checked={formData.none}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    None
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </>
            )}
        </div>

    );
};

export default HealthDeclarationForm;
