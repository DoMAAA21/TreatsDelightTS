import React from 'react';
import { colors } from '../../../components/theme';

interface CartItem {
    _id: number | string;
    name: string;
    description: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    category: string;
    active: boolean | string;
    quantity?: number;
}

interface CartTableProps {
    cart: CartItem[];
    handleCheckout: () => void;
    handleRemoveItem: (itemId: number | string) => void;
}

const CartTable: React.FC<CartTableProps> = ({ cart, handleCheckout, handleRemoveItem }) => {
    const total = cart.reduce((acc, item) => acc + item.sellPrice * (item?.quantity ?? 0), 0);

    return (
        <div className="w-4/12 pt-4 ml-4 ">
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Cart</h2>
                <div className="overflow-x-auto">
                <table className="table-auto bg-white rounded-md max-w-full" style={{ width: '100%' }}>
                    <thead className="text-indigo-500 rounded-md">
                        <tr >
                            <th className="px-4 py-6 bg-blue-200 rounded-tl-md">Product</th>
                            <th className="px-4 py-2 bg-blue-200">Qty</th>
                            <th className="px-4 py-2 bg-blue-200">Price</th>
                            <th className="px-1 py-2 bg-blue-200 rounded-tr-md"></th>
                        </tr>
                    </thead>
                    <tbody className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                            <tr key={item._id}>
                                <td className="border px-4 py-2 font-semibold">{item.name}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-6 py-2">₱{item.sellPrice * (item?.quantity ?? 0)}</td>
                                <td className=" px-1 py-4 flex justify-center">
                                    <button
                                        type="button"
                                        className="cursor-pointer"
                                        onClick={() => handleRemoveItem(item._id)}
                                    >
                                        <div className="rounded-3xl py-1 px-3 bg-red-500 hover:bg-red-700 text-white">
                                        X
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="border px-4 py-2 font-bold italic" colSpan={3}>Total:</td>
                            <td className="border px-4 py-2 text-xl font-bold bg-indigo-500 text-white">₱{total}</td>
                        </tr>
                    </tfoot>
                </table>
                </div>
                <div className="mt-4" onClick={() => handleCheckout()}>
                    <button type="button" className={`${colors.secondary} px-4 py-3 rounded-3xl w-full`}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartTable;
