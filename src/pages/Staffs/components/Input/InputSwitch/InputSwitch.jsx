import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useController } from "react-hook-form";
import { number } from "yup/lib/locale";
import Switch from "react-switch";

export default function InputStaff({ control, format, ...props }) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });

  return (
    <div className="inputStaff" style={{ width: props.width }}>
      <div
        className="inputStaff__label"
        style={{
          marginBottom: "6px",
        }}
      >
        {props.label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Switch
          {...field}
          checked={field && field.value}
          {...props}
          onColor="#00B429"
          onHandleColor="#ffffff"
          handleDiameter={18}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={18}
          width={40}
          className="react-switch"
          id="material-switch"
        />
        <div>{field.value ? "Đang hoạt động" : "Ngừng hoạt động"}</div>
      </div>
    </div>
  );
}
