
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { increaseItemQuantity, decreaseItemQuantity, removeItemFromCart, clearError } from "../../../store/reducers/cart/cartSlice";
import { colors } from "../../../components/theme";
import EmptyCart from "../../../assets/svg/emptycart.svg";
import MetaData from "../../../components/MetaData";
import { errorMsg } from "../../../components/toast";


const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems, error } = useAppSelector(state => state.cart);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

    useEffect(()=>{
        if(error){
            errorMsg(error);
            dispatch(clearError());
        }
    },[error])
    const proceedHandler = () => {
        if (cartItems.length === 0) {
            errorMsg('No items in cart');
            return;
        }
        navigate('/payment')
    }

    const incrementQty = (id: string) => {
        dispatch(increaseItemQuantity(id));

    };

    const decrementQty = (id: string) => {
        dispatch(decreaseItemQuantity(id));

    };

    const removeItem = (id: string) => {
        dispatch(removeItemFromCart(id));

    };

    return (
        <>
            <MetaData title={'Cart'} />
            <div className="flex justify-center mt-10">
                <div className="w-full lg:w-5/6 flex flex-col md:flex-row ">
                    <div className="w-full md:w-2/3 sm:w-full shadow-md p-8 rounded-xl mb-4 md:mb-0 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4">Cart</h2>


                        <div>
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center text-center text-gray-600">

                                    <img src={EmptyCart} alt="Empty Cart" className="h-72 w-full" />
                                    <h2 className="font-semiboldbold text-2xl mt-4">No items in cart</h2>
                                </div>

                            ) : (
                                <>
                                    <div className="flex mt-10 mb-5">
                                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/6">Product Details</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/5 ">Quantity</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-2/6 ">Price</h3>
                                    </div>

                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex p-6 mb-2 border border-gray-200 shadow-md rounded">
                                            <div className="flex flex-col w-4/5">
                                                <span className="text-red-800 text-lg font-semibold mb-2">{item.name}</span>
                                                <span className="text-gray-500 text-sm">{item.storeName}</span>
                                            </div>
                                            <div className="flex items-center w-2/6">
                                                <button className="p-3 py-1 bg-red-500 text-white rounded-3xl" onClick={() => decrementQty(item._id)}>-</button>
                                                <span className="w-10 text-center">{item.quantity}</span>
                                                <button className="p-3 py-1 bg-blue-500 text-white rounded-3xl" onClick={() => incrementQty(item._id)}>+</button>
                                            </div>
                                            <div className="flex items-center w-2/12">
                                                <span className="font-bold text-2xl">*</span>
                                            </div>
                                            <div className="flex items-center w-1/6">
                                                <span>₱{item.price}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <button className="p-2 py-1 bg-red-500 text-white rounded" onClick={() => removeItem(item._id)}>_</button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>


                    </div>
                    <div className="w-full md:w-1/3 lg:pl-4 md:pl-2">
                        <div className="p-8 shadow-md rounded-xl border border-gray-200">
                            <h2 className="text-2xl font-bold mb-4">Summary</h2>
                            <div className="mb-4">
                                <span className="text-xl font-semibold">Total</span>
                                <span className="float-right text-lg">₱{totalPrice}</span>
                            </div>
                            <button onClick={proceedHandler} className={`${colors.secondary} px-4 py-2  w-full rounded-xl text-lg`}>
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default CartPage;
