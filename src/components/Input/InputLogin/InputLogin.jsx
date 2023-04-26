import React, { useState } from "react";
import { useController } from "react-hook-form";
import "./InputLogin.scss";
import closeEye from 'assets/svg/close-eye.svg'
import openEye from "assets/svg/open-eye.svg";

export default function InputLogin({ control, eye = false,  star = true,  ...props}) {
  const { field } = useController({ control, name: props.name ,  defaultValue:""});
  const [showPassword, setShowPassword] = useState(false)

  
  return (
    <div className="inputLoginComponent" style={{ width: props.width }}>
      <span className="inputLoginComponent__title">
        {props.title} {star && <span style={{ color: "red" }}>*</span>}
      </span>
      {!eye && <input {...field} {...props} />}
      {eye && (
        <div className="password-eye">
          <input
            {...field}
            {...props}
            type={showPassword ? "text" : props.type}
            style={{ width: props.width }}
          />
          <img
            src={showPassword ? closeEye : openEye}
            alt={showPassword ? "closeEye" : "openEye"}
            width={"20px"}
            height={"20px"}
            className="eye-absolute"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      )}
      {props.error && (
        <p className="inputLoginComponent__error">{props.error}</p>
      )}
    </div>
  );
}
