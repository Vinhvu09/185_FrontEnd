import React, { useRef } from "react";
import search from "../../assets/svg/search.svg";
import "./SearchBasic.scss";
export default function SearchBasic({
  setFilterResProfile,
  setFilterAdmin,
  placeholder = "Tìm kiếm",
}) {
  let inputRef = useRef();
  const handleFilter = () => {
    let value = inputRef.current.value;
    if (setFilterResProfile) {
      setFilterResProfile(value);
    }
    if (setFilterAdmin) {
      setFilterAdmin(value);
    }
  };
  return (
    <div className="searchBasic">
      <input type="text" placeholder={placeholder} ref={inputRef} />
      <img src={search} alt="icon" onClick={handleFilter} />
    </div>
  );
}
