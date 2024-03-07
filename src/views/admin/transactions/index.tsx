import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllTransactions } from '../../../store/reducers/transaction/allTransactionSlice';
import { updateTransaction, updateTransactionReset } from '../../../store/reducers/transaction/transactionSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import TableLoader from '../../../components/loaders/TableLoader';
import SwitchIcon from '../../../assets/icons/switch.svg';

interface Transaction {
    _id: number | string;
    name: string;
    quantity: string;
    price: number;
    status: string;
    customerName: string;
    actions: React.ReactNode;
}

interface TransactionsData {
    columns: { label: string; field: keyof Transaction }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const TransactionPage: FC = () => {
    const dispatch = useAppDispatch();
    const { transactions, loading } = useAppSelector((state) => state.allTransaction);
    const [ isFetched, setIsFetched ] = useState(false);
    const { isUpdated } = useAppSelector((state) => state.transaction);
    useEffect(() => {
        dispatch(fetchAllTransactions()).then(()=>{
            setIsFetched(true);
        });
    }, [dispatch]);

    useEffect(() => {
        if (isUpdated) {
            dispatch(fetchAllTransactions());
        }
    }, [isUpdated]);

    const updateTransactionHandler = (id: number | string) => {
        dispatch(updateTransaction(id));
        dispatch(updateTransactionReset());
    };

    const transactionsData: TransactionsData = {
        columns: [
            { label: 'Transaction ID', field: '_id' },
            { label: 'Customer', field: 'customerName' },
            { label: 'Product Name', field: 'name' },
            { label: 'Quantity', field: 'quantity' },
            { label: 'Price', field: 'price' },
            { label: 'Status', field: 'status' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: transactions.map((transaction) => ({
            _id: transaction.orderItems.id,
            name: transaction.orderItems.name,
            customerName: transaction.user.name,
            quantity: transaction.orderItems.quantity,
            price: transaction.orderItems.price,
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
                    <button className="w-8 h-8 md:h-14 md:w-12 lg:h-8 lg:w-8" disabled={loading} onClick={() => updateTransactionHandler(transaction.orderItems.id)}>
                        <img
                            src={SwitchIcon}
                            alt="Switch Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </button>
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
