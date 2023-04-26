import React, { useEffect, useState } from "react"
import MainButton from "../../components/MainButton/MainButton"
import Redirect from "../../components/Redirect/Redirect"
import SearchBasic from "../../components/SearchBasic/SearchBasic"
import add from "../../assets/svg/add.svg"
import "./RestorativeProfile.scss"
import { resTorativeData } from "../../constant/constant"
import FileItem from "../../components/FileItem/FileItem"
import PopupCreateFile from "../../components/PopupCreateFile/PopupCreateFile"
let data = [
  {
    id: 1,
    name: "P. Hành chính - Tổng Hợp",
    path: "/admin/restorativeDocument",
  },
  { id: 2, name: "Quản lý hồ sơ P. TBDT", path: "#" },
]
export default function RestorativeProfile() {
  const [isPopup, setIsPopup] = useState(false)
  const [compared, setCompared] = useState(0)
  const [distance, setDistance] = useState(0)
  const [filter, setFilter] = useState("")
  const [dataFilesResto, setDataFilesResto] = useState(resTorativeData)
  const [dataFiltered, setDataFiltered] = useState([])
  const [width, setWidth] = useState(0)

  const handleTabs = (e) => {
    let id = e.currentTarget.dataset.id
    setCompared(parseInt(id))
  }
  const handleOpenPopup = () => {
    setIsPopup(true)
  }
  useEffect(() => {
    let listLi = document.querySelectorAll(".tabs .item")
    listLi.forEach((e) => {
      let id = e.dataset.id
      if (parseInt(id) === compared) {
        setDistance(e.offsetLeft + e.firstElementChild.offsetLeft)
        setWidth(e.firstElementChild.offsetWidth)
      }
    })
  }, [compared])
  useEffect(() => {
    let data = dataFilesResto[compared].data?.filter((e) => {
      return e.name.toLowerCase().includes(filter.toLowerCase())
    })
    setDataFiltered(data)
  }, [filter, compared, dataFilesResto])
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
        <div className="restorativeProfile__search">
          <SearchBasic setFilterResProfile={setFilter} />
          <MainButton
            icon={add}
            className="mainButton"
            onClick={handleOpenPopup}
          >
            Thêm thư mục
          </MainButton>
        </div>
        <div className="restorativeProfile__main">
          <div className="tabs">
            <div
              className={`item ${compared === 0 ? "active" : ""}`}
              data-id={0}
              onClick={(e) => handleTabs(e)}
            >
              <p>Quản lí dự án</p>
            </div>
            <div
              className={`item ${compared === 1 ? "active" : ""}`}
              data-id={1}
              onClick={(e) => handleTabs(e)}
            >
              <p>Tư vấn thiết kế lập báo cáo kỹ thuật</p>
            </div>
            <div
              className={`item ${compared === 2 ? "active" : ""}`}
              data-id={2}
              onClick={(e) => handleTabs(e)}
            >
              <p>Tư vấn thẩm tra thiết kế và dự toán</p>
            </div>
            <div
              className={`item ${compared === 3 ? "active" : ""}`}
              data-id={3}
              onClick={(e) => handleTabs(e)}
            >
              <p>Tư vấn giám sát thi công</p>
            </div>
            <div
              className="line"
              style={{ left: distance + "px", width: width + "px" }}
            ></div>
          </div>
          <div className="main">
            <div className="wrapper">
              {dataFiltered?.map((e, index) => {
                return <FileItem key={index} num={e.num} name={e.name} />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
