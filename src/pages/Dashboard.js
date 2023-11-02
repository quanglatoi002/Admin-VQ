import React, { useMemo } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getMonthlyData,
    getOrders,
    getYearlyData,
} from "../features/auth/authSlice";
import { useState } from "react";
import { config } from "../utils/axiosConfig";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product Count",
        dataIndex: "product",
    },
    {
        title: "Total Price",
        dataIndex: "price",
    },
    {
        title: "Total Price After Discount",
        dataIndex: "dPrice",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
];

const Dashboard = () => {
    const [dataMonthly, setDataMonthly] = useState([]);
    const [dataMonthlySales, setDataMonthlySales] = useState([]);
    const [orderData, setOrderData] = useState([]);
    // const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();

    //Lưu ý khi sử dụng 1 biến bên ngoài của config4 mà config lại để làm denpen của useEffect thì phải sử dụng useMemo()
    const getTokenFromLocalStorage =
        JSON.parse(localStorage.getItem("user")) ?? null;

    console.log(getTokenFromLocalStorage);
    const config4 = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${
                    getTokenFromLocalStorage?.token ?? ""
                }`,
                Accept: "application/json",
            },
        };
    }, [getTokenFromLocalStorage]);
    console.log(config4);

    useEffect(() => {
        dispatch(getMonthlyData(config4));
        dispatch(getYearlyData(config4));
        dispatch(getOrders(config4));
    }, []);

    const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
    const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
    const ordersState = useSelector((state) => state?.auth?.orders?.orders);

    useEffect(() => {
        let mL = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let data =
            monthlyDataState &&
            monthlyDataState?.map((element) => ({
                type: mL[element?._id?.month],
                inCome: element?.amount,
            }));
        let monthlyOrderCount =
            monthlyDataState &&
            monthlyDataState?.map((element) => ({
                type: mL[element?._id?.month],
                sales: element?.count,
            }));
        setDataMonthly(data);
        setDataMonthlySales(monthlyOrderCount);
    }, [monthlyDataState]);

    useEffect(() => {
        const ordersProduct = [];
        for (let i = 0; i < ordersState?.length; i++) {
            ordersProduct.push({
                key: i + 1,
                name:
                    ordersState[i]?.user?.firstname +
                    ordersState[i]?.user?.lastname,
                product: ordersState[i].orderItems.length,
                price: ordersState[i]?.totalPrice,
                dPrice: ordersState[i]?.totalPriceAfterDiscount,
                status: ordersState[i]?.orderStatus,
            });
        }
        setOrderData(ordersProduct);
    }, [ordersState]);
    const config = {
        data: dataMonthly,
        xField: "type",
        yField: "inCome",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };
    const config1 = {
        data: dataMonthlySales,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };

    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end w-100 flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="mb-0 desc">Total Income</p>
                        <h4 className="sub-title">
                            ${yearlyDataState && yearlyDataState[0]?.amount}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="mb-0  desc">
                            {" "}
                            Income in Last Year from Today
                        </p>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p className="mb-0 desc">Total Sales</p>
                        <h4 className="sub-title">
                            ${yearlyDataState && yearlyDataState[0]?.count}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p className="mb-0 desc">
                            Sales in Last Year from Today
                        </p>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div className="mt-4 flex-grow-1 w-lg-50 w-100">
                    <h3 className="mb-5 title">Income Statics</h3>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="mt-4 flex-grow-1 w-100">
                    <h3 className="mb-5 title">Sales Statics</h3>
                    <div>
                        <Column {...config1} />
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex flex-1">
                <div className="w-100">
                    <Table columns={columns} dataSource={orderData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
