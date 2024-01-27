import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllStores } from '../../../store/reducers/store/allStoressSlice';
import { deleteStoreReset } from '../../../store/reducers/store/storeSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import ArrowRightIcon from '../../../assets/icons/arrowright.svg';



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
    const { stores, loading } = useAppSelector((state) => state.allStores);
    const { isDeleted } = useAppSelector((state) => state.store);

    useEffect(() => {
        dispatch(fetchAllStores());

        if (isDeleted) {
            dispatch(fetchAllStores());
            dispatch(deleteStoreReset());
            successMsg('Store deleted successfully');
        }
    }, [dispatch, isDeleted]);

   

    const renderRentStatus = (rent : number) => {
        const rentValue = rent || 0;
        const rentClass = rentValue >= 0 ? 'text-green-600' : 'text-red-600';
      
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold ${rentClass}`}>
            {rentValue}
          </span>
        );
      };

    const storesData: StoresData = {
        columns: [
            { label: 'Store ID', field: '_id' },
            { label: 'Name', field: 'name' },
            { label: 'Rent', field: 'rent' },
            { label: 'Actions', field: 'actions' },

        ],
        rows: stores.map((store) => ({
            _id: store._id,
            name: store.name,
            rent: store.rent ? renderRentStatus(store?.rent) : 'No payment yet',
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
                    <Link to={`/admin/store/${store._id}`} className="mr-2 w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8">
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
                    <h1 className="text-2xl font-semibold">Rents</h1>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={storesData.columns} rows={storesData.rows} />
                )}

            </div>
        </>
    );
};

export default RentPage;
