import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
    addNotification,
    resetState,
} from "../features/notification/notificationSlice";

const schema = yup.object().shape({
    content: yup.string().required("Content is Required"),
});

const AddNotification = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();
    const newNotification = useSelector((state) => state.notifi.notifications);

    const { isSuccess, isError, isLoading, notifications } = newNotification;

    useEffect(() => {
        if (isSuccess) {
            toast.success("Notification Added Successfully!");
        }
        // if (isSuccess && updatedCategory) {
        //     toast.success("Category Updated Successfully!");
        //     navigate("/admin/list-category");
        // }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, navigate]);
    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            dispatch(addNotification(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 500);
        },
    });
    return (
        <div>
            <h3 className="mb-4 title"> Notifications</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Notification"
                        onCh={formik.handleChange("content")}
                        onBlr={formik.handleBlur("content")}
                        val={formik.values.content}
                        id="brand"
                    />
                    <div className="error">
                        {formik.touched.content && formik.errors.content}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Notification
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNotification;
