import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllItems } from '../../../store/reducers/product/allProductsSlice';
import ProductList from './productList';


const ShoppingPage = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(state => state.allProducts);
    useEffect(()=>{
        dispatch(fetchAllItems());

    },[dispatch])
    return (
        <div className="container mx-auto my-8">
            <ProductList products={items} />
        </div>
    );
};

export default ShoppingPage;
