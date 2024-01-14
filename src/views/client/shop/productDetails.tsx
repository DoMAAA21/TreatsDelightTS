import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getItemDetails } from '../../../store/reducers/product/productDetailsSlice';
import { colors } from '../../../components/theme';
import ProductDetailsLoader from '../../../components/loaders/ProductDetailsLoader';

interface ProductImage {
  index?: number;
  url?: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector(state => state.productDetails);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    // setImages([]);
    dispatch(getItemDetails(id))
      .then(() => {
        setImages(product.images);
        setFetchLoading(false)
      });
  }, [id, fetchLoading]);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (

    <>
      <div className="hidden lg:flex md:flex lg:mx-20 md:mx-8 md:px-8 lg:px-20 mt-8 h-full ">
        <div className="w-4/6 rounded-bl-2xl rounded-tl-2xl overflow-hidden shadow-md lg:h-[600px]">
          <Slider {...settings} useCSS>
            {images.map((image, index) => (
              <div key={index} className="lg:h-[600px] md:h-full w-full">
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-2/6 bg-white shadow-md p-4 text-justify flex flex-col rounded-tr-2xl rounded-br-2xl border border-gray-200">
          <div className="flex-grow mt-20">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 text-xl mb-4">{product.description}</p>
            <p className="text-green-500 text-xl font-semibold mb-4">₱{product?.sellPrice.toFixed(2)}</p>
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="text-md text-gray-600 mr-2">
              Quantity:
            </label>
            <div className="relative text-center w-16">
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            className={`${colors.danger} py-2 px-4 rounded-full w-full`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>


      {/* Mobile View */}
      <div className="lg:hidden md:hidden" >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="h-[200px] md:h-full w-full">
            <img src={image?.url} alt={`Image ${index + 1}`} className="w-full h-full"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className="lg:hidden md:hidden mt-4 shadow-lg p-4 rounded-lg border-t border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-4">₱{product?.sellPrice.toFixed(2)}</p>
        <div className="flex items-center mb-4">
          <label htmlFor="quantity" className="text-md text-gray-600 mr-2">
            Quantity:
          </label>
          <div className="relative text-center w-16">
            <input
              id="mobile_quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          className={`${colors.danger} py-2 px-4 rounded-full w-full`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>


  );
};

export default ProductDetails;
