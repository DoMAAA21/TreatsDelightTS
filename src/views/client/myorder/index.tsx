import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllMyOrders } from '../../../store/reducers/myorder/myOrdersSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import TableLoader from '../../../components/loaders/TableLoader';

interface Transaction {
    id: number | string;
    name: string;
    quantity: string;
    price: number;
    status: string;
    store: string;
    date: Date;
    actions: React.ReactNode;
}

interface TransactionsData {
    columns: { label: string; field: keyof Transaction }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const TransactionPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orders  } = useAppSelector((state) => state.myOrders);
    const [ isFetched, setIsFetched ] = useState(false);

    useEffect(() => {
        dispatch(fetchAllMyOrders()).then(()=>{
            setIsFetched(true);
        });
    }, [dispatch]);

    console.log(orders);


    const transactionsData: TransactionsData = {
        columns: [
            { label: 'Transaction ID', field: 'id' },
            { label: 'Store', field: 'store' },
            { label: 'Product Name', field: 'name' },
            { label: 'Quantity', field: 'quantity' },
            { label: 'Price', field: 'price' },
            { label: 'Date', field: 'date' },
            { label: 'Status', field: 'status' },
        ],
        rows: orders.map((orders) => ({
            id: orders.orderItems.id,
            name: orders.orderItems.storeName,
            store: orders?.user?.name || 'Guest',
            quantity: orders.orderItems.quantity,
            price: orders.orderItems.price,
            date: new Date(orders.createdAt).toISOString().slice(0, 10),
            status: orders.orderItems.status.toLowerCase() === 'pending' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-yellow-500 text-white">
                    Pending
                </span>
            ) : orders.orderItems.status.toLowerCase() === 'paid' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-500 text-white">
                    Paid
                </span>
            ) : orders.orderItems.status.toLowerCase() === 'completed' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-500 text-white">
                    Completed
                </span>
            ) : orders.orderItems.status.toLowerCase() === 'incomplete' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-red-500 text-white">
                    Incomplete
                </span>
            ) : null,
        })),
    };

    return (
        <div className="px-20 pt-2">
            <MetaData title={'My Orders'} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #b0cca9, #ffffff)',
                    padding: '20px',
                    borderRadius: '8px',
                    height: '60px',
                }}
            >
                <div className="p-4">
                    <h1 className="text-2xl font-semibold">My Orders</h1>
                </div>
            </div>

            <div className="px-4">
                {!isFetched ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={transactionsData.columns} rows={transactionsData.rows} />
                )}

            </div>
        </div>
    );
};

export default TransactionPage;
