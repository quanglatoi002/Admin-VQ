import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/bcategory/bcategorySlice";

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
        title: "Action",
        dataIndex: "action",
    },
];

const BlogCatList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const bCatCategoryState = useSelector(
        (state) => state.bCategory.bCategories
    );
    const dataBCategories = [];
    for (let i = 0; i < bCatCategoryState.length; i++) {
        dataBCategories.push({
            key: i + 1,
            name: bCatCategoryState[i].title,
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
            <h3 className="mb-4 title">Blog Categories List</h3>
            <div>
                <Table columns={columns} dataSource={dataBCategories} />
            </div>
        </div>
    );
};

export default BlogCatList;
