import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import CustomModal from "../components/CustomModal";

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
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState("");
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);
    const showModal = (e) => {
        setOpen(true);
        setColorId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const colorState = useSelector((state) => state.color.colors);

    const dataColor = [];
    for (let i = 0; i < colorState.length; i++) {
        dataColor.push({
            key: i + 1,
            name: colorState[i].title,
            action: (
                <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center ">
                    <Link
                        to={`/admin/color/${colorState[i]._id}`}
                        className=" fs-3 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(colorState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </div>
            ),
        });
    }

    const deleteColor = (e) => {
        dispatch(deleteAColor(e));

        setOpen(false);
        setTimeout(() => {
            dispatch(getColors());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table columns={columns} dataSource={dataColor} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteColor(colorId);
                }}
                title="Are you sure you want to delete this color?"
            />
        </div>
    );
};

export default ColorList;
