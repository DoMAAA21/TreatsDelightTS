import React from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/MetaData";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { successMsg, topErrorMsg } from "../../components/toast";
import { kioskCheckout, clearQrCode } from "../../store/reducers/cart/cartSlice";
import PaypalCheckoutButton from "./paypalCheckoutButton";

const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems } = useAppSelector(state => state.cart);


    // useEffect(() => {
    //     if (cartItems.length === 0) {
    //         navigate('/');
    //     }
    // }, [cartItems, navigate]);

    const checkoutHandler = async () => {
        dispatch(clearQrCode());
        if (cartItems.length === 0) {
            topErrorMsg('Empty Cart');
            return;
        }
        const totalPrice: number = parseFloat(
            cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
        );
        await dispatch(kioskCheckout({ cartItems, totalPrice })).then(() => {
            navigate('/receipt');
            successMsg('Checkout Success');
        });
    };

    // if (cartItems.length === 0) {
    //     return null;
    // }

    return (
        <>
            <MetaData title={'Payment'} />
            <div className="flex justify-center items-center pt-16 p-4">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 pb-20">
                    <h2 className="text-2xl text-center mb-4">Choose Payment Type</h2>
                    <div className="space-y-4">

                        <PaypalCheckoutButton />
                        <div className="text-center">
                            <span className="font-semibold text-md"> Or</span>
                        </div>

                        <button onClick={checkoutHandler} className="w-full bg-green-500 text-white font-semibold py-4 rounded hover:bg-green-600">
                            Checkout <span>(Mobile Kiosk)</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
