import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';


interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface UseNutritionFactsProps {
  formik: {
    values: {
      name: string
    }

    setFieldValue: (field: string, value: any) => void;
  };
}

interface UseNutritionFactsResult {
  gptSuccess: boolean;
  gptLoading: boolean;
  gptError: string | null;
  setGptSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setGptError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchNutrition: () => Promise<void>;
}

const useFetchNutritionFacts = ({ formik }: UseNutritionFactsProps, item : string): UseNutritionFactsResult => {
  const [gptLoading, setGptLoading] = useState(false);
  const [gptError, setGptError] = useState<string | null>(null);
  const [gptSuccess, setGptSuccess] = useState(false);

  const measurement = item === "product" ? 'packet' : '100g';

  const fetchNutrition = async (): Promise<void> => {
    try {
      setGptLoading(true);

      const item = formik.values.name;

      if (!item) {
        return setGptError('Please input name');
      }

      const result: AxiosResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-1106',
          messages: [
            { role: 'system', content: 'You are a helpful assistant. Please provide only raw data dont provide measurements like kcal, grams etc' },
            {
              role: 'user',
              content: `Can u give me the nutritional facts (calories, protein, carbs, fat, fiber, sugar, sodium) of ${item} per ${measurement} without the title, only (calories, protein, carbs, fat, fiber, sugar, sodium) in JSON Format with NO EXTRA INSTRUCTION/MESSAGE also don't provide measurements only raw data, if u cant find return message "error"`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const response: string = result.data.choices[0].message.content;
      console.log(response)
      try {
        const parsedNutrition: NutritionFacts = JSON.parse(response);
        if (
          'calories' in parsedNutrition &&
          'protein' in parsedNutrition &&
          'carbs' in parsedNutrition &&
          'fat' in parsedNutrition &&
          'fiber' in parsedNutrition &&
          'sugar' in parsedNutrition &&
          'sodium' in parsedNutrition
        ) {
          const nutritionKeys: (keyof NutritionFacts)[] = ['calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];
            nutritionKeys.forEach((key: keyof NutritionFacts) => {
              formik.setFieldValue(key, parseFloat(String(parsedNutrition[key as keyof typeof parsedNutrition])));
            });


          setGptSuccess(true);
        } else {
          setGptError('Failed to load nutrition. Manually input data or try again.');
        }
      } catch (jsonParseError) {
        setGptError('Failed to load nutrition. Manually input data or try again.');
      }
    } catch (error) {
      setGptError('Failed to load nutrition. Manually input data or try again.');
    } finally {
      setGptLoading(false);

    }
  };

  return { gptLoading, gptSuccess, gptError, fetchNutrition, setGptError, setGptSuccess };
};

export default useFetchNutritionFacts;
