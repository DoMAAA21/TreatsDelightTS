import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';
import axios from 'axios';

interface Employee {
    _id: number;
    fname: string;
    lname: string;
    email: string;
    course: string;
    religion: string;
    role: string;

}


interface AllEmployeesState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: AllEmployeesState = {
    employees: [],
    loading: false,
    error: null,
};

export const fetchAllEmployees = createAsyncThunk<Employee[], void, { state: RootState }>(
    'allEmployees/fetchAllEmployees',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            dispatch(allEmployeesRequest());
            const authState = getState().auth;
            const storeId = authState.user?.store?.storeId;
            if (!storeId) {
                return dispatch(allEmployeesFail('Store not found'));
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/store/${storeId}/employees`, { withCredentials: true });
            dispatch(allEmployeesSuccess(data.employees));
            return data.employees;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(allEmployeesFail(error.response?.data?.message || 'An error occurred'));
                return rejectWithValue(error.response?.data?.message || 'An error occurred');
            }
            dispatch(allEmployeesFail('An error occurred'));
            return rejectWithValue('An error occurred');
        }
    }
);



const allEmployeesSlice = createSlice({
    name: 'allEmployees',
    initialState,
    reducers: {
        allEmployeesRequest: (state) => {
            state.loading = true;
        },
        allEmployeesSuccess: (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        },
        allEmployeesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    allEmployeesRequest,
    allEmployeesSuccess,
    allEmployeesFail,
    clearErrors,
} = allEmployeesSlice.actions;

export default allEmployeesSlice.reducer;
