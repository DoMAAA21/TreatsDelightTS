import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import { fetchAllItems } from '../../../store/reducers/product/allProductsSlice';
import ProductList from './productList';
import ProductLoader from '../../../components/loaders/ProductLoader';
import InfiniteScroll from 'react-infinite-scroll-component';

const ShoppingPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore, currentPage } = useAppSelector(state => state.allProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  useEffect(() => {
    dispatch(fetchAllItems({page: 1}));
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return items.filter(
      item =>
        item?.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        item?.sellPrice?.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [items, debouncedSearchQuery]);

  const fetchMoreItems = () => {
    console.log(hasMore)
    if (hasMore) {
      console.log('Fetching more items. Current page:', currentPage + 1);
      dispatch(fetchAllItems({ page: currentPage + 1 }));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="my-4 p-3 border border-gray-300 rounded-md w-full"
        />
      </div>

      {loading && !items.length ? (
        <ProductLoader repeat={8} />
      ) : (
        <InfiniteScroll
          dataLength={filteredItems.length}
          next={fetchMoreItems}
          hasMore={hasMore}
          loader={<ProductLoader repeat={4} />}
        >
          <ProductList products={filteredItems} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ShoppingPage;
