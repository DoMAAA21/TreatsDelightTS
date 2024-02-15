import React, { useEffect } from "react";
import { useAppSelector } from "../../../hooks";
import Logo from "../../../assets/logo.png";
import QRCode from 'react-qr-code';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    storeId: string;
    storeName: string;
    quantity: number;
}

const Receipt: React.FC = () => {
    const { receipt, qrCode } = useAppSelector(state => state.cart);
    const datePart = receipt?.paidAt ? new Date(receipt.paidAt).toISOString().split('T')[0] : '';

    interface OrderItem extends CartItem {

        storeId: string;
    }
    type GroupedItems = {
        [key: string]: OrderItem[];
    };

    const groupItemsByStoreId = (items: OrderItem[] | undefined): GroupedItems => {
        if (!items) return {};
        return items.reduce((grouped: GroupedItems, item: OrderItem) => {
            const storeId = item.storeId;
            if (!grouped[storeId]) {
                grouped[storeId] = [];
            }
            grouped[storeId].push(item);
            return grouped;
        }, {});
    };

    useEffect(()=>{
        return()=>{

        }
    },[])

    const groupedItems = groupItemsByStoreId(receipt?.orderItems);

    return (
        <div className="flex justify-center">
            <div className="flex w-auto">
                <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 shadow-lg mt-20 rounded-lg">
                    <div className="flex items-center mb-2">
                        <img src={Logo} alt="Logo" className="h-16" />
                        <h1 className="text-2xl font-bold mb-0">Receipt</h1>
                    </div>
                    <div className="border-b border-black mb-2" />
                    <div className="mb-2">
                        <p ><span className="font-semibold">Receipt ID: </span>{receipt?._id}</p>
                        <p ><span className="font-semibold">Date: </span>{datePart}</p>
                    </div>
                    <div className="border-b border-black mb-2" />
                    <div className="mb-2">
                        <span className="font-semibold text-lg mb-2">Customer Information</span>
                        <p ><span className="font-semibold">Name: </span>{receipt?.user?.name}</p>
                    </div>
                    <div className="border-b border-black mb-2" />
                    <div className="flex justify-between">
                        <span className="font-semibold text-lg">Items</span>
                    </div>

                    {Object.entries(groupedItems).map(([storeId, items]) => (

                        <div key={storeId} className="mb-4">
                            <p className="text-md font-semibold mb-1 italic">Store: {items[0].storeName}</p>
                            {items.map(item => (
                                <div className="flex justify-between items-center py-2 px-4shadow-md" key={item._id}>
                                    <span className="text-md">{item.name}</span>
                                    <div>
                                        <span className="text-md">{item.quantity} x </span>
                                        <span className="text-md">₱{item.price.toFixed(2)}</span>
                                        <span className="text-md font-semibold ml-10">₱{item.quantity * item.price}</span>
                                    </div>

                                </div>
                            ))}

                            <p className="text-md font-semibold just text-end">Subtotal: ₱{items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                            <div className="border-b border-black mb-2" />
                        </div>

                    ))}
                    <div className="flex justify-end">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">₱{receipt?.totalPrice.toFixed(2)}</span>
                    </div>
                    {qrCode && 
                    <div className="flex justify-center items-center">                   
                        <QRCode value={qrCode} className="bg-white shadow-md p-4 rounded-lg"  height={400}/>
                    </div>
                }


                </div>
                
            </div>
        </div>
    );
};

export default Receipt;
