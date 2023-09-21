import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";

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
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
    },
    {
        title: "Status",
        dataIndex: "status",
    },

    {
        title: "Action",
        dataIndex: "action",
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
    }, [dispatch]);

    const enquiryState = useSelector((state) => state.enquiry.enquiries);
    const dataEnquiry = [];
    for (let i = 0; i < enquiryState.length; i++) {
        dataEnquiry.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            status: (
                <>
                    <select
                        name=""
                        defaultValue={
                            enquiryState[i].status
                                ? enquiryState[i].status
                                : "Submitted"
                        }
                        className="form-control form-select"
                        id=""
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),

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
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={dataEnquiry} />
            </div>
        </div>
    );
};

export default Enquiries;
