import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import arrow from "../../assets/svg/arrow_down.svg";
import manage_account from "../../assets/svg/manage_account.svg";
import relics_file from "../../assets/svg/relics_file.svg";
import administrative from "../../assets/svg/administrative_office.svg";
import restorative from "../../assets/svg/relic_restoration.svg";
import directer from "../../assets/svg/directer.svg";
import "./MainNav.scss";
export default function MainNav() {
  function findParent(child, parentClass) {
    let parent = child.parentElement;
    while (parent) {
      if (parent.classList.contains(parentClass)) {
        parent.classList.add("active", "show");
        break;
      }
      parent = parent.parentElement;
    }
    return parent;
  }
  const location = useLocation();
  const handleShow = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("wrapper")) {
      e.target.parentElement.classList.toggle("show");
    }
    if (e.target.classList.contains("main")) {
      e.target.parentElement.classList.toggle("show");
    }
  };
  useEffect(() => {
    let mainWrappers = document.querySelectorAll(".mainNav__wrapper");
    mainWrappers.forEach((e) => {
      e.classList.remove("show", "active");
    });
    let itemActive = document.querySelectorAll(".options a");
    itemActive.forEach((e) => {
      if (e.classList.contains("active")) {
        findParent(e, "mainNav__wrapper");
      }
    });
  }, [location.pathname]);
  return (
    <div className="mainNav">
      <div className="container-fluid">
        <div className="mainNav__wrapper" onClick={handleShow}>
          <div className="main">
            <div className="left">
              <img src={manage_account} alt="icon_svg" />
              <p>Quản lý tài khoản</p>
            </div>
            <div className="right">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
                  fill="#4F5052"
                />
              </svg>
            </div>
          </div>
          <div className="options">
            <NavLink to="/admin/staffs" className="item">
              <p>Hồ sơ nhân viên</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/generalProfile" className="item">
              <p>Thư viện văn bản</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/calendar" className="item">
              <p>Lịch trình</p>
              <div className="circle"></div>
            </NavLink>
            <div className="dropdown">
              <div className="wrapper" onClick={handleShow}>
                <p>Nhiệm vụ</p>
                <img src={arrow} alt="icon_svg" />
              </div>
              <NavLink to="/admin/mission/synthesis" className="item">
                <p>Tổng hợp</p>
                <div className="circle"></div>
              </NavLink>
              <NavLink to="/admin/mission/administrative" className="item">
                <p>P. HC - TH</p>
                <div className="circle"></div>
              </NavLink>
              <NavLink to="/admin/mission/restore" className="item">
                <p>P. Tu Bổ Di Tích</p>
                <div className="circle"></div>
              </NavLink>
              <NavLink to="/admin/mission/profile" className="item">
                <p>P. Lập hồ sơ di tích</p>
                <div className="circle"></div>
              </NavLink>
            </div>
          </div>
        </div>
        <NavLink
          to="/admin/director"
          className="mainNav__wrapper--noneDropdown"
        >
          <div className="main">
            <div className="left">
              <img src={directer} alt="icon_svg" />
              <p>Ban giám đốc</p>
            </div>
            <div className="circleMainWrapper"></div>
          </div>
        </NavLink>
        <NavLink to="/admin/3d" className="mainNav__wrapper--noneDropdown">
          <div className="main">
            <div className="left">
              <img src={directer} alt="icon_svg" />
              <p>3D</p>
            </div>
            <div className="circleMainWrapper"></div>
          </div>
        </NavLink>
        <div className="mainNav__wrapper" onClick={handleShow}>
          <div className="main">
            <div className="left">
              <img src={administrative} alt="icon_svg" />
              <p>P.Hành Chính - Tổng Hợp</p>
            </div>
            <div className="right">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
                  fill="#4F5052"
                />
              </svg>
            </div>
          </div>
          <div className="options">
            <NavLink to="/admin/administrativeDocument" className="item">
              <p>Quản lý văn thư P. HC-TH</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/administrativeProfile" className="item">
              <p>Quản lý hồ sơ P. HC-TH</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/administrativeRevenue" className="item">
              <p>Văn thư lưu trữ của Trung tâm</p>
              <div className="circle"></div>
            </NavLink>
          </div>
        </div>

        <div className="mainNav__wrapper" onClick={handleShow}>
          <div className="main">
            <div className="left">
              <img src={restorative} alt="icon_svg" />
              <p>P. Tu Bổ Di Tích</p>
            </div>
            <div className="right">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
                  fill="#4F5052"
                />
              </svg>
            </div>
          </div>
          <div className="options">
            <NavLink to="/admin/restorativeDocument" className="item">
              <p>Quản lý văn thư P. TBDT</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/restorativeProfile" className="item">
              <p>Quản lý hồ sơ P. TBDT</p>
              <div className="circle"></div>
            </NavLink>
          </div>
        </div>
        <div className="mainNav__wrapper" onClick={handleShow}>
          <div className="main">
            <div className="left">
              <img src={relics_file} alt="icon_svg" />
              <p>P.Lập Hồ Sơ Di Tích</p>
            </div>
            <div className="right">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
                  fill="#4F5052"
                />
              </svg>
            </div>
          </div>
          <div className="options">
            <NavLink to="/admin/document" className="item">
              <p>Quản lý văn thư P. LHSDT</p>
              <div className="circle"></div>
            </NavLink>
            <NavLink to="/admin/relics" className="item">
              <p>Quản lý hồ sơ P. LHSDT</p>
              <div className="circle"></div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
