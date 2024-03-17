import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllTransactions } from '../../../store/reducers/transaction/allTransactionSlice';
import { updateTransaction, updateTransactionReset } from '../../../store/reducers/transaction/transactionSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import TableLoader from '../../../components/loaders/TableLoader';


interface Transaction {
    _id: number | string;
    name: string;
    quantity: string;
    price: number;
    status: string;
    customerName: string;
    date: Date;
    actions: React.ReactNode;
}

interface TransactionsData {
    columns: { label: string; field: keyof Transaction }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const TransactionPage: FC = () => {
    const dispatch = useAppDispatch();
    const { transactions } = useAppSelector((state) => state.allTransaction);
    const [isFetched, setIsFetched] = useState(false);
    const { isUpdated } = useAppSelector((state) => state.transaction);
    const [statusDefaultValue, setStatusDefaultvalue] = useState("");
    useEffect(() => {
        dispatch(fetchAllTransactions()).then(() => {
            setIsFetched(true);
        });
    }, [dispatch]);

    useEffect(() => {
        if (isUpdated) {
            dispatch(fetchAllTransactions());
        }
    }, [isUpdated]);

    const handleDropdownChange = (id: number | string, status: string) => {
        dispatch(updateTransaction({ id, status }));
        dispatch(updateTransactionReset());
        setStatusDefaultvalue("");
    };

    const transactionsData: TransactionsData = {
        columns: [
            { label: 'Transaction ID', field: '_id' },
            { label: 'Customer', field: 'customerName' },
            { label: 'Product Name', field: 'name' },
            { label: 'Quantity', field: 'quantity' },
            { label: 'Price', field: 'price' },
            { label: 'Date', field: 'date' },
            { label: 'Status', field: 'status' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: transactions.map((transaction) => ({
            _id: transaction.orderItems.id,
            name: transaction.orderItems.name,
            customerName: transaction?.user?.name || 'Guest',
            quantity: transaction.orderItems.quantity,
            price: transaction.orderItems.price,
            date: new Date(transaction.createdAt).toISOString().slice(0, 10),
            status: transaction.orderItems.status.toLowerCase() === 'pending' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-yellow-500 text-white">
                    Pending
                </span>
            ) : transaction.orderItems.status.toLowerCase() === 'paid' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-500 text-white">
                    Paid
                </span>
            ) : transaction.orderItems.status.toLowerCase() === 'completed' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-500 text-white">
                    Completed
                </span>
            ) : transaction.orderItems.status.toLowerCase() === 'incomplete' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-red-500 text-white">
                    Incomplete
                </span>
            ) : null,
            actions: (
                <div className="flex items-center justify-center">
                    <select
                        value={statusDefaultValue}
                        onChange={(e) => handleDropdownChange(transaction.orderItems.id, e.target.value)}
                        className="block text-black border w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>Select</option>
                        <option value="Pending" >Pending</option>
                        <option value="Paid" >Paid</option>
                        <option value="Completed">Completed</option>
                        <option value="Incomplete">Delete</option>
                    </select>
                </div>
            ),
        })),
    };

    return (
        <>
            <MetaData title={'All Transactions'} />
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
                    <h1 className="text-2xl font-semibold">Transactions</h1>
                </div>
            </div>

            <div className="ph-4">
                {!isFetched ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={transactionsData.columns} rows={transactionsData.rows} />
                )}

            </div>
        </>
    );
};

export default TransactionPage;
