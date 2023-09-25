import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
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
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBlogId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(resetState());
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
                <>
                    <Link
                        to={`/admin/blog/${blogState[i].id}`}
                        className=" fs-3 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(blogState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteBlog = (e) => {
        dispatch(deleteABlog(e));

        setOpen(false);
        setTimeout(() => {
            dispatch(getBlogs());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={dataBlog} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBlog(blogId);
                }}
                title="Are you sure you want to delete this blog?"
            />
        </div>
    );
};

export default BlogList;
