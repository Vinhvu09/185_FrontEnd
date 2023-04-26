import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useController } from "react-hook-form";
import { number } from "yup/lib/locale";
import "./InputStaff.scss";

export default function InputStaff({ control, format, ...props }) {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  const [salary, setSalary] = useState("");
  const initialSalary = format === "salary" ? field.value : "";

  function numberWithCommas(x) {
    var parts = x?.toString().split(",");
    if (parts) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(",");
    }
  }

  function commasRemove(x) {
    return x?.toString().replaceAll(",", "");
  }

  const handleOnChange = (e) => {
    field.onChange(commasRemove(e.target.value));
    setSalary(numberWithCommas(commasRemove(e.target.value)));
  };
  useEffect(() => {
    setSalary(numberWithCommas(commasRemove(initialSalary)));
  }, [initialSalary]);
  return (
    <div className="inputStaff" style={{ width: props.width }}>
      <span className="inputStaff__label">{props.label}</span>
      {format === "salary" ? (
        <input
          autoComplete="off"
          style={{ paddingLeft: `${format === "salary" ? "50px" : "12px"}` }}
          value={salary}
          onChange={handleOnChange}
        />
      ) : (
        <input {...field} {...props} autoComplete="off" />
      )}

      {format === "salary" ? (
        <div className="inputStaff__currentMoney">VND</div>
      ) : (
        <></>
      )}
      <span className="inputStaff__error">
        {props.error ? props.error : ""}
      </span>
    </div>
  );
}
