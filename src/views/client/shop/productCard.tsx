import React from 'react';
import { colors } from '../../../components/theme';

interface ProductImage {
  index?: number;
  url?: string;
}

interface ProductCardProps {
  _id: number | string;
  name: string;
  description?: string;
  costPrice?: number;
  sellPrice: number;
  stock: number;
  category?: string;
  active: boolean | string;
  images: ProductImage[];

}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, sellPrice, images }) => {
  return (
    <div className="max-w-md  bg-white rounded-xl overflow-hidden shadow-lg mb-10 mx-4">
      <img className="w-full h-48 object-cover" src={images[0]?.url} alt={name} />
      <div className="p-4">
        <div className="text-xl font-semibold mb-2">{name}</div>
        <p className="text-gray-600">₱{sellPrice.toFixed(2)}</p>
        <button
          className={`mt-4 ${colors.primary} font-bold py-2 px-4 w-full rounded-full`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
