import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllOwners } from '../../../store/reducers/user/allUsersSlice';
import { deleteUser, deleteUserReset } from '../../../store/reducers/user/userSlice';
import Swal from 'sweetalert2';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { colors } from '../../../components/theme';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/trashcan.svg';

interface User {
    _id: number | string;
    fullName: string;
    email: string;
    religion: string;
    role: string;
    actions: React.ReactNode;
}

interface UsersData {
    columns: { label: string; field: keyof User }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const UserPage: FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((state) => state.allUsers);
    const { isDeleted } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllOwners());

        if (isDeleted) {
            dispatch(fetchAllOwners());
            dispatch(deleteUserReset());
            successMsg('User deleted successfully');
        }
    }, [dispatch, isDeleted]);

    const deleteUserHandler = (id: number | string) => {
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
                dispatch(deleteUser(id));
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    const usersData: UsersData = {
        columns: [
            { label: 'User ID', field: '_id' },
            { label: 'Full Name', field: 'fullName' },
            { label: 'Email', field: 'email' },
            { label: 'Religion', field: 'religion' },
            { label: 'Role', field: 'role' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: users.map((user) => ({
            _id: user._id,
            fullName: `${user.fname} ${user.lname}`,
            email: user.email,
            religion: user.religion,
            role: user.role,
            actions: (
                <div className="flex items-center ml-6">
                    <Link to={`/admin/owner/${user._id}`} className="mr-2 w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8">
                        <img
                            src={EditIcon}
                            alt="Edit Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </Link>
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteUserHandler(user._id)}>
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
            <MetaData title={'All Owners'} />
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
                    <h1 className="text-2xl font-semibold">Owners</h1>
                </div>
                <div className="p-4">
                    <Link to="/admin/owner-add">
                        <button className={`${colors.primary} font-bold py-2 px-4 rounded-lg`}>Add +</button>
                    </Link>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={usersData.columns} rows={usersData.rows} />
                )}

            </div>
        </>
    );
};

export default UserPage;
