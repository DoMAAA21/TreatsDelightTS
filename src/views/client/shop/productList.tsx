import React from 'react';
import ProductCard from './productCard';
import NothingSVG from '../../../assets/svg/nothing.svg';

interface ProductImage {
    index?: number;
    url?: string;
}

interface ProductDetails {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    images: ProductImage[]
}

interface ProductListProps {
    products: ProductDetails[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div>
            {products.length === 0 ? (
               <div className="flex flex-col items-center h-screen p-10">
               <img src={NothingSVG} className="w-2/4 h-2/4" alt="Product Not Found Img by StorySet" />
               <h2 className="mt-4 font-semibold text-2xl text-center ">No results found.</h2>
           </div>
           
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
