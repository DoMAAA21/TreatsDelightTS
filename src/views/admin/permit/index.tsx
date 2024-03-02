import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllStores } from '../../../store/reducers/store/allStoressSlice';
import { updatePermitReset } from '../../../store/reducers/permit/permitSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import PermitModal from './permitModal';
import ViewPermitModal from './viewPermitModal';
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

const PermitPage: FC = () => {
    const dispatch = useAppDispatch();
    const { stores, loading } = useAppSelector((state) => state.allStores);
    const { success } = useAppSelector((state) => state.permit);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPermitModalOpen, setIsPermitModalOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<string | number>("");

    const openModal = (id: string | number) => {
        setSelectedRowId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openPermitModal = (id: string | number) => {
        setSelectedRowId(id);
        setIsPermitModalOpen(true);
    };

    const closePermitModal = () => {
        setIsPermitModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchAllStores());

        if (success) {
            dispatch(fetchAllStores());
            closeModal();
            successMsg('Permit Updated');
            dispatch(updatePermitReset());
        }

    }, [dispatch, success]);





    const calculateExpirationColor = (expirationDate: Date | undefined): React.ReactNode => {
        if (!expirationDate) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-400 text-white">
                    No Updated Permit Yet.
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
            startedAt: store?.permit?.startedAt ? new Date(store.permit.startedAt).toISOString().slice(0, 10) : 'No updated permit yet.',
            expiration: store?.permit?.expiration ? calculateExpirationColor(new Date(store.permit.expiration)) : 'No updated permit yet.',
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
                    {store.permit?.startedAt && store.permit?.expiration &&
                        (
                            <button onClick={() => openPermitModal(store._id)} className={`${colors.info}  py-2 px-4 rounded-lg`}>
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
            <MetaData title={'Rents'} />
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
                    <h1 className="text-2xl font-semibold">Permits</h1>
                </div>

            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={storesData.columns} rows={storesData.rows} />
                )}

                <PermitModal isOpen={isModalOpen} onClose={closeModal} id={selectedRowId} />
                <ViewPermitModal isOpen={isPermitModalOpen} onClose={closePermitModal} id={selectedRowId} />


            </div>
        </>
    );
};

export default PermitPage;
