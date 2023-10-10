import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder, getOrderByUser } from "../features/auth/authSlice";
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },

    {
        title: "Action",
        dataIndex: "action",
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    console.log(userId);
    useEffect(() => {
        dispatch(getOrder(userId));
    }, [dispatch, userId]);
    const orderState = useSelector(
        (state) => state?.auth?.singleOrder?.orders?.orderItems
    );
    console.log(orderState);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i]?.product.title,
            brand: orderState[i]?.product.brand,
            count: orderState[i]?.product.quantity,
            amount: orderState[i]?.product.price,
            color: orderState[i]?.color.title,
            action: (
                <>
                    <select name="" id="" className="form-control form-select">
                        <option value="Ordered" disabled selected>
                            Ordered
                        </option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">
                            Out For Delivery
                        </option>
                        <option value=" Delivered">Delivered</option>
                    </select>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">View Order</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ViewOrder;
