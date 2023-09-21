import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";

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
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },

    {
        title: "Action",
        dataIndex: "action",
    },
];

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const orderState = useSelector((state) => state.auth.orders);
    console.log(orderState.length);
    const dataOrder = [];
    for (let i = 0; i < orderState.length; i++) {
        dataOrder.push({
            key: i + 1,
            name: orderState[i]?.orderBy.firstname,
            product: (
                <Link to={`/admin/order/${orderState[i].orderby?._id}`}>
                    View Orders
                </Link>
            ),
            amount: orderState[i].paymentIntent.amount,
            date: new Date(orderState[i].createdAt).toLocaleString(),
            action: (
                <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center ">
                    <Link to="/" className=" fs-3 text-danger">
                        <BiEdit className="img-fluid" />
                    </Link>
                    <Link className="ms-lg-3 fs-3 text-danger" to="/">
                        <AiFillDelete className="img-fluid" />
                    </Link>
                </div>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={dataOrder} />
            </div>
        </div>
    );
};

export default Orders;
