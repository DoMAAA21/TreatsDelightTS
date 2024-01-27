import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllRents } from '../../../store/reducers/rent/allRentSlice';
import { deleteStoreReset } from '../../../store/reducers/store/storeSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import RentModal from './rentModal';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import ArrowRightIcon from '../../../assets/icons/arrowright.svg';

import { colors } from '../../../components/theme';



interface Store {
    _id: number | string;
    name: string;
    rent: number;
    actions: React.ReactNode;

}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const RentPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { rents, loading } = useAppSelector((state) => state.allRent);
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

        // if (isDeleted && id) {
        //     dispatch(fetchAllRents(id));
        //     dispatch(deleteStoreReset());
        //     successMsg('Store deleted successfully');
        // }
    }, [dispatch, rents]);



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
            { label: 'Store ID', field: '_id' },
            { label: 'Name', field: 'name' },
            { label: 'Rent', field: 'rent' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: rents.map((rent) => ({
            _id: rent._id,
            name: rent.storeId,
            rent: rent.amount ? renderRentStatus(rent?.amount) : 'No payment yet',

            actions: (
                <div className="flex items-center  justify-center ml-6">
                    <Link to={`/admin/store/${rent._id}`} className="mr-2 w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8">
                        <img
                            src={ArrowRightIcon}
                            alt="Edit Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </Link>
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
                <div>
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
