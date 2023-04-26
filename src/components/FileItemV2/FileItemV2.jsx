import React from "react";
import "./FileItemV2.scss";
import file from "../../assets/svg/mainFile.svg";
import { useNavigate } from "react-router-dom";
export default function FileItem({
  svgProp,
  isFile = null,
  className,
  route,
  prefix = true,
  name,
  num,
}) {
  const navigate = useNavigate();
  const handleClickFileItem = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="fileItemV2" onClick={handleClickFileItem}>
      <div className="fileItemV2__box">
        <div>
          <img src={file} alt="icon" />
        </div>
        <div>
          {isFile && (
            <img
              src={svgProp}
              alt="svgProp"
              className={className}
              style={{ marginBottom: "6px" }}
            />
          )}
        </div>
      </div>

      <div className="fileItemV2__bottom">
        <div className="fileItemV2__bottom-title">
          {prefix ? "Thư mục" : ""} {name}
        </div>
        <div className="fileItemV2__bottom-text">{num} file</div>
      </div>
    </div>
  );
}
