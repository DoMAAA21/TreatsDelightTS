import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { successMsg, topErrorMsg } from "../../../components/toast";
import { checkoutCart, clearQrCode } from "../../../store/reducers/cart/cartSlice";
import PaypalCheckoutButton from "./paypalCheckoutButton";

const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems } = useAppSelector(state => state.cart);
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const checkoutHandler = async () => {
        dispatch(clearQrCode());
        const isReserve = false;
        if (cartItems.length === 0) {
            topErrorMsg('Empty Cart')
            return;
        }
        const totalPrice: number = parseFloat(
            cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
        );
        await dispatch(checkoutCart({ cartItems, totalPrice, isReserve })).then(() => {
            navigate('/receipt');
            successMsg('Checkout Success')
        })

    };


    return (
        <div className="flex justify-center items-center pt-16">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3 pb-20">
                <h2 className="text-2xl text-center mb-4">Choose Payment Type</h2>
                <div className="space-y-4">
                    {isAuthenticated ? (
                        <>
                            <PaypalCheckoutButton />
                            <div className="text-center">
                                <span className="font-semibold text-md"> Or</span>
                            </div>
                        </>
                    ) : null}

                    <button onClick={checkoutHandler} className="w-full bg-green-500 text-white py-4 rounded hover:bg-green-600">
                        Checkout <span>(Mobile Kiosk)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
