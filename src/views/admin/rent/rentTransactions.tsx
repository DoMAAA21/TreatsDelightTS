import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllRents } from '../../../store/reducers/rent/allRentsSlice';
import { deleteRent, deleteRentReset } from '../../../store/reducers/rent/rentSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import RentModal from './rentModal';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import { colors } from '../../../components/theme';
import { newRentReset } from '../../../store/reducers/rent/newRentSlice';
import DeleteIcon from '../../../assets/icons/trashcan.svg';
import ArchiveIcon from '../../../assets/icons/archive.svg';
import Swal from 'sweetalert2';

interface Store {
    _id: number | string;
    name: string;
    rent: number;
    issuedAt: Date;
    paidAt: Date;
    type: string;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | Date | React.ReactNode }[];
}

const RentPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { rents, loading } = useAppSelector((state) => state.allRent);
    const { isDeleted } = useAppSelector((state) => state.rent);
    const { success } = useAppSelector((state) => state.newRent);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (id) {
            dispatch(fetchAllRents(id));
        }

        if (success && id) {
            dispatch(fetchAllRents(id));
            setIsModalOpen(false);
            successMsg('Rent transaction added');
            dispatch(newRentReset());
        }

        if (isDeleted && id) {
            dispatch(fetchAllRents(id));
            dispatch(deleteRentReset());
            successMsg('Rent deleted successfully');
        }
    }, [dispatch, success, isDeleted]);


    
    const deleteRentHandler = (id: number | string) => {
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
                dispatch(deleteRent(id));
                Swal.fire('Deleted!', 'Rent has been deleted.', 'success');
            }
        });
    };



    const renderRentStatus = (rent: number) => {
        const rentValue = rent || 0;
        const rentClass = rentValue >= 0 ? 'text-green-600' : 'text-red-600';

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold ${rentClass}`}>
                {rentValue}
            </span>
        );
    };

    const rentsData: StoresData = {
        columns: [
            { label: 'Rent ID', field: '_id' },
            { label: 'Rent', field: 'rent' },
            { label: 'Issued At', field: 'issuedAt' },
            { label: 'Paid At', field: 'paidAt' },
            { label: 'Type', field: 'type' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: rents.map((rent) => ({
            _id: rent._id,
            rent: rent.amount ? renderRentStatus(rent?.amount) : 'No payment yet',
            issuedAt: new Date(rent.issuedAt).toISOString().slice(0, 10),
            paidAt: rent?.paidAt ? new Date(rent.paidAt).toISOString().slice(0, 10) : 'Not paid yet',
            type: rent?.type==="paid" ? (
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
                     <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteRentHandler(rent._id)}>
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
                    <h1 className="text-2xl font-semibold">Rent Transaction</h1>
                </div>
                <div className="p-4 flex items-center justify-center">
                <Link to={`/admin/rent/store-archived/${id}`}>
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
                    <DataTable columns={rentsData.columns} rows={rentsData.rows} />
                )}

                <RentModal isOpen={isModalOpen} onClose={closeModal} />


            </div>
        </>
    );
};

export default RentPage;
