import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArchivedElectricity } from '../../../store/reducers/electricity/allElectricitySlice';
import { restoreElectricity, restoreElectricityReset } from '../../../store/reducers/electricity/electricitySlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import RestoreIcon from '../../../assets/icons/restore.svg';
import Swal from 'sweetalert2';

interface Store {
    _id: number | string;
    name: string;
    electricity: number;
    pxc: number;
    additionals: number;
    issuedAt: Date;
    paidAt: Date;
    type: string;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | Date | React.ReactNode }[];
}

const ElectricityPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { electricity, loading } = useAppSelector((state) => state.allElectricity);
    const { isRestored } = useAppSelector((state) => state.electricity);



    useEffect(() => {
        if (id) {
            dispatch(fetchArchivedElectricity(id));
        }

        if (isRestored && id) {
            dispatch(fetchArchivedElectricity(id));
            successMsg('Electricity restored');
            dispatch(restoreElectricityReset());
        }

    }, [dispatch, isRestored]);


    
    const deleteElectricityHandler = (id: number | string) => {
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
                dispatch(restoreElectricity(id));
                Swal.fire('Restored!', 'Electricity has been restored.', 'success');
            }
        });
    };



    const renderElectricityStatus = (electricity: number) => {
        const electricityValue = electricity || 0;
        const electricityClass = electricityValue >= 0 ? 'text-green-600' : 'text-red-600';

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold ${electricityClass}`}>
                {electricityValue}
            </span>
        );
    };

    const electricityData: StoresData = {
        columns: [
            { label: 'Electricity ID', field: '_id' },
            { label: 'Electricity Total', field: 'electricity' },
            { label: 'Consumed x m³', field: 'pxc' },
            { label: 'Additionals', field: 'additionals' },
            { label: 'Issued At', field: 'issuedAt' },
            { label: 'Paid At', field: 'paidAt' },
            { label: 'Type', field: 'type' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: electricity.map((electricity) => ({
            _id: electricity._id,
            electricity: electricity.total ? renderElectricityStatus(electricity?.total) : 'No payment yet',
            pxc: `${electricity.consumed} x ${electricity.price}`,
            additionals: electricity.additionals,
            issuedAt: new Date(electricity.issuedAt).toISOString().slice(0, 10),
            paidAt: electricity?.paidAt ? new Date(electricity.paidAt).toISOString().slice(0, 10) : 'Not paid yet',
            type: electricity?.type==="paid" ? (
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
                     <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteElectricityHandler(electricity._id)}>
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
            <MetaData title={'Electricity'} />
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
                    <h1 className="text-2xl font-semibold">Electricity Transaction</h1>
                </div>

            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={electricityData.columns} rows={electricityData.rows} />
                )}

        
            </div>
        </>
    );
};

export default ElectricityPage;
