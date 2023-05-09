import React from "react";
import Redirect from "../../components/Redirect/Redirect";
import "./Staffs.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useState } from "react";
import { deleteAxios, getAxios, useGetAxios } from "../../api/Axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import imageAvartar from "../../assets/imgs/avatar1.png";
import imageSignature from "../../assets/imgs/signature.png";
import imageStamp from "../../assets/imgs/stamp.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataUsers,
  setEditUser,
  setFunctionUpdateUser,
} from "../../store/Reducer/usersReducer";
import Pagination from "../../components/Pagination/Pagination";
const redirect = [
  { id: 1, name: "Quản lý tài khoản", path: "#" },
  { id: 2, name: "Hồ sơ nhân viên", path: "/admin/staffs" },
];
const roles = [
  { code: "1", name: "Super Admin" },
  { code: "2", name: "Nhân viên" },
];

function staffMapping(data = []) {
  return data.map((staff) => {
    const {
      _id,
      email,
      last_name,
      first_name,
      avatar,
      phone_number,
      country,
      province,
      address,
      code,
      state,
      isActivate,
      jobInfo: { department, position, role },
      paymentInfo: {
        signature,
        stamp,
        work_days,
        basic_salary,
        bank_department,
        bank,
        card_number,
        card_name,
      },
    } = staff;
    return {
      id: _id,
      signature,
      stamp,
      work_days,
      basic_salary,
      bank_department,
      bank,
      card_number,
      card_name,
      department,
      position,
      role,
      email,
      last_name,
      first_name,
      avatar,
      phone_number,
      country,
      province,
      address,
      code,
      state,
      isActivate,
    };
  });
}

export default function Staffs() {
  const nameHeaders = [
    "Mã số",
    "Họ và tên",
    "Email",
    "Số điện thoại",
    "Vai trò",
    "Ngày tạo",
    "Trạng thái",
    "Thao tác",
  ];

  const dispatch = useDispatch();
  // const { data } = useSelector((store) => store.users);
  const [staffs, setStaffs] = useState([]);
  const [queryConfig, setQueryConfig] = useState({
    limit: 10,
    search: "",
    page: 1,
  });
  const [dataSearchLength, setDataSearchLength] = useState(0);

  const getStaff = () => {
    getAxios("/staff")
      .then((res) => {
        if (res.data) {
          const data = staffMapping(res.data);

          if (data.length > 0) {
            let cloneData = [...data];
            if (queryConfig.search.length > 0) {
              let searchString = queryConfig.search;
              cloneData = cloneData.filter((item) => {
                return removeVietnameseTones(
                  item.id +
                    " " +
                    item.first_name +
                    " " +
                    item.last_name +
                    " " +
                    item.email +
                    " " +
                    item.phone_number +
                    " " +
                    item.date_create
                )
                  .toString()
                  .includes(removeVietnameseTones(searchString).toString());
              });
            }

            setDataSearchLength(cloneData.length);
            if (queryConfig?.limit && queryConfig?.page) {
              cloneData = cloneData.splice(
                queryConfig?.page * 1 * queryConfig?.limit * 1 -
                  queryConfig?.limit * 1,
                queryConfig?.limit * 1
              );
              if (cloneData.length === 0) {
                setQueryConfig({ ...queryConfig, page: 1 });
              }
            }

            setStaffs(cloneData);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStaff();
  }, []);
  // const privateAxios=useAxiosPrivate()
  // const getAxiosDB=useGetAxios();
  // // console.log(getAxios);
  const navigate = useNavigate();
  async function fetchData() {
    // const response = await getAxios("users?page=1")
    // console.log(response)
    // console.log(response.data.results);
  }
  // console.log(getAxiosDB)

  const changePageUserInfo = (data) => {
    console.log(data);
    dispatch(setEditUser(data));
    navigate("/admin/infostaff");
  };

  const handleClickAddUser = () => {
    navigate("/admin/addstaff");
  };

  const handleClickUpdateUser = (staff) => {
    dispatch(setEditUser(staff));
    navigate("/admin/editstaff");
  };

  const swalDelete = Swal.mixin({
    customClass: {
      confirmButton: "sweertAlert__cancelStaff",
      cancelButton: "sweertAlert__saveStaff",
    },
    buttonsStyling: false,
  });
  const confirmDelete = Swal.mixin({
    customClass: {
      confirmButton: "sweertAlert__confirmStaff",
    },
    buttonsStyling: false,
  });
  const handleClickDeleteUser = (id) => {
    swalDelete
      .fire({
        html: `<svg className="sweertAlert__iconWarningDeleteStaff"width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="52" height="52" rx="26" fill="#E13F3F"/>
    <g clip-path="url(#clip0_1896_137514)">
    <path d="M30.0832 35.4688C30.0832 37.9673 28.0271 40 25.4998 40C22.9726 40 20.9165 37.9673 20.9165 35.4688C20.9165 32.9702 22.9726 30.9375 25.4998 30.9375C28.0271 30.9375 30.0832 32.9702 30.0832 35.4688ZM21.447 12.4273L22.2262 27.8335C22.2628 28.557 22.8668 29.125 23.5995 29.125H27.4002C28.1329 29.125 28.7369 28.557 28.7735 27.8335L29.5527 12.4273C29.5919 11.6508 28.9658 11 28.1794 11H22.8203C22.0339 11 21.4078 11.6508 21.447 12.4273Z" fill="white"/>
    </g>
    <defs>
    <clipPath id="clip0_1896_137514">
    <rect width="11" height="29" fill="white" transform="translate(20 11)"/>
    </clipPath>
    </defs>
    </svg>
     <p className="sweertAlert__titleDeleteStaff" style="font-weight:600;font-size:24px;color:#393b3d;margin-top:8px;">Bạn có muốn xoá người này!</p>
     <span className="sweertAlert__contentDeleteStaff" style="font-weight:400;font-size:16px;color:#393b3d;margin-top:8px;">Bạn sẽ xoá vĩnh viễn người này.
     <br/>Bấm Huỷ để trở lại.</span>
 
     `,

        showCancelButton: true,
        confirmButtonText: "Trở về",
        cancelButtonText: "Tiếp tục",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // const newStaffs = data.filter((staff) => staff.id !== id);

          // dispatch(setDataUsers(newStaffs));
          deleteAxios(`http://127.0.0.1:4000/api/v1/staff/${id}`)
            .then((res) => getStaff())
            .catch((err) => console.log(err));
          confirmDelete.fire({
            html: `
   <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="52" height="52" rx="26" fill="#27AE60"/>
  <path d="M20.2083 37.5286L9.48325 27.0688C8.83892 26.4404 8.83892 25.4215 9.48325 24.7931L11.8167 22.5173C12.461 21.8888 13.5058 21.8888 14.1501 22.5173L21.375 29.5635L36.8499 14.4713C37.4942 13.8429 38.539 13.8429 39.1833 14.4713L41.5167 16.7471C42.1611 17.3755 42.1611 18.3944 41.5167 19.0228L22.5417 37.5287C21.8973 38.1571 20.8526 38.1571 20.2083 37.5286Z" fill="white"/>
  </svg>
  <p className="sweertAlert__titleDeleteStaff" style="font-weight:600;font-size:24px;color:#393b3d;margin-top:8px;">Xoá thành công!</p>
  <span className="sweertAlert__contentDeleteStaff" style="font-weight:400;font-size:16px;color:#393b3d;margin-top:8px;">Bạn đã xoá vĩnh viễn người dùng.<br/>
  Bấm Xong để trở về danh sách nhân viên.</span>`,

            showCancelButton: false,
            confirmButtonText: "Xong",
            reverseButtons: true,
          });
        }
      });
  };
  return (
    <div className="staffs container-fluid">
      <Redirect data={redirect} />
      <div className="staffs__options">
        <div className="staffs__options--search">
          <input
            type="text"
            className="inputSearch"
            placeholder="Tìm kiếm"
            onChange={(e) =>
              setQueryConfig({ ...queryConfig, search: e.target.value })
            }
            value={queryConfig?.search}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="searchIcon"
          >
            <path
              d="M17 17L13.2223 13.2156M15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789Z"
              stroke="#1A48E9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="staffs__options--addUser"
          onClick={() => handleClickAddUser()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 1.5C7.74566 1.5 5.58365 2.39553 3.98959 3.98959C2.39553 5.58365 1.5 7.74566 1.5 10C1.5 12.2543 2.39553 14.4163 3.98959 16.0104C5.58365 17.6045 7.74566 18.5 10 18.5C12.2543 18.5 14.4163 17.6045 16.0104 16.0104C17.6045 14.4163 18.5 12.2543 18.5 10C18.5 7.74566 17.6045 5.58365 16.0104 3.98959C14.4163 2.39553 12.2543 1.5 10 1.5ZM10 5C10.1989 5 10.3897 5.07902 10.5303 5.21967C10.671 5.36032 10.75 5.55109 10.75 5.75V9.25H14.25C14.4489 9.25 14.6397 9.32902 14.7803 9.46967C14.921 9.61032 15 9.80109 15 10C15 10.1989 14.921 10.3897 14.7803 10.5303C14.6397 10.671 14.4489 10.75 14.25 10.75H10.75V14.25C10.75 14.4489 10.671 14.6397 10.5303 14.7803C10.3897 14.921 10.1989 15 10 15C9.80109 15 9.61032 14.921 9.46967 14.7803C9.32902 14.6397 9.25 14.4489 9.25 14.25V10.75H5.75C5.55109 10.75 5.36032 10.671 5.21967 10.5303C5.07902 10.3897 5 10.1989 5 10C5 9.80109 5.07902 9.61032 5.21967 9.46967C5.36032 9.32902 5.55109 9.25 5.75 9.25H9.25V5.75C9.25 5.55109 9.32902 5.36032 9.46967 5.21967C9.61032 5.07902 9.80109 5 10 5Z"
              fill="white"
            />
          </svg>
          <span className="text">Tạo người dùng</span>
        </div>
      </div>
      <table className="staffs__tableHeader">
        <thead>
          <tr className="staffs__tableHeader--header">
            {nameHeaders &&
              nameHeaders.map((nameHeader) => {
                return (
                  <th
                    className={`${
                      nameHeader === "Thao tác"
                        ? `displayNoneSVG alignRight`
                        : ``
                    }`}
                    key={uuidv4()}
                  >
                    <span>{nameHeader}</span>
                    <svg
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 2.92285L3.80215 0.928087L6.6043 2.92285"
                        stroke="#C1C1C1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.60449 6.91211L3.80234 8.90687L1.00019 6.91211"
                        stroke="#C1C1C1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                );
              })}
          </tr>
        </thead>
      </table>
      <div className="staffs__tableData">
        <table className="staffs__tableData--data">
          <tbody>
            {staffs &&
              staffs.map((staff) => {
                const staffRole = roles.filter(
                  (role) => role.code * 1 === staff.role * 1
                )[0]?.name;
                return (
                  <tr
                    className="tableData"
                    key={uuidv4()}
                    onDoubleClick={() => changePageUserInfo(staff)}
                  >
                    <td>{staff.id}</td>
                    <td>{`${staff.first_name} ${staff.last_name}`}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone_number}</td>
                    <td>{staffRole}</td>
                    <td>{staff.date_create}</td>
                    <td>
                      <div className="tableData__state">
                        <div
                          className={
                            staff.isActivate ? `circleOn` : `circleOff`
                          }
                        >{``}</div>
                        <span>
                          {staff.isActivate
                            ? `Đang hoạt động`
                            : `Đang ngoại tuyến`}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="crud-options">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 17 16"
                          fill="#1a48e9"
                          xmlns="http://www.w3.org/2000/svg"
                          className="crud-options__update"
                          onClick={() => handleClickUpdateUser(staff)}
                        >
                          <path
                            d="M15.3603 1.62737C14.4202 0.790875 12.896 0.790875 11.9558 1.62737L2.41187 10.1192C2.34646 10.1774 2.29924 10.2495 2.27458 10.3287L1.01952 14.3602C0.967906 14.5255 1.02036 14.7025 1.1566 14.8239C1.29306 14.9452 1.492 14.9918 1.67777 14.9461L6.2088 13.8292C6.29782 13.8073 6.3789 13.7653 6.44431 13.7071L15.988 5.21508C16.9267 4.37802 16.9267 3.02296 15.988 2.18591L15.3603 1.62737ZM3.57749 10.4286L11.3885 3.47849L13.9076 5.71988L6.09638 12.6699L3.57749 10.4286ZM3.07429 11.327L5.08686 13.1178L2.303 13.8041L3.07429 11.327ZM15.2316 4.54201L14.6642 5.04681L12.1449 2.80524L12.7125 2.30044C13.2347 1.8358 14.0814 1.8358 14.6036 2.30044L15.2316 2.85897C15.753 3.32417 15.753 4.077 15.2316 4.54201Z"
                            fill="#1a48e9"
                            stroke="#1a48e9"
                            strokeWidth="0.2"
                          />
                        </svg>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="crud-options__delete"
                          onClick={() => handleClickDeleteUser(staff.id)}
                        >
                          <path
                            d="M16.0189 18.387C15.6233 18.387 15.2256 18.387 14.83 18.387C13.8797 18.387 12.9314 18.387 11.9811 18.387C10.8466 18.387 9.71212 18.387 8.57552 18.387C7.60009 18.387 6.62466 18.387 5.64924 18.387C5.20129 18.387 4.75126 18.389 4.30332 18.387C4.22377 18.387 4.14423 18.3809 4.06469 18.3729C4.13795 18.3829 4.21331 18.393 4.28657 18.4011C4.13795 18.3809 3.99352 18.3446 3.85328 18.2902C3.92026 18.3164 3.98724 18.3446 4.05423 18.3708C3.9098 18.3124 3.77583 18.2378 3.65233 18.145C3.70885 18.1874 3.76537 18.2297 3.82188 18.272C3.70676 18.1854 3.60419 18.0866 3.51418 17.9757C3.55814 18.0301 3.6021 18.0845 3.64605 18.139C3.55186 18.02 3.47232 17.891 3.41162 17.7519C3.43883 17.8164 3.46813 17.8809 3.49534 17.9454C3.43883 17.8104 3.40115 17.6712 3.38022 17.5281C3.39068 17.5987 3.40115 17.6712 3.40952 17.7418C3.3865 17.5624 3.39487 17.3789 3.39487 17.1995C3.39487 16.8769 3.39487 16.5543 3.39487 16.2317C3.39487 15.7418 3.39487 15.2519 3.39487 14.762C3.39487 14.1591 3.39487 13.5543 3.39487 12.9515C3.39487 12.2902 3.39487 11.6289 3.39487 10.9676C3.39487 10.2942 3.39487 9.62079 3.39487 8.94942C3.39487 8.32038 3.39487 7.69135 3.39487 7.06231C3.39487 6.53207 3.39487 6.00182 3.39487 5.47359C3.39487 5.09053 3.39487 4.70544 3.39487 4.32238C3.39487 4.14092 3.39696 3.95947 3.39487 3.77802C3.39487 3.76995 3.39487 3.76189 3.39487 3.75382C3.11648 4.02197 2.83599 4.29213 2.55759 4.56028C2.69365 4.56028 2.82971 4.56028 2.96367 4.56028C3.33208 4.56028 3.70257 4.56028 4.07097 4.56028C4.61311 4.56028 5.15734 4.56028 5.69947 4.56028C6.36511 4.56028 7.03074 4.56028 7.69638 4.56028C8.42481 4.56028 9.15533 4.56028 9.88376 4.56028C10.6206 4.56028 11.3553 4.56028 12.0921 4.56028C12.7786 4.56028 13.4652 4.56028 14.1518 4.56028C14.7295 4.56028 15.3072 4.56028 15.8849 4.56028C16.3015 4.56028 16.7201 4.56028 17.1367 4.56028C17.3355 4.56028 17.5323 4.5623 17.7311 4.56028C17.7395 4.56028 17.7479 4.56028 17.7562 4.56028C17.4779 4.29213 17.1974 4.02197 16.919 3.75382C16.919 3.87883 16.919 4.00383 16.919 4.12883C16.919 4.46552 16.919 4.80423 16.919 5.14093C16.919 5.64093 16.919 6.14295 16.919 6.64295C16.919 7.25384 16.919 7.86272 16.919 8.47361C16.919 9.13692 16.919 9.80023 16.919 10.4656C16.919 11.1369 16.919 11.8083 16.919 12.4797C16.919 13.1027 16.919 13.7257 16.919 14.3486C16.919 14.8688 16.919 15.389 16.919 15.9091C16.919 16.2781 16.919 16.6491 16.919 17.018C16.919 17.1813 16.919 17.3446 16.919 17.5079C16.919 17.5866 16.9148 17.6632 16.9043 17.7418C16.9148 17.6712 16.9253 17.5987 16.9336 17.5281C16.9127 17.6712 16.875 17.8104 16.8185 17.9454C16.8457 17.8809 16.875 17.8164 16.9022 17.7519C16.8415 17.891 16.7641 18.02 16.6678 18.139C16.7117 18.0845 16.7557 18.0301 16.7997 17.9757C16.7097 18.0866 16.6071 18.1854 16.492 18.272C16.5485 18.2297 16.605 18.1874 16.6615 18.145C16.538 18.2358 16.404 18.3124 16.2596 18.3708C16.3266 18.3446 16.3936 18.3164 16.4606 18.2902C16.3203 18.3446 16.1759 18.3809 16.0273 18.4011C16.1005 18.391 16.1759 18.3809 16.2492 18.3729C16.1738 18.3829 16.0963 18.387 16.0189 18.387C15.8033 18.389 15.5793 18.4757 15.4265 18.6229C15.2821 18.762 15.1712 18.9918 15.1816 19.1934C15.2026 19.6269 15.55 20.0039 16.0189 19.9999C16.718 19.9938 17.4234 19.7176 17.8965 19.2156C18.3382 18.7479 18.5914 18.1511 18.5956 17.516C18.5977 17.3527 18.5956 17.1874 18.5956 17.0241C18.5956 16.6148 18.5956 16.2055 18.5956 15.7982C18.5956 15.2095 18.5956 14.6208 18.5956 14.0321C18.5956 13.3365 18.5956 12.643 18.5956 11.9474C18.5956 11.2115 18.5956 10.4756 18.5956 9.74176C18.5956 9.03006 18.5956 8.32038 18.5956 7.60868C18.5956 6.99779 18.5956 6.38489 18.5956 5.774C18.5956 5.3244 18.5956 4.8748 18.5956 4.4252C18.5956 4.21149 18.5977 3.99576 18.5956 3.78205C18.5956 3.77197 18.5956 3.76391 18.5956 3.75382C18.5956 3.31834 18.2126 2.94737 17.7583 2.94737C17.6223 2.94737 17.4862 2.94737 17.3523 2.94737C16.9839 2.94737 16.6134 2.94737 16.245 2.94737C15.7028 2.94737 15.1586 2.94737 14.6165 2.94737C13.9508 2.94737 13.2852 2.94737 12.6196 2.94737C11.8911 2.94737 11.1606 2.94737 10.4322 2.94737C9.69537 2.94737 8.96066 2.94737 8.22386 2.94737C7.53729 2.94737 6.85073 2.94737 6.16416 2.94737C5.58644 2.94737 5.00872 2.94737 4.431 2.94737C4.01446 2.94737 3.59582 2.94737 3.17927 2.94737C2.98042 2.94737 2.78366 2.94535 2.58481 2.94737C2.57643 2.94737 2.56806 2.94737 2.55969 2.94737C2.10756 2.94737 1.72241 3.31632 1.72241 3.75382C1.72241 4.18125 1.72241 4.60665 1.72241 5.03407C1.72241 6.06231 1.72241 7.09255 1.72241 8.12078C1.72241 9.39095 1.72241 10.6591 1.72241 11.9293C1.72241 13.0825 1.72241 14.2357 1.72241 15.387C1.72241 16.0482 1.72241 16.7075 1.72241 17.3688C1.72241 17.8466 1.80823 18.3083 2.05104 18.7317C2.50317 19.5241 3.39906 19.9979 4.32843 19.9999C4.96686 19.9999 5.60528 19.9999 6.2437 19.9999C7.4745 19.9999 8.70739 19.9999 9.93818 19.9999C11.1983 19.9999 12.4563 19.9999 13.7164 19.9999C14.449 19.9999 15.1816 19.9999 15.9121 19.9999C15.9477 19.9999 15.9833 19.9999 16.0189 19.9999C16.4564 19.9999 16.8771 19.6289 16.8562 19.1934C16.8352 18.7579 16.4878 18.387 16.0189 18.387Z"
                            fill="#E62614"
                          />
                          <path
                            d="M12.6071 3.18822e-05C12.2366 3.18822e-05 11.864 3.18822e-05 11.4935 3.18822e-05C10.763 3.18822e-05 10.0304 3.18822e-05 9.29986 3.18822e-05C8.7954 3.18822e-05 8.29094 3.18822e-05 7.78648 3.18822e-05C7.36157 3.18822e-05 6.92409 0.0907582 6.57034 0.32463C5.96541 0.719794 5.59491 1.34681 5.59073 2.0565C5.58654 2.60489 5.59073 3.15328 5.59073 3.70167C5.59073 3.71981 5.59073 3.73796 5.59073 3.7561C5.59073 4.19159 5.97378 4.56256 6.428 4.56256C6.675 4.56256 6.922 4.56256 7.16899 4.56256C7.76346 4.56256 8.35583 4.56256 8.9503 4.56256C9.67245 4.56256 10.3946 4.56256 11.1168 4.56256C11.7384 4.56256 12.358 4.56256 12.9797 4.56256C13.2811 4.56256 13.5846 4.56659 13.886 4.56256C13.8902 4.56256 13.8944 4.56256 13.8986 4.56256C14.3507 4.56256 14.7359 4.1936 14.7359 3.7561C14.7359 3.36094 14.7359 2.96376 14.7359 2.56859C14.7359 2.39924 14.7359 2.2319 14.7359 2.06254C14.7338 1.55246 14.5433 1.10084 14.2126 0.707697C13.8253 0.252049 13.2058 0.0060803 12.6071 3.18822e-05C12.1696 -0.0040004 11.7489 0.375034 11.7698 0.806488C11.7908 1.24802 12.1382 1.60891 12.6071 1.61294C12.6657 1.61294 12.7222 1.61698 12.7787 1.62302C12.7055 1.61294 12.6301 1.60286 12.5569 1.5948C12.6678 1.61093 12.7746 1.63714 12.8792 1.67948C12.8122 1.65327 12.7453 1.62504 12.6783 1.59883C12.7787 1.64117 12.8729 1.69359 12.9609 1.75609C12.9043 1.71375 12.8478 1.67141 12.7913 1.62907C12.8855 1.69964 12.9671 1.77827 13.0404 1.86899C12.9964 1.81456 12.9525 1.76012 12.9085 1.70569C12.9734 1.79036 13.0278 1.88109 13.0718 1.97787C13.0446 1.91335 13.0153 1.84883 12.9881 1.78432C13.0299 1.88512 13.0592 1.98795 13.076 2.0948C13.0655 2.02424 13.055 1.95166 13.0467 1.88109C13.0739 2.10287 13.0571 2.33472 13.0571 2.5565C13.0571 2.87706 13.0571 3.19965 13.0571 3.52021C13.0571 3.59884 13.0571 3.67546 13.0571 3.75409C13.3355 3.48594 13.616 3.21578 13.8944 2.94763C13.6474 2.94763 13.4004 2.94763 13.1534 2.94763C12.559 2.94763 11.9666 2.94763 11.3721 2.94763C10.65 2.94763 9.92782 2.94763 9.20567 2.94763C8.58399 2.94763 7.96441 2.94763 7.34273 2.94763C7.04131 2.94763 6.7378 2.94158 6.43638 2.94763C6.43219 2.94763 6.428 2.94763 6.42382 2.94763C6.70221 3.21578 6.9827 3.48594 7.26109 3.75409C7.26109 3.23594 7.26109 2.71981 7.26109 2.20166C7.26109 2.0948 7.259 1.98795 7.27156 1.88109C7.26109 1.95166 7.25063 2.02424 7.24226 2.0948C7.259 1.98795 7.28621 1.88512 7.33017 1.78432C7.30296 1.84883 7.27365 1.91335 7.24644 1.97787C7.2904 1.88109 7.34482 1.79036 7.40971 1.70569C7.36575 1.76012 7.3218 1.81456 7.27784 1.86899C7.3511 1.77827 7.43274 1.69964 7.52693 1.62907C7.47041 1.67141 7.4139 1.71375 7.35738 1.75609C7.44529 1.69359 7.53949 1.64117 7.63996 1.59883C7.57298 1.62504 7.506 1.65327 7.43901 1.67948C7.54367 1.63915 7.65043 1.61093 7.76137 1.5948C7.6881 1.60488 7.61275 1.61496 7.53949 1.62302C7.73625 1.59883 7.94138 1.61294 8.14023 1.61294C8.52538 1.61294 8.91053 1.61294 9.29568 1.61294C10.1895 1.61294 11.0833 1.61294 11.9791 1.61294C12.1864 1.61294 12.3957 1.61294 12.6029 1.61294C13.0404 1.61294 13.4611 1.24197 13.4402 0.806488C13.4234 0.368986 13.076 3.18822e-05 12.6071 3.18822e-05Z"
                            fill="#E62614"
                          />
                          <path
                            d="M19.4842 2.94737C19.3188 2.94737 19.1513 2.94737 18.986 2.94737C18.5339 2.94737 18.0817 2.94737 17.6296 2.94737C16.9619 2.94737 16.292 2.94737 15.6243 2.94737C14.808 2.94737 13.9916 2.94737 13.1774 2.94737C12.2836 2.94737 11.3898 2.94737 10.496 2.94737C9.59384 2.94737 8.69168 2.94737 7.78951 2.94737C6.94805 2.94737 6.10659 2.94737 5.26512 2.94737C4.55344 2.94737 3.84175 2.94737 3.13216 2.94737C2.61933 2.94737 2.1065 2.94737 1.59367 2.94737C1.35295 2.94737 1.11223 2.94535 0.869424 2.94737C0.858958 2.94737 0.848492 2.94737 0.838026 2.94737C0.400549 2.94737 -0.0201821 3.31834 0.000749778 3.75382C0.0216817 4.19133 0.369151 4.56028 0.838026 4.56028C1.00339 4.56028 1.17084 4.56028 1.33621 4.56028C1.78833 4.56028 2.24046 4.56028 2.69259 4.56028C3.36032 4.56028 4.03014 4.56028 4.69787 4.56028C5.51421 4.56028 6.33056 4.56028 7.14481 4.56028C8.0386 4.56028 8.93239 4.56028 9.82619 4.56028C10.7284 4.56028 11.6305 4.56028 12.5327 4.56028C13.3741 4.56028 14.2156 4.56028 15.0571 4.56028C15.7688 4.56028 16.4804 4.56028 17.19 4.56028C17.7029 4.56028 18.2157 4.56028 18.7285 4.56028C18.9692 4.56028 19.21 4.5623 19.4528 4.56028C19.4632 4.56028 19.4737 4.56028 19.4842 4.56028C19.9216 4.56028 20.3424 4.18931 20.3214 3.75382C20.3005 3.31632 19.953 2.94737 19.4842 2.94737Z"
                            fill="#E62614"
                          />
                          <path
                            d="M8.32449 15.5651C8.32449 15.2929 8.32449 15.0207 8.32449 14.7506C8.32449 14.0973 8.32449 13.4461 8.32449 12.7929C8.32449 12.0066 8.32449 11.2223 8.32449 10.436C8.32449 9.75457 8.32449 9.0711 8.32449 8.38965C8.32449 8.059 8.33077 7.72835 8.32449 7.39771C8.32449 7.39367 8.32449 7.38763 8.32449 7.38359C8.32449 6.96222 7.93964 6.55698 7.48786 6.57714C7.03399 6.5973 6.65123 6.93198 6.65123 7.38359C6.65123 7.65577 6.65123 7.92795 6.65123 8.19812C6.65123 8.85134 6.65123 9.50256 6.65123 10.1558C6.65123 10.9421 6.65123 11.7264 6.65123 12.5127C6.65123 13.1941 6.65123 13.8776 6.65123 14.559C6.65123 14.8897 6.64495 15.2203 6.65123 15.551C6.65123 15.555 6.65123 15.5611 6.65123 15.5651C6.65123 15.9865 7.03608 16.3917 7.48786 16.3715C7.93964 16.3534 8.32449 16.0187 8.32449 15.5651Z"
                            fill="#E62614"
                          />
                          <path
                            d="M13.666 15.5651C13.666 15.2929 13.666 15.0207 13.666 14.7506C13.666 14.0973 13.666 13.4461 13.666 12.7929C13.666 12.0066 13.666 11.2223 13.666 10.436C13.666 9.75457 13.666 9.0711 13.666 8.38965C13.666 8.059 13.6723 7.72835 13.666 7.39771C13.666 7.39367 13.666 7.38763 13.666 7.38359C13.666 6.96222 13.2812 6.55698 12.8294 6.57714C12.3755 6.5973 11.9928 6.93198 11.9928 7.38359C11.9928 7.65577 11.9928 7.92795 11.9928 8.19812C11.9928 8.85134 11.9928 9.50256 11.9928 10.1558C11.9928 10.9421 11.9928 11.7264 11.9928 12.5127C11.9928 13.1941 11.9928 13.8776 11.9928 14.559C11.9928 14.8897 11.9865 15.2203 11.9928 15.551C11.9928 15.555 11.9928 15.5611 11.9928 15.5651C11.9928 15.9865 12.3776 16.3917 12.8294 16.3715C13.2833 16.3534 13.666 16.0187 13.666 15.5651Z"
                            fill="#E62614"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="staffs__bottom">
        <div className="staffs__bottom--displayInput">
          <span className="text">Hiển thị</span>
          <input
            type="number"
            className="inputDisplay"
            defaultValue={10}
            max={dataSearchLength}
            onChange={(e) => {
              setQueryConfig({ ...queryConfig, limit: e.target.value * 1 });
            }}
            value={queryConfig?.limit}
          />
          <span className="text">trong tổng số {dataSearchLength} dữ liệu</span>
        </div>
        <Pagination
          queryConfig={queryConfig}
          pageSize={
            queryConfig?.limit
              ? Math.ceil(dataSearchLength / queryConfig?.limit)
              : 0
          }
          setQueryConfig={setQueryConfig}
        />
      </div>
    </div>
  );
}
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");

  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.toLowerCase();
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
