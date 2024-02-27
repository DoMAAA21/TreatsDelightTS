import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllElectricity } from '../../../store/reducers/electricity/allElectricitySlice';
import { deleteElectricity, deleteElectricityReset } from '../../../store/reducers/electricity/electricitySlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import ElectricityModal from './electricityModal';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import { newElectricityReset } from '../../../store/reducers/electricity/newElectricitySlice';
import DeleteIcon from '../../../assets/icons/trashcan.svg';
import ArchiveIcon from '../../../assets/icons/archive.svg';
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
    const { isDeleted } = useAppSelector((state) => state.electricity);
    const { success } = useAppSelector((state) => state.newElectricity);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (id) {
            dispatch(fetchAllElectricity(id));
        }

        if (success && id) {
            dispatch(fetchAllElectricity(id));
            setIsModalOpen(false);
            successMsg('Electricity transaction added');
            dispatch(newElectricityReset());
        }

        if (isDeleted && id) {
            dispatch(fetchAllElectricity(id));
            dispatch(deleteElectricityReset());
            successMsg('Electricity deleted successfully');
        }
    }, [dispatch, success, isDeleted]);


    
    const deleteElectricityHandler = (id: number | string) => {
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
                dispatch(deleteElectricity(id));
                Swal.fire('Deleted!', 'Electricity has been deleted.', 'success');
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
            { label: 'Consumed x watts', field: 'pxc' },
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
                <div className="p-4 flex items-center justify-center">
                <Link to={`/admin/electricity/store-archived/${id}`}>
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
                    <DataTable columns={electricityData.columns} rows={electricityData.rows} />
                )}

                <ElectricityModal isOpen={isModalOpen} onClose={closeModal} />


            </div>
        </>
    );
};

export default ElectricityPage;
