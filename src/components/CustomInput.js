import React, { memo } from "react";

const CustomInput = (props) => {
    const { type, label, i_id, i_class } = props;
    console.log(i_id);
    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

export default memo(CustomInput);
