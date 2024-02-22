import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArchivedMaintenances } from '../../../store/reducers/maintenance/allMaintenanceSlice';
import { restoreMaintenance, restoreMaintenanceReset } from '../../../store/reducers/maintenance/maintenanceSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import RestoreIcon from '../../../assets/icons/restore.svg';
import Swal from 'sweetalert2';

interface Store {
    _id: number | string;
    name: string;
    maintenance: number;
    issuedAt: Date;
    paidAt: Date;
    type: string;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | Date | React.ReactNode }[];
}

const MaintenanceArchivesPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { maintenances, loading } = useAppSelector((state) => state.allMaintenance);
    const { isRestored } = useAppSelector((state) => state.maintenance);


    useEffect(() => {
        if (id) {
            dispatch(fetchArchivedMaintenances(id));
        }

        if (isRestored && id) {

            console.log('hatdog');
            dispatch(fetchArchivedMaintenances(id));
            successMsg('Maintenance restored');
            dispatch(restoreMaintenanceReset());
        }

    }, [dispatch, isRestored]);



    const restoreMaintenanceHandler = (id: number | string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(restoreMaintenance(id));
                Swal.fire('Restored!', 'Maintenance has been restored.', 'success');
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
            { label: 'Issued At', field: 'issuedAt' },
            { label: 'Paid At', field: 'paidAt' },
            { label: 'Type', field: 'type' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: maintenances.map((maintenance) => ({
            _id: maintenance._id,
            maintenance: maintenance.amount ? renderMaintenanceStatus(maintenance?.amount) : 'No payment yet',
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
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => restoreMaintenanceHandler(maintenance._id)}>
                        <img
                            src={RestoreIcon}
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
            <MetaData title={'Archived Maintenances'} />
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
                    <h1 className="text-2xl font-semibold">Maintenance Archives</h1>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={maintenancesData.columns} rows={maintenancesData.rows} />
                )}
            </div>
        </>
    );
};

export default MaintenanceArchivesPage;
