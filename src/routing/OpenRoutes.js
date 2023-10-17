import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    console.log(children);
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    return getTokenFromLocalStorage?.token === undefined ? (
        children
    ) : (
        <Navigate to="/admin" relative={true} />
    );
};
