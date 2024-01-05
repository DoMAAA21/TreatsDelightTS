import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface EmployeeDetails {
    employee: {
        _id? : string | number;
        fname: string;
        lname: string;
        email: string;
        password: string;
        role?: string;
        course?: string;
        religion?: string;
        avatar?: {
            url?: string;
        };
    };
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeDetails = {
    employee: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        role: '',
        course: '',
        religion: ''
    },
    loading: false,
    error: null,
};

export const getEmployeeDetails = createAsyncThunk('employeeDetails/getEmployeeDetails', async (id: string | undefined, { dispatch, rejectWithValue }) => {
    try {
        dispatch(employeeDetailsRequest());

        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/employee/${id}`, { withCredentials: true });
        dispatch(employeeDetailsSuccess(data.employee));
        return data.employee;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(employeeDetailsFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(employeeDetailsFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
});

const employeeDetailsSlice = createSlice({
    name: 'employeeDetails',
    initialState,
    reducers: {
        employeeDetailsRequest: (state) => {
            state.loading = true;
        },
        employeeDetailsSuccess: (state, action: PayloadAction<EmployeeDetails['employee']>) => {
            state.loading = false;
            state.employee = action.payload;
        },
        employeeDetailsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearEmployee: (state) => {
            state.error = null;
            state.employee = {
                fname: '',
                lname: '',
                email: '',
                password: '',
                role: '',
            };
        },
    },
});

export const {
    employeeDetailsRequest,
    employeeDetailsSuccess,
    employeeDetailsFail,
    clearErrors,
    clearEmployee,
} = employeeDetailsSlice.actions;

export default employeeDetailsSlice.reducer;
