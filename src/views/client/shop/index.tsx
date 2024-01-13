import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import { fetchAllItems } from '../../../store/reducers/product/allProductsSlice';
import ProductList from './productList';
import ProductLoader from '../../../components/loaders/ProductLoader';

const ShoppingPage = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector(state => state.allProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);


    useEffect(() => {
        dispatch(fetchAllItems());
    }, [dispatch]);

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item?.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            item?.sellPrice?.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
    }, [items, debouncedSearchQuery]);

    return (
        <div className="container mx-auto">
            <div className="mx-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="my-4 p-3 border border-gray-300 rounded-md w-full"
                />
            </div>

            {loading ? (

                <ProductLoader repeat={8} />

            ) : (
                <ProductList products={filteredItems} />
            )}
        </div>
    );
};

export default ShoppingPage;
