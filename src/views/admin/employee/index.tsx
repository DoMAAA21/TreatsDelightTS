import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchAllEmployees } from '../../../store/reducers/employee/allEmployeesSlice';
import { deleteEmployee, deleteEmployeeReset } from '../../../store/reducers/employee/employeeSlice';
import Swal from 'sweetalert2';
import DataTable from '../../../components/DataTable';
import MetaData from '../../../components/MetaData';
import { colors } from '../../../components/theme';
import { successMsg } from '../../../components/toast';
import TableLoader from '../../../components/loaders/TableLoader';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/trashcan.svg';

interface Employee {
    _id: number | string;
    fullName: string;
    email: string;
    religion: string;
    role: string;
    actions: React.ReactNode;
}

interface EmployeesData {
    columns: { label: string; field: keyof Employee }[];
    rows: { [key: string]: string | number | React.ReactNode }[];
}

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch();
    const { employees, loading } = useAppSelector((state) => state.allEmployees);
    const { isDeleted } = useAppSelector((state) => state.employee);

    useEffect(() => {
        dispatch(fetchAllEmployees());

        if (isDeleted) {
            dispatch(fetchAllEmployees());
            dispatch(deleteEmployeeReset());
            successMsg('Employee deleted successfully');
        }
    }, [dispatch, isDeleted]);

    const deleteEmployeeHandler = (id: number | string) => {
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
                dispatch(deleteEmployee(id));
                Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
            }
        });
    };

    const employeesData: EmployeesData = {
        columns: [
            { label: 'Employee ID', field: '_id' },
            { label: 'Full Name', field: 'fullName' },
            { label: 'Email', field: 'email' },
            { label: 'Religion', field: 'religion' },
            { label: 'Role', field: 'role' },
            { label: 'Actions', field: 'actions' },
        ],
        rows: employees.map((employee) => ({
            _id: employee._id,
            fullName: `${employee.fname} ${employee.lname}`,
            email: employee.email,
            religion: employee.religion,
            role: employee.role,
            actions: (
                <div className="flex items-center ml-6">
                    <Link to={`/admin/employee/${employee._id}`} className="mr-2 w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8">
                        <img
                            src={EditIcon}
                            alt="Edit Icon"
                            className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                    </Link>
                    <button className="w-8 h-8 md:h-12 md:w-12 lg:h-8 lg:w-8" onClick={() => deleteEmployeeHandler(employee._id)}>
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
            <MetaData title={'All Employees'} />
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
                    <h1 className="text-2xl font-semibold">Employees</h1>
                </div>
                <div className="p-4">
                    <Link to="/admin/employee-add">
                        <button className={`${colors.primary} font-bold py-2 px-4 rounded-lg`}>Add +</button>
                    </Link>
                </div>
            </div>

            <div className="ph-4">
                {loading ? (
                    <TableLoader />
                ) : (
                    <DataTable columns={employeesData.columns} rows={employeesData.rows} />
                )}

            </div>
        </>
    );
};

export default EmployeePage;
