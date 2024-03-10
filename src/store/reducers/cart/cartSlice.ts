import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  storeId: string;
  storeName: string;
  stock: number;
  category: string;
  quantity: number;

}


interface Order {
  orderItems: CartItem[];
  totalPrice: number;
  user: {
    id?: string;
    name?: string;
  }
  isReserve: boolean;
}

interface CartState {
  cartItems: CartItem[];
  receipt: {
    _id?: string;
    paidAt?: Date;
    orderItems: CartItem[];
    totalPrice: number;
    user: {
      id?: string;
      name?: string;
    }
  }
  qrCode?: string | null;
  success: boolean;
  addToCartSuccess: boolean;
  loading: boolean;
  error: string | null;
}


interface CheckoutCartPayload {
  cartItems: CartItem[];
  totalPrice: number;
  isReserve: boolean;
}


const persistedCartItems = localStorage.getItem('cartItems');
const initialCartItems = persistedCartItems ? JSON.parse(persistedCartItems) : [];

const initialState: CartState = {
  cartItems: initialCartItems,
  receipt: {
    orderItems: [],
    totalPrice: 0,
    user: {
      id: undefined,
      name: undefined,
    },
  },
  qrCode: '',
  success: false,
  loading: false,
  addToCartSuccess: false,
  error: null,
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ id, quantity }: { id: string; quantity: number }, { dispatch }) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/product/${id}`);
      if (data.product.category.toLowerCase() !== "meals" && quantity > data.product.stock) {
        dispatch(addToCartFail('Insufficient Stock'));
        return;
      }

      const cartItem: CartItem = {
        _id: data.product._id,
        name: data.product.name,
        price: data.product.sellPrice,
        image: data.product.images[0].url,
        storeId: data.product.store.storeId,
        storeName: data.product.store.name,
        category: data.product.category,
        stock: data.product.stock,
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
  async ({ cartItems, totalPrice, isReserve }, { dispatch, getState }) => {
    try {
      dispatch(checkoutRequest());

      const authState = getState().auth;
      const userName = `${authState.user?.fname} ${authState.user?.lname}`;
      const userId = authState?.user?._id;

      const order: Order = {
        orderItems: cartItems,
        user: {
          id: userId,
          name: userName
        },
        totalPrice: totalPrice,
        isReserve
      };

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/order/new`, order);

      dispatch(showReceipt(data.order));
      console.log(data.order);
      dispatch(checkoutSuccess(data.success));
      dispatch(setQrCode(data.qrCodeURL));
      dispatch(clearCart());

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'An error occurred';
      }
      throw 'An error occurred';
    }
  });

export const kioskCheckout = createAsyncThunk<{ success: boolean }, { cartItems: any[], totalPrice: number }, { state: RootState }>('cart/checkoutCart', async ({ cartItems, totalPrice }, { dispatch }) => {
  try {
    dispatch(checkoutRequest());

    const order = {
      orderItems: cartItems,
      totalPrice
    }

    dispatch(showReceipt(order));
    dispatch(checkoutSuccess(true));
    dispatch(clearCart());

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || 'An error occurred';
    }
    throw 'An error occurred';
  }
}
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i._id === item._id);
      if (isItemExist) {
        const totalQuantity = isItemExist.quantity + item.quantity;
    
        if (item.category.toLowerCase() !== "meals") {
          // Check stock validation only if the category is not "meals"
          if (totalQuantity <= item.stock) {
            state.cartItems = state.cartItems.map((i) => (i._id === isItemExist._id ? { ...i, quantity: totalQuantity } : i));
            state.addToCartSuccess = true;
          } else {
            state.error = "Cannot add more quantity. Insufficient stock.";
            return;
          }
        } else {
          // For "meals" category, allow adding without stock validation
          state.cartItems = state.cartItems.map((i) => (i._id === isItemExist._id ? { ...i, quantity: totalQuantity } : i));
          state.addToCartSuccess = true;
        }
      } else {
        state.cartItems = [...state.cartItems, item];
        state.addToCartSuccess = true;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    addToCartSuccess: (state) => {
      state.addToCartSuccess = true;
    },
    addToCartFail: (state, action) => {
      state.error = action.payload;
    },
    addToCartReset: (state) => {
      state.addToCartSuccess = false;
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === id);
    
      if (itemToUpdate) {
        // Check if the item's category is not "meals" and if increasing quantity exceeds available stock
        if (itemToUpdate.category.toLowerCase() !== "meals" && itemToUpdate.quantity + 1 <= itemToUpdate.stock) {
          state.cartItems = state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        } else if (itemToUpdate.category.toLowerCase() === "meals") {
          // If the category is "meals", allow increasing quantity without stock validation
          state.cartItems = state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        } else {
          state.error = "Cannot increase quantity. Insufficient stock.";
        }
      }
    },
    
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cartItems = state.cartItems
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    checkoutRequest: (state) => {
      state.loading = true;
    },
    checkoutSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
    },
    setQrCode: (state, action) => {
      state.qrCode = action.payload;
    },
    clearQrCode: (state) => {
      state.qrCode = null;
    },
    showReceipt: (state, action) => {
      state.receipt = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { clearCart, removeItemFromCart, addToCart, addToCartSuccess, addToCartReset, addToCartFail, increaseItemQuantity, decreaseItemQuantity,
  checkoutRequest, checkoutSuccess, showReceipt, setQrCode, clearQrCode, clearError } = cartSlice.actions;

export default cartSlice.reducer;