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
}

const CartTable: React.FC<CartTableProps> = ({ cart, handleCheckout}) => {
    const total = cart.reduce((acc, item) => acc + item.sellPrice * (item?.quantity ?? 0), 0);

    return (
        <div className="w-1/3 p-4 ">
            <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Cart</h2>
                <table className="table-auto bg-white rounded-md "  style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Qty</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                            <tr key={item._id}>
                                <td className="border px-8 py-2">{item.name}</td>
                                <td className="border px-4 py-2">{item.quantity}</td>
                                <td className="border px-6 py-2">₱{item.sellPrice * (item?.quantity ?? 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="border px-4 py-2 font-bold italic" colSpan={2}>Total:</td>
                            <td className="border px-4 py-2">₱{total}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="bg-white rounded-md mt-4" onClick={()=> handleCheckout()}>
                    <button type="button" className={`${colors.secondary} px-4 py-3 rounded-md w-full`}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartTable;
