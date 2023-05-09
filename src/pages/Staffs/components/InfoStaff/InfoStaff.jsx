import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { provinces } from "constant/constant";

import Swal from "sweetalert2";
import * as yup from "yup";

import Redirect from "../../../../components/Redirect/Redirect";
import { setDataUsers } from "../../../../store/Reducer/usersReducer";
import Switch from "react-switch";

import "./InfoStaff.scss";
import { getAxios } from "api/Axios";

const roles = [
  { code: "1", name: "Super Admin" },
  { code: "2", name: "Nhân viên" },
];
const positions = [
  { code: "1", name: "Bộ phận A" },
  { code: "2", name: "Bộ phận B" },
  { code: "3", name: "Bộ phận C" },
];
const departments = [
  { code: "1", name: "Chi nhánh A" },
  { code: "2", name: "Chi nhánh B" },
  { code: "3", name: "Chi nhánh C" },
];

let redirect = [
  { id: 1, name: "Quản lý tài khoản", path: "/admin/staffs" },
  { id: 2, name: "Hồ sơ nhân viên", path: "/admin/staffs" },
  { id: 3, name: "Thông tin nhân viên", path: "/admin/infostaff" },
];
export default function InfoStaff() {
  const { editUser, data: staffs } = useSelector((store) => store.users);

  let infoLocation = provinces.find((item) => {
    return "" + item.code === editUser.country;
  });

  let district = null;
  let ward = null;
  let role = roles.find((item) => item.code === editUser.code);
  let position = positions.find((item) => item.code === editUser.code);
  let department = departments.find((item) => item.code === editUser.code);
  if (infoLocation) {
    district = infoLocation.districts.find((item) => {
      return "" + item.code === editUser.district;
    });

    if (district) {
      ward = district.wards.find((item) => {
        return "" + item.code === editUser.ward;
      });
    }
  }

  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/admin/infostaff");
  };

  return (
    <div className="infostaff">
      <Redirect data={redirect} />
      <div className="infostaff__wrap">
        <div className="infostaff__title">Thông tin cá nhân</div>
        <div className="infostaff__form">
          <div className="infostaff__form-profile">
            <div className="infostaff__form-profile-left">
              <div className="infostaff__form-profile-left-1">
                <div className="label">Họ</div>
                <div className="text">{editUser.last_name}</div>
              </div>
              <div className="infostaff__form-profile-left-2">
                <div className="label">Tên</div>
                <div className="text">{editUser.first_name}</div>
              </div>
              <div className="infostaff__form-profile-left-3">
                <div className="label">Email</div>
                <div className="text">{editUser.email}</div>
              </div>
              <div className="infostaff__form-profile-left-4">
                <div className="label">Số điện thoại</div>
                <div className="text">{editUser.phone_number}</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Quốc gia</div>
                <div className="text">Việt Name</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Thành phố</div>
                <div className="text">{infoLocation?.name}</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Quận/Huyện</div>
                <div className="text">{district?.name}</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Phường/Xã</div>
                <div className="text">{ward?.name}</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Địa chỉ</div>
                <div className="text">{editUser.address}</div>
              </div>

              <div className="infostaff__form-profile-left-4">
                <div className="label">Mã số</div>
                <div className="text">{editUser.code}</div>
              </div>
              <div>
                <div
                  className="inputStaff__label"
                  style={{
                    marginBottom: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#888888",
                  }}
                >
                  Trạng thái
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Switch
                    disabled={true}
                    checked={editUser.isActivate || false}
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
                    onChange={() => {}}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#313131",
                    }}
                  >
                    {editUser.online ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </div>
                </div>
              </div>
            </div>
            <div className="infostaff__form-profile-right">
              <div
                className="infostaff__form-profile-right-img"
                alt=""
                style={{
                  backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%), url(http://127.0.0.1:4000/${editUser.avatar})`,
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#EAEBED",
              margin: "32px 0px 16px 0px",
            }}
          ></div>
          <div className="infostaff__form-work">
            <div className="infostaff__title">Thông tin làm việc</div>

            <div className="infostaff__form-work-center">
              <div className="infostaff__form-work-center-1">
                <div className="label">Chi nhánh</div>
                <div className="text">{department?.name}</div>
              </div>
              <div className="infostaff__form-work-center-2">
                <div className="label">Bộ phận</div>
                <div className="text">{position?.name}</div>
              </div>
              <div className="infostaff__form-work-center-3">
                <div className="label">Chức vụ</div>
                <div className="text">{role?.name}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#EAEBED",
              margin: "32px 0px 16px 0px",
            }}
          ></div>
          <div className="infostaff__form-bank">
            <div className="infostaff__title">Thông tin thanh toán</div>
            <div className="infostaff__form-bank-bottom">
              <div className="infostaff__form-bank-bottom-1">
                <div className="label">Tên chủ thẻ</div>
                <div className="text">{editUser.card_name}</div>
              </div>
              <div className="infostaff__form-bank-bottom-2">
                <div className="label">Số tài khoản</div>
                <div className="text">{editUser.card_number}</div>
              </div>
              <div className="infostaff__form-bank-bottom-3">
                <div className="label">Ngân hàng</div>
                <div className="text">{editUser.bank}</div>
              </div>
              <div className="infostaff__form-bank-bottom-1">
                <div className="label">Chi nhánh</div>
                <div className="text">{editUser.bank_department}</div>
              </div>
              <div className="infostaff__form-bank-bottom-2">
                <div className="label">Lương cơ bản</div>
                <div className="text">{editUser.basic_salary}</div>
              </div>
              <div className="infostaff__form-bank-bottom-3">
                <div className="label">Ngày công thực tế</div>
                <div className="text">{editUser.work_days}</div>
              </div>

              <div className="infostaff__form-bank-bottom-signature">
                <div className="infostaff__form-bank-bottom-signature-1">
                  <div className="label">Chèn chữ ký *</div>
                  <div className="text">{editUser.bank}</div>
                </div>
                <div className="infostaff__form-bank-bottom-signature-2">
                  <div className="label">Chèn con dấu *</div>
                  <div className="text">{editUser.bank}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
