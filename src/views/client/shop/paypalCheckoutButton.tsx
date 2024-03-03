import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js"
import { errorMsg, topErrorMsg, successMsg } from "../../../components/toast";
import { clearQrCode, checkoutCart } from "../../../store/reducers/cart/cartSlice";

interface PaypalCheckoutButtonProps {
    amount: number | string;
}
const PaypalCheckoutButton: React.FC<PaypalCheckoutButtonProps> = ({ amount }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { cartItems } = useAppSelector(state => state.cart);

    const createOrder = async (data: any, actions: any): Promise<any> => {
        if (cartItems.length === 0) {
            topErrorMsg('Empty Cart')
            return data;
        }

        const totalPrice: number = parseFloat(
                    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
        );
       
        const creatorder = await actions.order.create({
            purchase_units: [
                {
                    description: "Total Order",
                    amount: {
                        value: totalPrice
                    }
                },
            ]
        });

        return creatorder;
    };

    const onApprove = async (data: any, actions: any): Promise<void> => {
        try {
            const order = await actions.order.capture();
            console.log("order", order);
            alert('order approved');

            dispatch(clearQrCode());
            const isReserve = true;
            if (cartItems.length === 0) {
                topErrorMsg('Empty Cart')
                return data;
            }
            const totalPrice: number = parseFloat(
                cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
            );

            dispatch(checkoutCart({ cartItems, totalPrice, isReserve })).then(() => {
                navigate('/receipt');
                successMsg('Checkout Success');
            })

        } catch (error) {
            console.error("An error occurred:", error);
        }
    };


    return (
        <div>

            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={() => errorMsg('Order Cancelled')}
            />
        </div>
    )
}

export default PaypalCheckoutButton