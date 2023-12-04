import { Layout, Menu, Button, theme } from "antd";
import { useState, useEffect } from "react";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlinePicRight,
    AiOutlinePicLeft,
    AiOutlineLogout,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotifications } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const { firstname, lastname, email } = useSelector(
        (state) => state.auth?.user
    );
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        // Kết nối tới server sử dụng socket.io
        const socket = io("http://localhost:5003");

        // Lắng nghe sự kiện 'newOrder' từ server
        socket.on("newOrder", (data) => {
            console.log("Đã nhận thông báo đơn hàng mới:", data);

            // Cập nhật danh sách đơn hàng mới
            setOrders((prevOrders) => [...prevOrders, JSON.parse(data)]);
        });

        // Hủy đăng ký lắng nghe khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []); // Chỉ chạy một lần khi component được mount
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <h2 className="text-white fs-5 text-center mb-0 py-3">
                        <span className="sm-logo">VQ</span>
                        <span className="lg-logo">Dev VQ</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={async ({ key }) => {
                        if (key === "signout") {
                            localStorage.clear();

                            navigate("/");
                            window.location.reload();
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-4" />,
                            label: "Customers",
                        },
                        {
                            key: "catalog",
                            icon: <AiOutlineShoppingCart className="fs-4" />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-4" />
                                    ),
                                    label: "Add Product",
                                },
                                {
                                    key: "list-product",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-4" />
                                    ),
                                    label: "Product List",
                                },
                                {
                                    key: "brand",
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: "Brand",
                                },
                                {
                                    key: "list-brand",
                                    icon: <SiBrandfolder className="fs-4" />,
                                    label: "Brand List",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Category",
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Category List",
                                },
                                {
                                    key: "color",
                                    icon: (
                                        <AiOutlineBgColors className="fs-4" />
                                    ),
                                    label: "Color",
                                },
                                {
                                    key: "list-color",
                                    icon: (
                                        <AiOutlineBgColors className="fs-4" />
                                    ),
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-4" />,
                            label: "Order",
                        },
                        {
                            key: "marketing",
                            icon: <RiCouponLine className="fs-4" />,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className="fs-4" />,
                            label: "Blogs",
                            children: [
                                {
                                    key: "blog",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Add Blog",
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaBloggerB className="fs-4" />,
                                    label: "Blog List",
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className="fs-4" />,
                                    label: "Add Blog Category",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaBloggerB className="fs-4" />,
                                    label: "Add Blog List",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className="fs-4" />,
                            label: "Enquiries",
                        },
                        {
                            key: "signout",
                            icon: <AiOutlineLogout className="fs-4" />,
                            label: "Sign Out",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <AiOutlinePicRight />
                            ) : (
                                <AiOutlinePicLeft />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center">
                        <div className="px-3">
                            <div className="position-relative">
                                <IoIosNotifications className="fs-4" />
                                <span className="badge bg-warning rounded-circle position-absolute">
                                    {orders.map((order) => order)}3
                                </span>
                            </div>
                        </div>
                        {/* <div className="d-flex gap-3 align-items-center dropdown">
                            <img
                                width={32}
                                height={32}
                                src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                                alt=""
                            />
                        </div> */}
                        <div
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <h5
                                className="text-dark 
                             mb-0"
                            >
                                {email}
                            </h5>
                            <p className="mb-0">{firstname + lastname}</p>
                        </div>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                        >
                            <li>
                                <Link
                                    style={{
                                        height: "auto",
                                        lineHeight: "20px",
                                    }}
                                    className="dropdown-item py-1 mb-1"
                                    to="/"
                                >
                                    View Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    style={{
                                        height: "auto",
                                        lineHeight: "20px",
                                    }}
                                    className="dropdown-item py-1 mb-1"
                                    to="/"
                                >
                                    Signout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    style={{
                                        height: "auto",
                                        lineHeight: "20px",
                                    }}
                                    className="dropdown-item py-1 mb-1"
                                    to="/"
                                >
                                    Something else here
                                </Link>
                            </li>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />

                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
