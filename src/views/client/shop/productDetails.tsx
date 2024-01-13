import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getItemDetails } from '../../../store/reducers/product/productDetailsSlice';



const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { product } = useAppSelector(state => state.productDetails);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        dispatch(getItemDetails(id))
          .then(() => {
            setImages(product.images || []);
            // setFetchLoading(true)
    
          });
      }, [dispatch,id, product.images]);

      console.log(product.images)


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleAddToCart = () => {
        // Implement your add to cart logic here
        console.log(`Added ${quantity} ${name}(s) to cart`);
    };

    return (
        <div className="flex p-4">
            <div className="w-1/2 pr-8">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <img key={index} src={image?.url} alt={`Product ${index + 1}`} className="w-full" />
                    ))}
                </Slider>
            </div>
            <div className="w-1/2">
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
    );
};

export default ProductDetails;
