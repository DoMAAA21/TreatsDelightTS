import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllWaters } from '../../../store/reducers/water/allWatersSlice';
import { deleteWater, deleteWaterReset } from '../../../store/reducers/water/waterSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import WaterModal from './waterModal';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import { newWaterReset } from '../../../store/reducers/water/newWaterSlice';
import DeleteIcon from '../../../assets/icons/trashcan.svg';
import ArchiveIcon from '../../../assets/icons/archive.svg';
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

const WaterPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { waters, loading } = useAppSelector((state) => state.allWater);
    const { isDeleted } = useAppSelector((state) => state.water);
    const { success } = useAppSelector((state) => state.newWater);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (id) {
            dispatch(fetchAllWaters(id));
        }

        if (success && id) {
            dispatch(fetchAllWaters(id));
            setIsModalOpen(false);
            successMsg('Water transaction added');
            dispatch(newWaterReset());
        }

        if (isDeleted && id) {
            dispatch(fetchAllWaters(id));
            dispatch(deleteWaterReset());
            successMsg('Water deleted successfully');
        }
    }, [dispatch, success, isDeleted]);


    
    const deleteWaterHandler = (id: number | string) => {
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
                dispatch(deleteWater(id));
                Swal.fire('Deleted!', 'Water has been deleted.', 'success');
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
                     <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteWaterHandler(water._id)}>
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
                <div className="p-4 flex items-center justify-center">
                <Link to={`/admin/water/store-archived/${id}`}>
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
                    <DataTable columns={watersData.columns} rows={watersData.rows} />
                )}

                <WaterModal isOpen={isModalOpen} onClose={closeModal} />


            </div>
        </>
    );
};

export default WaterPage;
