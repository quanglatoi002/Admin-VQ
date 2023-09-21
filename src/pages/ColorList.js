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
        title: "Title",
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
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={dataColor} />
            </div>
        </div>
    );
};

export default ColorList;
