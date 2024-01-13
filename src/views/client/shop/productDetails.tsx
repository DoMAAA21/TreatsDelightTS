import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getItemDetails } from '../../../store/reducers/product/productDetailsSlice';

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

  useEffect(() => {
    setImages([]);
    dispatch(getItemDetails(id))
      .then(() => {
        setImages(product.images);
      });
  }, [dispatch, id, product.images]);

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
      <div className="lg:hidden">
        <Slider {...settings}>
          {images.map((image, index) => (
            <img key={index} src={image?.url} alt={`Image ${index + 1}`} className="w-full" />
          ))}
        </Slider>
      </div>

      <div className="items-center justify-center w-full h-full shadown-md">
        <div className="hidden lg:flex  p-10 ">
          <div className="w-1/2">
            <Slider {...settings}>
              {images.map((image, index) => (
                <img key={index} src={image?.url} alt={`Image ${index + 1}`} className="w-full" />
              ))}
            </Slider>
          </div>
          <div className="w-1/2 bg-white shadow p-4">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold mb-4">₱{product?.sellPrice.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <label className="mr-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>


      <div className="lg:hidden mt-4">
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-4">₱{product?.sellPrice.toFixed(2)}</p>
        <div className="flex items-center mb-4">
          <label className="mr-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
