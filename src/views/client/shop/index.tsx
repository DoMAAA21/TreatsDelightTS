import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import ProductList from './productList';
import ProductLoader from '../../../components/loaders/ProductLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import MetaData from '../../../components/MetaData';
import { fetchAllItems, setSelectedCategory, setLastSelectedCategory, setSearchQuery, setSelectedStore, setLastSelectedStore } from '../../../store/reducers/product/allProductsSlice';
import { fetchStores } from '../../../store/reducers/store/allStoressSlice';
import ChevronDown from '../../../assets/icons/chevrondown.svg';
import Search from '../../../assets/icons/search.svg';

interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: 'All', value: '' },
  { label: 'Meals', value: 'Meals' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Beverages', value: 'beverages' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Sandwiches and Wraps', value: 'sandwichesandwraps' },
  { label: 'Breads', value: 'breads' },
  { label: 'Others', value: 'Others' },
];

const ShoppingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore, currentPage, searchQuery, selectedCategory, lastSelectedCategory, selectedStore, lastSelectedStore } = useAppSelector(state => state.allProducts);
  const { stores } = useAppSelector(state => state.allStores);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedSearchQueryRef = useRef<string>(debouncedSearchQuery);


  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    if (items.length === 0 || selectedCategory !== lastSelectedCategory) {
      dispatch(fetchAllItems({ page: 1, searchQuery: debouncedSearchQuery, category: selectedCategory, store: selectedStore }));
      dispatch(setLastSelectedCategory(selectedCategory));
    }
  }, [selectedCategory, lastSelectedCategory]);


  useEffect(() => {
    if (items.length === 0 || selectedStore !== lastSelectedStore) {
      dispatch(fetchAllItems({ page: 1, searchQuery: debouncedSearchQuery, category: selectedCategory, store: selectedStore }));
      dispatch(setLastSelectedStore(selectedStore));
    }
  }, [selectedStore, lastSelectedStore]);

  useEffect(() => {
    if (debouncedSearchQueryRef.current !== '' && debouncedSearchQuery.trim() === '') {
      dispatch(fetchAllItems({ page: 1, searchQuery: '', category: selectedCategory, store: selectedStore }));
    }
    if (debouncedSearchQuery) {
      dispatch(fetchAllItems({ page: 1, searchQuery: debouncedSearchQuery, category: selectedCategory, store: selectedStore }));
    }

    debouncedSearchQueryRef.current = debouncedSearchQuery;
  }, [debouncedSearchQuery]);

  const fetchMoreItems = () => {
    if (hasMore) {
      console.log('Fetching more items. Current page:', currentPage + 1);
      dispatch(fetchAllItems({ page: currentPage + 1, category: selectedCategory }));
    }
  };

  const handleCategoryChange = (categoryValue: string) => {
    dispatch(setSelectedCategory(categoryValue));
  };

  const handleStoreChange = (storeValue: string) => {
    dispatch(setSelectedStore(storeValue));
  };

  return (
    <>
      <MetaData title={'Shop'} />
      <div className="container mx-auto p-4">
        <div className="mx-4 flex flex-wrap items-center justify-between">
        <div className="relative">
          <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
          className="my-4 p-3 border border-gray-400 rounded-3xl w-full lg:w-96 pr-12"
          />
          <img
          src={Search}
          className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8" 
          alt="Search Icon"
          />
          </div>
          <div className="my-4 relative border border-gray-300 rounded-md bg-indigo-100 w-96">
            <select
              className="appearance-none border-none bg-transparent py-2 px-4 pr-8 rounded-md focus:outline-none w-full"
              value={lastSelectedStore}
              onChange={e => handleStoreChange(e.target.value)}
            >
              <option value="">All Stores</option>
              {stores.map(store => (
                <option key={store._id} value={store.name}>{store.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img className="h-4 w-4" src={ChevronDown} alt="chevron-down" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="my-4 flex flex-wrap gap-2 content-center">
              {categories.map((category) => (
              <button
              key={category.value} onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-md border font-semibold border-gray-300 
              ${ selectedCategory === category.value ? 'bg-green-800 text-white' : 'bg-yellow-400'}`}
              >
                {category.label}
              </button>
            ))}
            </div>
          </div>
        </div>

        {loading && !items.length ? (
          <ProductLoader repeat={8} />
        ) : (
          <>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreItems}
              hasMore={hasMore}
              loader={<ProductLoader repeat={4} />}
              endMessage={
                <p className="text-center text-gray-500 mb-2"> No more products to load</p>
              }
            >
              <ProductList products={items} />
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingPage;