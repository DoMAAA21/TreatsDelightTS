import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useDebounce from '../../../hooks/useDebounce';
import { fetchAllItems, setSelectedCategory, setLastSelectedCategory, setSearchQuery } from '../../../store/reducers/product/allProductsSlice';
import ProductList from './productList';
import ProductLoader from '../../../components/loaders/ProductLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import MetaData from '../../../components/MetaData';

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
  const { items, loading, hasMore, currentPage, selectedCategory, lastSelectedCategory, searchQuery  } = useAppSelector(state => state.allProducts);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedSearchQueryRef = useRef<string>(debouncedSearchQuery);


  // Only dispatch the fetch action if items are empty or selectedCategory has changed
  useEffect(() => { 
    if (items.length === 0 || selectedCategory !== lastSelectedCategory) {
      dispatch(fetchAllItems({ page: 1, searchQuery: debouncedSearchQuery, category: selectedCategory }));
      dispatch(setLastSelectedCategory(selectedCategory));
    }
  }, [selectedCategory, lastSelectedCategory]);

  useEffect(() => {
    if (debouncedSearchQueryRef.current !== '' && debouncedSearchQuery.trim() === '') {
      dispatch(fetchAllItems({ page: 1, searchQuery: '', category: selectedCategory }));
    }
    if (debouncedSearchQuery) {
      dispatch(fetchAllItems({ page: 1, searchQuery: debouncedSearchQuery, category: selectedCategory }));
    }

    debouncedSearchQueryRef.current = debouncedSearchQuery;
  }, [debouncedSearchQuery]);

  const fetchMoreItems = () => {
    if (hasMore) {
      console.log('Fetching more items. Current page:', currentPage + 1);
      dispatch(fetchAllItems({ page: currentPage + 1, category: selectedCategory }));
    }
  };

  // Reset items when category changes
  const handleCategoryChange = (categoryValue: string) => {
    dispatch(setSelectedCategory(categoryValue));
  };

  return (
    <>
      <MetaData title={'Shop'} />
      <div className="container mx-auto p-4">
        <div className="mx-4 flex flex-wrap items-center justify-between">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            className="my-4 p-3 border border-gray-300 rounded-3xl w-full sm:w-auto"
          />
          <div className="my-4 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-md border font-semibold border-gray-300 ${selectedCategory === category.value ? 'bg-black text-white' : 'bg-yellow-400'}`}
              >
                {category.label}
              </button>
            ))}
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
