import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

//validation
let schema = Yup.object().shape({
    email: Yup.string()
        .email("Email Should be valid")
        .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        // Khi use submit nó sẽ dispatch action
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    //Lấy thông tin người dùng
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (!user === null || isSuccess) {
            navigate("admin");
        } else {
            navigate("");
        }
    }, [user, isSuccess, message, navigate]);

    return (
        <div
            className="py-5 mx-auto"
            style={{ background: "#ffd333", minHeight: "100vh" }}
        >
            <div className="login-response my-5 w-25 bg-white rounded-3 mx-auto p-3">
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to continue</p>
                <div className="error text-center">
                    {message.message === "Rejected"
                        ? "You are not an Admin"
                        : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="email"
                        label="Email Address"
                        id="email"
                        vaL={formik.values.email}
                        onCh={formik.handleChange("email")}
                        onBlr={formik.handleBlur("email")}
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        name="password"
                        label="Password"
                        id="pass"
                        vaL={formik.values.password}
                        onCh={formik.handleChange("password")}
                        onBlr={formik.handleBlur("password")}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
