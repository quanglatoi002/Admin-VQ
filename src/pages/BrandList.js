import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const BrandList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    const brandState = useSelector((state) => state.brand.brands);

    const dataBrand = [];
    for (let i = 0; i < brandState.length; i++) {
        dataBrand.push({
            key: i + 1,
            title: brandState[i].title,
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
            <h3 className="mb-4 title">Brands List</h3>
            <div>
                <Table columns={columns} dataSource={dataBrand} />
            </div>
        </div>
    );
};

export default BrandList;
