import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllMaintenances } from '../../../store/reducers/maintenance/allMaintenanceSlice';
import { deleteMaintenance, deleteMaintenanceReset } from '../../../store/reducers/maintenance/maintenanceSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import MaintenanceModal from './maintenanceModal';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import { newMaintenanceReset } from '../../../store/reducers/maintenance/newMaintenanceSlice';
import DeleteIcon from '../../../assets/icons/trashcan.svg';
import ArchiveIcon from '../../../assets/icons/archive.svg';
import Swal from 'sweetalert2';

interface Store {
    _id: number | string;
    name: string;
    maintenance: number;
    cateredBy: string;
    issuedAt: Date;
    paidAt: Date;
    type: string;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | Date | React.ReactNode }[];
}

const MaintenanceTransaction: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { maintenances, loading } = useAppSelector((state) => state.allMaintenance);
    const { isDeleted } = useAppSelector((state) => state.maintenance);
    const { success } = useAppSelector((state) => state.newMaintenance);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (id) {
            dispatch(fetchAllMaintenances(id));
        }

        if (success && id) {
            dispatch(fetchAllMaintenances(id));
            setIsModalOpen(false);
            successMsg('Maintenance transaction added');
            dispatch(newMaintenanceReset());
        }

        if (isDeleted && id) {
            dispatch(fetchAllMaintenances(id));
            dispatch(deleteMaintenanceReset());
            successMsg('Maintenance deleted successfully');
        }
    }, [dispatch, success, isDeleted]);



    const deleteMaintenanceHandler = (id: number | string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteMaintenance(id));
                Swal.fire('Deleted!', 'Maintenance has been deleted.', 'success');
            }
        });
    };



    const renderMaintenanceStatus = (maintenance: number) => {
        const maintenanceValue = maintenance || 0;
        const maintenanceClass = maintenanceValue >= 0 ? 'text-green-600' : 'text-red-600';

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold ${maintenanceClass}`}>
                {maintenanceValue}
            </span>
        );
    };

    const maintenancesData: StoresData = {
        columns: [
            { label: 'Maintenance ID', field: '_id' },
            { label: 'Maintenance', field: 'maintenance' },
            { label: 'Catered By', field: 'cateredBy' },
            { label: 'Issued At', field: 'issuedAt' },
            { label: 'Paid At', field: 'paidAt' },
            { label: 'Type', field: 'type' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: maintenances.map((maintenance) => ({
            _id: maintenance._id,
            maintenance: maintenance.amount ? renderMaintenanceStatus(maintenance?.amount) : 'No payment yet',
            cateredBy: maintenance?.cateredBy === "store" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-yellow-500 text-white">
                    Store
                </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-600 text-white">
                    Admin
                </span>
            ),
            issuedAt: new Date(maintenance.issuedAt).toISOString().slice(0, 10),
            paidAt: maintenance?.paidAt ? new Date(maintenance.paidAt).toISOString().slice(0, 10) : 'Not paid yet',
            type: maintenance?.type === "paid" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-600 text-white">
                    Paid
                </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-red-600 text-white">
                    To Pay
                </span>
            ),

            actions: (
                <div className="flex items-center  justify-center ml-6">
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteMaintenanceHandler(maintenance._id)}>
                        <img
                            src={DeleteIcon}
                            alt="Delete Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </button>
                </div>
            ),
        })),
    };

    return (
        <>
            <MetaData title={'Maintenance'} />
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
                    <h1 className="text-2xl font-semibold">Maintenance Transaction</h1>
                </div>
                <div className="p-4 flex items-center justify-center">
                    <Link to={`/admin/maintenance/store-archived/${id}`}>
                        <img
                            src={ArchiveIcon}
                            alt="Delete Icon"
                            className="h8 w-8 mr-4"
                        />
                    </Link>
                    <button onClick={openModal} className={`${colors.primary} font-bold py-2 px-4 rounded-lg`}>
                        Add +
                    </button>


                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={maintenancesData.columns} rows={maintenancesData.rows} />
                )}

                <MaintenanceModal isOpen={isModalOpen} onClose={closeModal} />


            </div>
        </>
    );
};

export default MaintenanceTransaction;
