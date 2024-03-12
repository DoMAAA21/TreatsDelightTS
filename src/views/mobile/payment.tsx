import React from "react";
import MetaData from "../../components/MetaData";
import PaypalCheckoutButton from "./paypalCheckoutButton";

const PaymentPage: React.FC = () => {
    let totalPrice: number; 
 
        alert('test')
        totalPrice = parseFloat((window as any).totalPrice);
        if (!isNaN(totalPrice)) {
            alert(totalPrice)
        } else {
            alert('asdas')
        }
    
    return (
        <>
            <MetaData title={'Payment'} />
            <div className="flex justify-center items-center pt-40 p-20">
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md h-60 w-full md:w-1/2 lg:w-1/3 pb-20">
                    <div className="mt-6">
                    <h2 className="text-2xl text-center mb-4">Pay With</h2>
                    <div className="space-y-4">
                        <PaypalCheckoutButton />
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
