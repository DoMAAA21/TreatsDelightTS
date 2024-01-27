import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArchivedStores } from '../../../store/reducers/store/allStoressSlice';
import { deleteStore, deleteStoreReset } from '../../../store/reducers/store/storeSlice';
import Swal from 'sweetalert2';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import DeleteIcon from '../../../assets/icons/trashcan.svg';

interface Store {
    _id: number | string;
    name: string;
    slogan: string;
    stall: string;
    location: string;
    active: string | boolean;
    actions: React.ReactNode;
}

interface StoresData {
    columns: { label: string; field: keyof Store }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const ArchivedStorePage: FC = () => {
    const dispatch = useAppDispatch();
    const { stores, loading } = useAppSelector((state) => state.allStores);
    const { isDeleted } = useAppSelector((state) => state.store);

    useEffect(() => {
        dispatch(fetchArchivedStores());

        if (isDeleted) {
            dispatch(fetchArchivedStores());
            dispatch(deleteStoreReset());
            successMsg('Store deleted successfully');
        }
    }, [dispatch, isDeleted]);

    const deleteStoreHandler = (id: number | string) => {
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
                dispatch(deleteStore(id));
                Swal.fire('Deleted!', 'Store has been deleted.', 'success');
            }
        });
    };

    const storesData: StoresData = {
        columns: [
            { label: 'Store ID', field: '_id' },
            { label: 'Name', field: 'name' },
            { label: 'Slogan', field: 'slogan' },
            { label: 'Stall', field: 'stall' },
            { label: 'Location', field: 'location' },
            { label: 'Active', field: 'active' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: stores.map((store) => ({
            _id: store._id,
            name: store.name,
            slogan: store.slogan,
            stall: store.stall,
            location: store.location,
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
                <div className="flex items-center justify-center ml-6">
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteStoreHandler(store._id)}>
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
            <MetaData title={'Archived Stores'} />
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
                    <h1 className="text-2xl font-semibold">Stores Archive</h1>
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

export default ArchivedStorePage;
