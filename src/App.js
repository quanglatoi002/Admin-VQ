import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogCatList from "./pages/BlogCatList";
import BlogList from "./pages/BlogList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="blog-list" element={<BlogList />} />
                    <Route path="blog" element={<AddBlog />} />
                    <Route path="coupon-list" element={<CouponList />} />
                    <Route path="coupon" element={<AddCoupon />} />
                    <Route path="blog-category" element={<AddBlogCat />} />
                    <Route
                        path="blog-category-list"
                        element={<BlogCatList />}
                    />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="list-color" element={<ColorList />} />
                    <Route path="color" element={<AddColor />} />
                    <Route path="list-category" element={<CategoryList />} />
                    <Route path="category" element={<AddCategory />} />
                    <Route path="list-brand" element={<BrandList />} />
                    <Route path="brand" element={<AddBrand />} />
                    <Route path="list-product" element={<ProductList />} />
                    <Route path="product" element={<AddProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
