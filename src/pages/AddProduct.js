import React, { useState, useEffect, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { toast } from "react-toastify";

//validation
let schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("Price is Required"),
    brand: Yup.string().required("Brand is Required"),
    category: Yup.string().required("Category is Required"),
    tags: Yup.string().required("Tag is Required"),
    color: Yup.array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
    quantity: Yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    //useSelector
    const brandState = useSelector((state) => state.brand.brands);
    const pCategoryState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;

    console.log(createdProduct);
    //notify
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdProduct]);
    //formik

    //call API
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch]);

    const handleColors = (e) => {
        setColor(e);
    };

    // handle option color
    const colorOption = [];
    colorState.forEach((i) => {
        colorOption.push({
            label: i.title,
            value: i._id,
        });
    });

    // handle option img
    const imgOption = useMemo(() => {
        const options = [];
        imgState.forEach((i) => {
            options.push({
                public_id: i.public_id,
                url: i.url,
            });
        });
        return options;
    }, [imgState]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        // Khi use submit nó sẽ dispatch action
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                navigate("/admin/list-product");
            }, 3000);
        },
    });
    useEffect(() => {
        formik.values.color = color ? color : "";
        formik.values.images = imgOption;
    }, [color, formik.values, images, imgOption]);
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        vaL={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description &&
                        formik.errors.description ? (
                            <div>{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        vaL={formik.values.price}
                        onCh={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price ? (
                            <div>{formik.errors.price}</div>
                        ) : null}
                    </div>
                    <select
                        name="brand"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Brand</option>
                        {brandState.map((item) => {
                            return (
                                <option key={item._id} value={item.title}>
                                    {item.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand}
                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {pCategoryState.map((item) => {
                            return (
                                <option key={item._id} value={item.title}>
                                    {item.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <select
                        name="tags"
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="" disabled>
                            Select Tags
                        </option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>
                    <div className="error">
                        {formik.touched.tags && formik.errors.tags}
                    </div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Select colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={colorOption}
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="quantity"
                        onCh={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or
                                            click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showImages d-flex flex-wrap gap-3">
                        {imgState?.map((item) => {
                            return (
                                <div
                                    className="position-relative"
                                    key={item?.public_id}
                                >
                                    <button
                                        onClick={() =>
                                            dispatch(delImg(item?.public_id))
                                        }
                                        type="button"
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img
                                        src={item.url}
                                        alt=""
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success border-0 rounded-3 my-5"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
