import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

// export const getEnquiries = createAsyncThunk(
//     "enquiry/get-enquiries",
//     async (thunkAPI) => {
//         try {
//             return await enquiryService.getEnquiries();
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );

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
export const enquirySlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
export default enquirySlice.reducer;
