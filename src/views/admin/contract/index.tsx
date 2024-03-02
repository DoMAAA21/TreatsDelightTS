import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllStores } from '../../../store/reducers/store/allStoressSlice';
import { updateContractReset } from '../../../store/reducers/contract/contractSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import ContractModal from './contractModal';
import ViewContractModal from './viewContractModal';
import { successMsg } from '../../../components/toast';


interface Store {
    name: string;
    startedAt: Date;
    expiration: Date;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | Date | React.ReactNode }[];
}

const ContractPage: FC = () => {
    const dispatch = useAppDispatch();
    const { stores, loading } = useAppSelector((state) => state.allStores);
    const { success } = useAppSelector((state) => state.contract);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<string | number>("");

    const openModal = (id: string | number) => {
        setSelectedRowId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openContractModal = (id: string | number) => {
        setSelectedRowId(id);
        setIsContractModalOpen(true);
    };

    const closeContractModal = () => {
        setIsContractModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchAllStores());

        if (success) {
            dispatch(fetchAllStores());
            closeModal();
            successMsg('Contract Updated');
            dispatch(updateContractReset());
        }

    }, [dispatch, success]);





    const calculateExpirationColor = (expirationDate: Date | undefined): React.ReactNode => {
        if (!expirationDate) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-400 text-white">
                    No Updated Contract Yet.
                </span>
            );
        }
        const currentDate = new Date();
        const timeDifference = expirationDate.getTime() - currentDate.getTime();
        const dateString = expirationDate.toISOString().slice(0, 10);
        let colorClassName: string;
        if (timeDifference > 30 * 24 * 60 * 60 * 1000) {
            colorClassName = 'bg-green-600';
        } else if (timeDifference > 0) {
            colorClassName = 'bg-yellow-500';
        } else {
            colorClassName = 'bg-red-600';
        }
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-white ${colorClassName}`}>
                {dateString}
            </span>
        );
    };




    const storesData: StoresData = {
        columns: [
            { label: 'Store', field: 'name' },
            { label: 'Started At', field: 'startedAt' },
            { label: 'Expiration', field: 'expiration' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: stores.map((store) => ({
            _id: store._id,
            name: store.name,
            startedAt: store?.contract?.startedAt ? new Date(store.contract.startedAt).toISOString().slice(0, 10) : 'No updated contract yet.',
            expiration: store?.contract?.expiration ? calculateExpirationColor(new Date(store.contract.expiration)) : 'No updated contract yet.',
            active: store.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-600 text-white">
                    Yes
                </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-red-600 text-white">
                    No
                </span>
            ),
            actions: (
                <div className="flex items-center  justify-center ml-6">
                    <button onClick={() => openModal(store._id)} className={`${colors.danger} py-2 px-4 rounded-lg mr-2`}>
                        Update
                    </button>
                    {store.contract?.startedAt && store.contract?.expiration &&
                        (
                            <button onClick={() => openContractModal(store._id)} className={`${colors.info}  py-2 px-4 rounded-lg`}>
                                View
                            </button>
                        )
                    }
                </div>
            ),
        })),
    };

    return (
        <>
            <MetaData title={'Contracts'} />
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
                    <h1 className="text-2xl font-semibold">Contracts</h1>
                </div>

            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={storesData.columns} rows={storesData.rows} />
                )}

                <ContractModal isOpen={isModalOpen} onClose={closeModal} id={selectedRowId} />
                <ViewContractModal isOpen={isContractModalOpen} onClose={closeContractModal} id={selectedRowId} />


            </div>
        </>
    );
};

export default ContractPage;
