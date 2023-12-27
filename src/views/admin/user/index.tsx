import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllUsers } from '../../../store/reducers/user/allUsersSlice';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface User {
  _id: number | string; // Assuming _id is the correct property name for user ID
  fullName : string;
  email: string;
  course: string;
  religion: string;
  role: string;
}

type DataRow<T> = Record<keyof T, string | number>;

interface UsersData {
  columns: { label: string; field: keyof User }[];
  rows: DataRow<User>[];
}

const UserPage: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const usersData: UsersData = {
    columns: [
      {
        label: 'User ID',
        field: '_id', 
      },
      {
        label: 'Full Name',
        field: 'fullName', 
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Course',
        field: 'course',
      },
      {
        label: 'Religion',
        field: 'religion',
      },
      {
        label: 'Role',
        field: 'role',
      },
    ],
    rows: users.map((user) => ({
        _id: user._id,
        fullName: `${user.fname} ${user.lname}`,
        email: user.email,
        course: user.course,
        religion: user.religion,
        role: user.role,
      } as DataRow<User>)),
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
      </div>

      <div className="ph-4">
        <DataTable columns={usersData.columns} rows={usersData.rows} />
      </div>
    </>
  );
};

export default UserPage;
