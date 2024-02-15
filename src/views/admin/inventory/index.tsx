import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllStoreItems } from '../../../store/reducers/product/allProductsSlice';
import CategoryList from './categoryList';
import ProductList from './productList';
import CartTable from './cartTable';
import { categories } from '../../../components/inputs';
import MetaData from '../../../components/MetaData';
import './inventory.css';
import { successMsg } from '../../../components/toast';

interface Product {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
}

interface CartItem extends Product {
    quantity: number;
}

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector((state) => state.allProducts);

    useEffect(() => {
        dispatch(fetchAllStoreItems());
    }, [dispatch]);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const onSelectCategory = (categoryId: string) => {
        setSelectedCategory((prevCategory) => (prevCategory === categoryId ? null : categoryId));
    };

    const handleAddToCart = (product: Product) => {
        const existingCartItemIndex = cart.findIndex((cartItem) => cartItem._id === product._id);
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingCartItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            successMsg('Checkout success')
            setCart([]);
        }
    }

    const handleRemoveFromCart = (itemId: number | string) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    return (
        <>
            <MetaData title={'Inventory'} />
            <div className="flex overflow-x-hidden">
                <CategoryList categories={categories} onSelectCategory={onSelectCategory} />
                <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
                <CartTable cart={cart} handleCheckout={handleCheckout}  handleRemoveItem={handleRemoveFromCart}/>
            </div>
        </>
    );
};

export default App;
