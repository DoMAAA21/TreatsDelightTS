import { PayPalButtons } from "@paypal/react-paypal-js"
import { errorMsg } from "../../components/toast";


const PaypalCheckoutButton: React.FC = () => {
    let totalPrice: number; 
    window.onload = () => {
        totalPrice = +(window as any).totalPrice;
        if (!isNaN(totalPrice)) {
            alert(totalPrice)
        } else {
            alert('asdas')
        }
    };

    const createOrder = async (data: any, actions: any): Promise<any> => {  
        console.log(data);

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
            console.log(data);
            // dispatch(clearQrCode());
            (window as any).ReactNativeWebView.postMessage('asds');
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