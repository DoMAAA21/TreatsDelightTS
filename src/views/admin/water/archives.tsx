import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArchivedWaters } from '../../../store/reducers/water/allWatersSlice';
import { restoreWater, restoreWaterReset } from '../../../store/reducers/water/waterSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import RestoreIcon from '../../../assets/icons/restore.svg';
import Swal from 'sweetalert2';

interface Store {
    _id: number | string;
    name: string;
    water: number;
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

const WaterArchivesPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { waters, loading } = useAppSelector((state) => state.allWater);
    const { isRestored } = useAppSelector((state) => state.water);



    useEffect(() => {
        if (id) {
            dispatch(fetchArchivedWaters(id));
        }


        if (isRestored && id) {
            dispatch(fetchArchivedWaters(id));
            dispatch(restoreWaterReset());
            successMsg('Water deleted successfully');
        }
    }, [dispatch, isRestored]);


    
    const restoreWaterHandler = (id: number | string) => {
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
                dispatch(restoreWater(id));
                Swal.fire('Restored!', 'Restore has been deleted.', 'success');
            }
        });
    };



    const renderWaterStatus = (water: number) => {
        const waterValue = water || 0;
        const waterClass = waterValue >= 0 ? 'text-green-600' : 'text-red-600';

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold ${waterClass}`}>
                {waterValue}
            </span>
        );
    };

    const watersData: StoresData = {
        columns: [
            { label: 'Water ID', field: '_id' },
            { label: 'Water Total', field: 'water' },
            { label: 'Consumed x m³', field: 'pxc' },
            { label: 'Additionals', field: 'additionals' },
            { label: 'Issued At', field: 'issuedAt' },
            { label: 'Paid At', field: 'paidAt' },
            { label: 'Type', field: 'type' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: waters.map((water) => ({
            _id: water._id,
            water: water.total ? renderWaterStatus(water?.total) : 'No payment yet',
            pxc: `${water.consumed} x ${water.price}`,
            additionals: water.additionals,
            issuedAt: new Date(water.issuedAt).toISOString().slice(0, 10),
            paidAt: water?.paidAt ? new Date(water.paidAt).toISOString().slice(0, 10) : 'Not paid yet',
            type: water?.type==="paid" ? (
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
                     <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => restoreWaterHandler(water._id)}>
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
            <MetaData title={'Waters'} />
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
                    <h1 className="text-2xl font-semibold">Water Transaction</h1>
                </div>

            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={watersData.columns} rows={watersData.rows} />
                )}


            </div>
        </>
    );
};

export default WaterArchivesPage;
