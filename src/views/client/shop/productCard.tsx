import React from 'react';
import { colors } from '../../../components/theme';

interface ShoppingCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ id, name, price, image }) => {
  return (
    <div className="max-w-md  bg-white rounded-xl overflow-hidden shadow-lg mb-10 mx-4">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-4">
        <div className="text-xl font-semibold mb-2">{name}</div>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <button
          className={`mt-4 ${colors.primary} font-bold py-2 px-4 w-full rounded-full`}
          onClick={() => console.log(`Added item with id ${id} to cart`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ShoppingCard;
