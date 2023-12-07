import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
    delImg,
    resetImgState,
    uploadImg,
} from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup
        .array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
    quantity: yup.number().required("Quantity is Required"),
    // sizes: yup.array().required("Size is Required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    console.log(color);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch]);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload?.images);
    console.log(imgState);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdProduct]);
    // color
    const colorOptions = colorState.map((i) => ({
        label: i.title,
        value: i._id,
    }));
    //images
    const imageOptions = imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
    }));

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
            // sizes: [{ name: "", quantity: 0 }],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                Promise.all([
                    dispatch(resetState()),
                    dispatch(resetImgState()),
                ]);
            }, 500);
        },
    });

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = imageOptions;
    }, [color, formik.values, imageOptions]);
    //handle
    const handleColors = (e) => {
        setColor(e);
    };
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description &&
                            formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onCh={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
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
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand}
                    </div>

                    {/* {formik.values.sizes?.map((size, index) => (
                        <div key={index}>
                            <label>{`Size ${index + 1}:`}</label>
                            <CustomInput
                                type="text"
                                name={`sizes.${index}.size`}
                                label="Enter Name Size"
                                onCh={formik.handleChange}
                                onBlr={formik.handleBlur}
                                val={formik.values.sizes[index].size}
                            />
                            <label>Quantity:</label>
                            <CustomInput
                                type="number"
                                name={`sizes.${index}.quantity`}
                                label="Enter Quantity Size"
                                onCh={formik.handleChange}
                                onBlr={formik.handleBlur}
                                val={formik.values.sizes[index].quantity}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue(`sizes.${index}`, {
                                        size: "",
                                        quantity: 0,
                                    })
                                }
                            >
                                Remove Size
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            formik.setFieldValue("sizes", [
                                ...formik.values.sizes,
                                { size: "", quantity: 0 },
                            ])
                        }
                    >
                        Add Size
                    </button> */}

                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {catState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
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
                            Select Category
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
                        options={colorOptions}
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
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(delImg(i.public_id))
                                        }
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img
                                        src={i.url}
                                        alt=""
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
