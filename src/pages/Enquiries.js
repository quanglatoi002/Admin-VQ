import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAEnquiry,
    getEnquiries,
    resetState,
    updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";

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
    const [open, setOpen] = useState(false);
    const [enqId, setEnquiryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setEnquiryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log("a");
        dispatch(resetState());
        dispatch(getEnquiries());
    }, [dispatch]);

    const enquiryState = useSelector((state) => state.enquiry.enquiries);
    const setEnquiryStatus = (e, i) => {
        const data = { id: i, enqData: e };
        dispatch(updateAEnquiry(data));
    };
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
                        onChange={(e) =>
                            setEnquiryStatus(
                                e.target.value,
                                enquiryState[i]._id
                            )
                        }
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
                    <Link
                        className="ms-3 fs-3 text-danger"
                        to={`/admin/enquiries/${enquiryState[i]._id}`}
                    >
                        <AiOutlineEye />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(enquiryState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </div>
            ),
        });
    }

    const deleteEnq = (e) => {
        dispatch(deleteAEnquiry(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={dataEnquiry} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteEnq(enqId);
                }}
                title="Are you sure you want to delete this enquiry?"
            />
        </div>
    );
};

export default Enquiries;
