import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import "./SelectStaff.scss";

export default function SelectStaff({
  control,
  watchPreviousInput,
  data,
  ...props
}) {
  const { field } = useController({
    control,
    name: props.name,
  });
  const initialValue = data.filter((item) => {
    return item.code * 1 === field.value * 1;
  })[0]?.name;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleClickOption(e) {
    const selectOptionDisplayFlex = document.querySelector(
      ".selectStaff .displayFlex"
    );
    selectOptionDisplayFlex?.classList?.remove("displayFlex");
    setValue(e.target.getAttribute("data-value"));
    field.onChange(e.target.getAttribute("data-key"));
  }
  window.addEventListener("click", (e) => {
    if (e.target.className === "selectStaff__select") {
      const selectOptionDisplayFlex = document.querySelector(
        ".selectStaff .displayFlex"
      );
      selectOptionDisplayFlex?.classList?.remove("displayFlex");

      const selectOptionTarget =
        e.target.firstChild.nextSibling.nextSibling.nextSibling;
      selectOptionTarget?.classList?.add("displayFlex");
    } else {
      const selectOptionDisplayFlex = document.querySelector(
        ".selectStaff .displayFlex"
      );
      selectOptionDisplayFlex?.classList?.remove("displayFlex");
    }
  });
  return (
    <div className="selectStaff" style={{ width: `${props.width}` }}>
      <span className="selectStaff__label">{props.label}</span>

      <div
        className="selectStaff__select"
        style={{
          pointerEvents: `${watchPreviousInput ? "none" : "all"}`,
          opacity: `${watchPreviousInput ? 0.4 : 1}`,
        }}
      >
        <span className="selectStaff__select--placeHolder">
          {value ? "" : props.placeholder}
        </span>
        <span className="selectStaff__select--text">{value ? value : ""}</span>
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="selectStaff__select--dropdownIcon"
        >
          <path
            d="M3.6891 5.85412L0.128784 1.82073C-0.0429277 1.6262 -0.0429277 1.31082 0.128784 1.11632L0.544038 0.64589C0.715456 0.451696 0.993276 0.451322 1.1651 0.64506L4.00001 3.8416L6.8349 0.64506C7.00672 0.451322 7.28454 0.451696 7.45596 0.64589L7.87122 1.11632C8.04293 1.31084 8.04293 1.62622 7.87122 1.82073L4.3109 5.8541C4.1392 6.04863 3.86082 6.04863 3.6891 5.85412Z"
            fill="#989898"
          />
        </svg>
        <div className="selectStaff__select--options">
          {data &&
            data.map((item, index) => {
              return (
                <span
                  className="option"
                  key={index}
                  data-key={item.code}
                  data-value={item.name.replace("Tỉnh ", "")}
                  onClick={(e) => handleClickOption(e)}
                >
                  {item.name}
                </span>
              );
            })}
        </div>
      </div>
      <span className="selectStaff__error">
        {props.error ? props.error : ""}
      </span>
    </div>
  );
}
