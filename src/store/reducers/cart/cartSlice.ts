import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  storeId: string;
  storeName: string;
  quantity: number;
}

interface Order {
  orderItems: CartItem[];
  totalPrice: number;
  user: {
    id?: string;
    name?: string;
  }
}

interface CartState {
  cartItems: CartItem[];
  receipt: CartItem[];
  success: boolean;
  loading: boolean;
}


interface CheckoutCartPayload {
  cartItems: CartItem[];
  totalPrice: number;
}


const persistedCartItems = localStorage.getItem('cartItems');
const initialCartItems = persistedCartItems ? JSON.parse(persistedCartItems) : [];

const initialState: CartState = {
  cartItems: initialCartItems,
  receipt: [],
  success: false,
  loading: false,
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ id, quantity }: { id: string; quantity: number }, { dispatch }) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/product/${id}`);
      const cartItem: CartItem = {
        id: data.product._id,
        name: data.product.name,
        price: data.product.sellPrice,
        image: data.product.images[0].url,
        storeId: data.product.store.storeId,
        storeName: data.product.store.name,
        quantity,
      };
      dispatch(addToCart(cartItem));
      return cartItem;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'An error occured';
      }
      throw 'An error occured';
    }
  }
);



export const checkoutCart = createAsyncThunk<{ success: boolean }, CheckoutCartPayload, { state: RootState }>('cart/checkoutCart',
  async (payload, { dispatch, getState }) => {
    try {
      dispatch(checkoutRequest());

      const authState = getState().auth;
      const userName = `${authState.user?.fname} ${authState.user?.lname}`;
      const userId = authState?.user?.id;

      const order: Order = {
        orderItems: payload.cartItems,
        user: {
          id: userId,
          name: userName
        },
        totalPrice: payload.totalPrice,
      };

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/order/new`, order);

      dispatch(showReceipt(data.order));
      dispatch(checkoutSuccess(data.success));
      dispatch(clearCart());

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'An error occurred';
      }
      throw 'An error occurred';
    }
  });


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => (i.id === isItemExist.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    checkoutRequest: (state) => {
      state.loading = true;
    },
    checkoutSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
      state.loading = false;
    },
    showReceipt: (state, action: PayloadAction<any>) => {
      state.receipt = action.payload;
    },
  },
});

export const { clearCart, removeItemFromCart, addToCart, increaseItemQuantity, decreaseItemQuantity,
  checkoutRequest, checkoutSuccess, showReceipt } = cartSlice.actions;

export default cartSlice.reducer;