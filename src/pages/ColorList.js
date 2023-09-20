import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";

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
        title: "Action",
        dataIndex: "action",
    },
];

const ColorList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    const colorState = useSelector((state) => state.color.colors);

    const dataColor = [];
    for (let i = 0; i < colorState.length; i++) {
        dataColor.push({
            key: i + 1,
            name: colorState[i].title,
            action: (
                <>
                    <Link to="/" className=" fs-3 text-danger">
                        <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-3 text-danger" to="/">
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={dataColor} />
            </div>
        </div>
    );
};

export default ColorList;
