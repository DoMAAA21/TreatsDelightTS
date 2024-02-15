import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArchivedRents } from '../../../store/reducers/rent/allRentsSlice';
import { restoreRent, restoreRentReset } from '../../../store/reducers/rent/rentSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import RestoreIcon from '../../../assets/icons/restore.svg';
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

const RentArchivesPage: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { rents, loading } = useAppSelector((state) => state.allRent);
    const { isRestored } = useAppSelector((state) => state.rent);


    useEffect(() => {
        if (id) {
            dispatch(fetchArchivedRents(id));
        }

        if (isRestored && id) {

            console.log('hatdog');
            dispatch(fetchArchivedRents(id));
            successMsg('Rent restored');
            dispatch(restoreRentReset());
        }

    }, [dispatch, isRestored]);



    const restoreRentHandler = (id: number | string) => {
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
                dispatch(restoreRent(id));
                Swal.fire('Restored!', 'Rent has been restored.', 'success');
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
            type: rent?.type === "paid" ? (
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
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => restoreRentHandler(rent._id)}>
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
            <MetaData title={'Archived Rents'} />
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
                    <h1 className="text-2xl font-semibold">Rent Archives</h1>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={rentsData.columns} rows={rentsData.rows} />
                )}
            </div>
        </>
    );
};

export default RentArchivesPage;
