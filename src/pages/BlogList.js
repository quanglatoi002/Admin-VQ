import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";

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
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const BlogList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const blogState = useSelector((state) => state.blog.blogs);
    const dataBlog = [];
    for (let i = 0; i < blogState.length; i++) {
        dataBlog.push({
            key: i + 1,
            name: blogState[i].title,
            category: blogState[i].category,
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
            <h3 className="mb-4 title">Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={dataBlog} />
            </div>
        </div>
    );
};

export default BlogList;
