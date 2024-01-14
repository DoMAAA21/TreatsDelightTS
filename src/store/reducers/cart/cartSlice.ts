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
}

interface CartState {
  cartItems: CartItem[];
  receipt: any[]; // Adjust the type based on your backend structure
  success: boolean;
  loading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  receipt: [],
  success: false,
  loading: false,
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ id, quantity }: { id: string; quantity: number }, { dispatch }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
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
      throw error.response.message;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/createOrder',
  async ({ cartItems, totalPrice }: { cartItems: CartItem[]; totalPrice: number }, { dispatch }) => {
    try {
      dispatch(checkoutRequest());
      const order: Order = {
        orderItems: cartItems,
        totalPrice,
      };
      const { data } = await axios.post('/api/v1/order/new', order);
      dispatch(showReceipt(data.order));
      dispatch(checkoutSuccess(data.success));
      dispatch(clearCart());
      return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(allEmployeesFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(allEmployeesFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => (i.id === isItemExist.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0);
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