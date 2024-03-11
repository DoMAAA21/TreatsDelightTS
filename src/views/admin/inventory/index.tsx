import './inventory.css';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllStoreItems } from '../../../store/reducers/product/allProductsSlice';
import { inventoryCheckout, checkoutReset, clearErrors } from '../../../store/reducers/cart/inventorySlice';
import CategoryList from './categoryList';
import ProductList from './productList';
import CartTable from './cartTable';
import { categories } from '../../../components/inputs';
import MetaData from '../../../components/MetaData';
import { errorMsg, successMsg } from '../../../components/toast';



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
    const { products } = useAppSelector((state) => state.allProducts);
    const { success, error } = useAppSelector((state) => state.inventory);

    useEffect(() => {
        dispatch(fetchAllStoreItems());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            successMsg('Checkout success');
            dispatch(fetchAllStoreItems());
            dispatch(checkoutReset());
            setCart([]);
        }
        if (error) {
            errorMsg(`Checkout Error: ${error}`);
            dispatch(clearErrors());
        }
    }, [success, error])

    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const onSelectCategory = (categoryId: string) => {
        setSelectedCategory((prevCategory) => (prevCategory === categoryId ? null : categoryId));
    };

    const handleAddToCart = (product: Product) => {
        const existingCartItemIndex = cart.findIndex((cartItem) => cartItem._id === product._id);

        if(product.category.toLowerCase() !== "meals" && product.stock <= 0){
            errorMsg('Insufficient Stock available');
            return;
        }
        
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...cart];
            if (product.category.toLowerCase() !== "meals" && product.stock <= updatedCart[existingCartItemIndex].quantity) {
                errorMsg('Insufficient Stock available');
                return;
            }
        
            updatedCart[existingCartItemIndex].quantity += 1;
            setCart(updatedCart);
            return;
        }
        

        
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            errorMsg('No items in cart');
            return;
        }
        const totalPrice = cart.reduce((acc, item) => acc + item.sellPrice * (item?.quantity ?? 0), 0);
        dispatch(inventoryCheckout({ cartItems: cart, totalPrice }));
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
                <CartTable cart={cart} handleCheckout={handleCheckout} handleRemoveItem={handleRemoveFromCart} />
            </div>
        </>
    );
};

export default App;
