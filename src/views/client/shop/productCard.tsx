import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { errorMsg, successMsg } from '../../../components/toast';
import { colors } from '../../../components/theme';
import { addItemToCart } from '../../../store/reducers/cart/cartSlice';
import Swal from 'sweetalert2';
import AddToCart from '../../../assets/svg/add-to-cart.svg';

interface ProductImage {
  index?: number;
  url?: string;
}

interface ProductCardProps {
  _id: number | string;
  name: string;
  sellPrice: number;
  images: ProductImage[];
  store?: {
    storeId: string;
    name: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, sellPrice, images, store }) => {
  const { id } = useParams();
  const { product } = useAppSelector(state => state.productDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!_id) {
      errorMsg('Product not available');
      return;
    }
  
    const productId = String(_id); // Explicitly convert _id to string
  
    if (productId) {
      if (product?.nutrition?.cholesterol >= 50) {
        Swal.fire({
          title: 'High Cholesterol Content',
          text: 'This product has high cholesterol content. Do you still want to add it to your cart?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, add to cart',
          cancelButtonText: 'No, cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(addItemToCart({ id: productId, quantity })).then(() => {
              successMsg('Added to Cart');
            });
          }
        });
      } else {
        dispatch(addItemToCart({ id: productId, quantity })).then(() => {
          successMsg('Added to Cart');
        });
      }
    }
  };
  

  return (
  <div className="max-w-md bg-white rounded-xl overflow-hidden shadow-lg mb-10 mx-4 transform transition-transform hover:scale-105 relative">
    <button
    className={`absolute top-2 right-2 bg-[#9DE285] hover:bg-[#F8C258] font-bold py-2 px-4 rounded-3xl`}
    onClick={handleAddToCart}
    >
    <img src={AddToCart} className="w-8 h-8" alt="Cart Icon" />
    </button>
    <img className="w-full h-48 object-cover" src={images[0]?.url} alt={name} />

  <div className="p-4">
    <div className="text-xl font-semibold mb-2">{name}</div>
    <p className="text-gray-800 text-lg">{store?.name}</p>
    <p className="text-gray-600">₱{sellPrice.toFixed(2)}</p>

    <div className="flex space-x-4 mt-4">
      <button
        className={`${colors.primary} font-bold py-2 px-4 w-full rounded-full`}
        onClick={() => navigate(`/shop/product/${_id}`)}
      >
        View Details
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductCard;
