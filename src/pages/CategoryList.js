import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAProductCategory,
    getCategories,
    resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

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
    const [open, setOpen] = useState(false);
    const [pCatId, setPCatId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setPCatId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(resetState());
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
                    <Link
                        to={`/admin/category/${pCategoriesState[i]._id}`}
                        className=" fs-3 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(pCategoriesState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteCategory = (e) => {
        dispatch(deleteAProductCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={dataCategories} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(pCatId);
                }}
                title="Are you sure you want to delete this Product Category?"
            />
        </div>
    );
};

export default CategoryList;
