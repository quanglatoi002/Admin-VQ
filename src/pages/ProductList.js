import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { Excel } from "antd-table-saveas-excel";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: "Brand",
        dataIndex: "brand",
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const ProductList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productState = useSelector((state) => state.product.products);

    const dataProduct = [];
    for (let i = 0; i < productState.length; i++) {
        dataProduct.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            price: `${productState[i].price}`,
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

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(columns)
            .addDataSource(dataProduct, {
                str2Percent: true,
            })
            .saveAs("Excel.xlsx");
    };
    return (
        <div>
            <h3 className="mb-4 title">Products</h3>
            <div>
                <button className="p-2 mb-4" onClick={exportExcel}>
                    <span className="p-2 fs-6">Export</span>
                </button>
                <Table
                    id="table-xls"
                    columns={columns}
                    dataSource={dataProduct}
                />
            </div>
        </div>
    );
};

export default ProductList;
