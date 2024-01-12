import React from 'react';
import ShoppingCard from './productCard';

const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: 'https://placekitten.com/300/200' },
    { id: 2, name: 'Product 2', price: 29.99, image: 'https://placekitten.com/300/201' },
    { id: 3, name: 'Product 3', price: 39.99, image: 'https://placekitten.com/300/202' },
    
];

const ProductList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ShoppingCard key={product.id} {...product} />
            ))}
        </div>
    );
};

export default ProductList;
