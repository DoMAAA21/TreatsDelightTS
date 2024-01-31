import React from 'react';

interface ProductImage {
    index?: number;
    url?: string;
}

interface Product {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    images: ProductImage[];
}

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    const handleAddToCart = (product: Product) => {
        onAddToCart(product);
    };

    return (
        <div className="py-4 w-8/12 max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">Products</h2>
            <div className="flex-grow overflow-y-auto max-h-screen custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-20">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 bg-white rounded-md cursor-pointer" onClick={() => handleAddToCart(product)}>
                            <img
                                src={product.images[0]?.url || 'placeholder-image-url'}
                                alt={product.name}
                                className="w-full h-32 object-cover mb-2"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-green-600">Price: ₱{product.sellPrice}</p>
                            <div className="flex justify-between">
                                <h3 className="text-md text-gray-500">
                                    {product?.category !== "Meals" ? `Stock: ${product.stock}` : 'Meal'}
                                </h3>
                                
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
