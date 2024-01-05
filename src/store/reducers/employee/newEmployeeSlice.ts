import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../store/index';

interface Employee {
    _id: number;
    fname: string;
    lname: string;
    email: string;
    course?: string;
    religion: string;
}

interface NewEmployeeState {
    loading: boolean;
    success: boolean;
    error: string | null;
    employees: Employee[];
}

interface NewEmployeeResponse {
    success: boolean;
    employee: Employee[];
}

interface NewEmployeeData {
    fname: string;
    lname: string;
    email: string;
    password: string;
    religion: string;
    storeId?: string | number;
    storeName?: string | number
    avatar: File | Blob | String | null;
}

export const newEmployee = createAsyncThunk<NewEmployeeResponse, NewEmployeeData, { state: RootState }>('newEmployee/newEmployee', async (employeeData, { rejectWithValue, dispatch, getState }) => {
    try {
        dispatch(newEmployeeRequest());
        const authState = getState().auth;
        const storeId = authState.user?.store?.storeId;
        const storeName = authState.user?.store?.name;
        const storeDetails = {
            storeId,
            storeName: storeName,
        };
        const formEmployeeData = {
            ...employeeData,
            ...storeDetails
        }

    
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post<NewEmployeeResponse>(
            `${import.meta.env.VITE_BASE_URL}/api/v1/admin/employee/new`, formEmployeeData, { withCredentials: true, ...config }
        );
        console.log(data);
        dispatch(newEmployeeSuccess(data));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(newEmployeeFail(error.response?.data?.message || 'An error occurred'));
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        dispatch(newEmployeeFail('An error occurred'));
        return rejectWithValue('An error occurred');
    }
}
);

const initialState: NewEmployeeState = {
    loading: false,
    success: false,
    error: null,
    employees: [],
};

const newEmployeeSlice = createSlice({
    name: 'newEmployee',
    initialState,
    reducers: {
        newEmployeeRequest: (state) => {
            state.loading = true;
        },
        newEmployeeSuccess: (state, action: PayloadAction<NewEmployeeResponse>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.employees = action.payload.employee;
        },
        newEmployeeFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        newEmployeeReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },

});

export const {
    newEmployeeRequest,
    newEmployeeSuccess,
    newEmployeeFail,
    newEmployeeReset,
} = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;
