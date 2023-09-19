import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";

const AddBlog = () => {
    const [desc, setDesc] = useState();
    const handleDes = (e) => {
        console.log(e);
    };
    return (
        <div>
            <h3 className="mb-3">Add Blog</h3>
            <div className="">
                <form action="">
                    <CustomInput type="text" label="Enter Blog Title" />
                    <select name="" id="">
                        <option value="">Select Blog Category</option>
                    </select>
                    {/* <RichTextEditor
                        value={desc}
                        onChange={({ target: { value } }) => handleDes(value)}
                    /> */}
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
