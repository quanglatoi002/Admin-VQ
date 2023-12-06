import React, { useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../features/notification/notificationSlice";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Time",
        dataIndex: "time",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const CategoryList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const pNotifiState = useSelector((state) => state.notifi.getNotifications);
    const dataCategories = [];
    for (let i = 0; i < pNotifiState?.length; i++) {
        dataCategories.push({
            key: i + 1,
            name: pNotifiState[i].message,
            time: pNotifiState[i].timestamp,
            action: (
                <>
                    <button className="ms-3 fs-3 text-danger bg-transparent border-0">
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={dataCategories} />
            </div>
        </div>
    );
};

export default CategoryList;
