import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = createAsyncThunk(
    "auth/admin-login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getOrders = createAsyncThunk(
    "order/get-orders",
    async (thunkAPI) => {
        try {
            return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "order/update-order",
    async (data, thunkAPI) => {
        console.log(data);
        try {
            return await authService.updateOrder(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "order/get-orders",
    async (thunkAPI) => {
        try {
            return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getOrder = createAsyncThunk(
    "order/get-order",
    async (id, thunkAPI) => {
        console.log(id);
        try {
            return await authService.getOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getMonthlyData = createAsyncThunk(
    "order/monthly-data",
    async (thunkAPI) => {
        try {
            return await authService.getMonthlyOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getYearlyData = createAsyncThunk(
    "order/yearly-data",
    async (thunkAPI) => {
        try {
            return await authService.getYearlyOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    user: getUserFromLocalStorage,
    monthlyData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// Slice định nghĩa reducer và action cùng 1 lúc.
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.orders = null;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "success";
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "success";
            })
            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success";
            })
            .addCase(getYearlyData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateOrder = action.payload;
                state.message = "success";
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            });
    },
});

export default authSlice.reducer;
