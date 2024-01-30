import React, { useState } from 'react';

interface Category {
  value: string;
  label: string;
}

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="w-1/6 p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        <li
          key={'Meals'}
          className={`cursor-pointer mb-2 p-4 rounded-md ${activeCategory === 'Meals' ? 'bg-indigo-500 text-white' : 'bg-white'}`}
          onClick={() => {
            onSelectCategory('Meals');
            setActiveCategory((prev) => (prev === 'Meals' ? null : 'Meals'));
          }}
        >
          Meals
        </li>
        {categories.map((category) => (
          <li
            key={category.value}
            className={`cursor-pointer mb-2 p-4 rounded-md ${activeCategory === category.value ? 'bg-indigo-500 text-white' : 'bg-white'}`}
            onClick={() => {
              onSelectCategory(category.value);
              setActiveCategory((prev) => (prev === category.value ? null : category.value));
            }}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
