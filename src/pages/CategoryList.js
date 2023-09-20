import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";

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

const CategoryList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const pCategoriesState = useSelector(
        (state) => state.pCategory.pCategories
    );
    const dataCategories = [];
    for (let i = 0; i < pCategoriesState.length; i++) {
        dataCategories.push({
            key: i + 1,
            name: pCategoriesState[i].title,
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
            <h3 className="mb-4 title"> Product Categories </h3>
            <div>
                <Table columns={columns} dataSource={dataCategories} />
            </div>
        </div>
    );
};

export default CategoryList;
