import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";

const Dashboard = () => {
    const data = [
        {
            type: "Jan",
            sales: 38,
        },
        {
            type: "Feb",
            sales: 52,
        },
        {
            type: "Mar",
            sales: 61,
        },
        {
            type: "Apr",
            sales: 145,
        },
        {
            type: "May",
            sales: 48,
        },
        {
            type: "Jun",
            sales: 38,
        },
        {
            type: "July",
            sales: 38,
        },
        {
            type: "Aug",
            sales: 38,
        },
        {
            type: "Sept",
            sales: 38,
        },
        {
            type: "Oct",
            sales: 38,
        },
        {
            type: "Now",
            sales: 38,
        },
        {
            type: "Dec",
            sales: 38,
        },
    ];
    const config = {
        data,
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
            <h3 className="mb-4">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Total</p>
                        <h4>$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6>
                            <BsArrowDownRight /> 32%
                        </h6>

                        <p>Compared To April 2022</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Total</p>
                        <h4>$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <BsArrowDownRight /> 32%
                        </h6>
                        <p>Compared To April 2022</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
                    <div>
                        <p>Total</p>
                        <h4>$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <BsArrowDownRight /> 32%
                        </h6>
                        <p>Compared To April 2022</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-4">Income Statics</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-4">Recent Orders</h3>
                <div></div>
            </div>
        </div>
    );
};

export default Dashboard;
