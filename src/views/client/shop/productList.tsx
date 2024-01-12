import React from 'react';
import ProductCard from './productCard';


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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product._id} {...product} />
            ))}
        </div>
    );
};

export default ProductList;
