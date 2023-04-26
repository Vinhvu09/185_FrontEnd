import React, { useEffect, useState } from "react";
import MainButton from "../../components/MainButton/MainButton";
import PopupCreateFile from "../../components/PopupCreateFile/PopupCreateFile";
import Redirect from "../../components/Redirect/Redirect";
import SearchBasic from "../../components/SearchBasic/SearchBasic";
import { resTorativeData } from "../../constant/constant";
import add from "../../assets/svg/add.svg";
import FileItemV2 from "../../components/FileItemV2/FileItemV2";
import AddBoxBorder from "../../components/AddBoxBorder/AddBoxBorder";
import SvgDot from "assets/svg/dot.svg";
import "./GeneralProfile.scss";
import svgPlus from "assets/svg/plus.svg";

let data = [
  { id: 1, name: "Quản lí tài khoản", path: "/admin/staffs" },
  { id: 2, name: "Thư viện văn bản", path: "#" },
];
export default function GeneralProfile() {
  const [isPopup, setIsPopup] = useState(false);
  const [compared, setCompared] = useState(0);
  const [distance, setDistance] = useState(0);
  const [filter, setFilter] = useState("");
  const [dataFilesResto, setDataFilesResto] = useState(resTorativeData);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [width, setWidth] = useState(0);

  const handleTabs = (e) => {
    let id = e.currentTarget.dataset.id;
    setCompared(parseInt(id));
  };
  const handleOpenPopup = () => {
    setIsPopup(true);
  };
  useEffect(() => {
    let listLi = document.querySelectorAll(".tabs .item");
    listLi.forEach((e) => {
      let id = e.dataset.id;
      if (parseInt(id) === compared) {
        setDistance(e.offsetLeft + e.firstElementChild.offsetLeft);
        setWidth(e.firstElementChild.offsetWidth);
      }
    });
  }, [compared]);
  useEffect(() => {
    let data = dataFilesResto[compared].data?.filter((e) => {
      return e.name.toLowerCase().includes(filter.toLowerCase());
    });
    setDataFiltered(data);
  }, [filter, compared, dataFilesResto]);
  return (
    <div className="restorativeProfile">
      {isPopup && (
        <PopupCreateFile
          setDataFilesResto={setDataFilesResto}
          index={compared}
          dataFilesResto={dataFilesResto}
          setIsPopup={setIsPopup}
          recognize="restorative"
        />
      )}
      <div className="container-fluid">
        <Redirect data={data} />
        <div className="general">
          <div className="general__title">Thư viện văn bản</div>
          <div className="general__btn">
            <img src={svgPlus} alt="svgPlus" />
            <div> Thêm văn bản</div>
          </div>
        </div>
        <div className="restorativeProfile__search">
          <SearchBasic
            setFilterResProfile={setFilter}
            placeholder="Tìm kiếm văn bản"
          />
        </div>
        <div className="restorativeProfile__main">
          <div className="tabs">
            <div
              className={`item ${compared === 0 ? "active" : ""}`}
              data-id={0}
              onClick={(e) => handleTabs(e)}
            >
              <p>Hành chính tổng hợp</p>
            </div>
            <div
              className={`item ${compared === 1 ? "active" : ""}`}
              data-id={1}
              onClick={(e) => handleTabs(e)}
            >
              <p>Tu bổ di tích</p>
            </div>
            <div
              className={`item ${compared === 2 ? "active" : ""}`}
              data-id={2}
              onClick={(e) => handleTabs(e)}
            >
              <p>Lập hồ sơ di tích</p>
            </div>
            <div
              className="line"
              style={{ left: distance + "px", width: width + "px" }}
            ></div>
          </div>
          <div className="main">
            <div className="wrapper">
              {dataFiltered?.map((e, index) => {
                return (
                  <FileItemV2
                    key={index}
                    num={e.num}
                    isFile
                    svgProp={SvgDot}
                    name={e.name}
                    className=""
                  />
                );
              })}
              <AddBoxBorder onClick={handleOpenPopup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
