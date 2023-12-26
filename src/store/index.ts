import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['auth'], 
  blacklist: ['loading', 'error'],
};

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false, }),
});

const persistor = persistStore(store);


export { store, persistor }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
