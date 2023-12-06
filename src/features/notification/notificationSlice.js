import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

export const getNotifications = createAsyncThunk(
    "notification/get-notifications",
    async (thunkAPI) => {
        try {
            return await notificationService.getNotifications();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addNotification = createAsyncThunk(
    "notification/add-notifi",
    async (notifi, thunkAPI) => {
        console.log(notifi.content);
        try {
            return await notificationService.AddNotifications(notifi);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetState = createAction("Reset_all");

const initialState = {
    notifications: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const NotifiSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getNotifications = action.payload;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.notifications = action.payload;
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});
export default NotifiSlice.reducer;
