import React from "react";
import { useForm } from "react-hook-form";
import Redirect from "../../../../components/Redirect/Redirect";
import "./AddStaff.scss";
import InputStaff from "../Input/InputStaff/InputStaff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectStaff from "../Input/SelectStaff/SelectStaff";
import { string } from "yup/lib/locale";
import { useState } from "react";
import { provinces } from "../../../../constant/constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataUsers } from "../../../../store/Reducer/usersReducer";
import { postAxios } from "api/Axios";
const redirect = [
  { id: 1, name: "Quản lý tài khoản", path: "/admin/staffs" },
  { id: 2, name: "Hồ sơ nhân viên", path: "/admin/staffs" },
  { id: 3, name: "Tạo mới hồ sơ", path: "/admin/addStaff" },
];
const country = [{ code: 1, name: "Việt Nam" }];
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
const schema = yup.object().shape({
  first_name: yup.string().required("* Họ không được để trống"),
  last_name: yup.string().required("* Tên không được để trống"),
  email: yup.string().required("* Email không được để trống"),
  role: yup.string().required("* Chức vụ không được để trống"),
  position: yup.string().required("* Bộ phận không được để trống"),
  department: yup.string().required("* Chi nhánh không được để trống"),
  card_name: yup.string().required("* Tên chủ thẻ không được để trống"),
  card_number: yup.number().typeError("* Dữ liệu phải là kiểu số"),
  bank: yup.string().required("* Ngân hàng không được để trống"),
  bank_department: yup
    .string()
    .required("* Chi nhánh ngân hàng không được để trống"),
  basic_salary: yup.number().typeError("* Dữ liệu phải là kiểu số"),
  work_days: yup.number().typeError("* Dữ liệu phải là kiểu số"),
  stamp: yup
    .mixed()
    .test("required", "* Con dấu không được để trống", (files) => {
      if (files.length > 0) {
        return true;
      }
      return false;
    }),
  signature: yup
    .mixed()
    .test("required", "* Chữ kí không được để trống", (files) => {
      if (files.length > 0) {
        return true;
      }
      return false;
    }),
});

export default function AddStaff() {
  const [avatar, setAvatar] = useState("");
  const [signature, setSignature] = useState("");
  const [stamp, setStamp] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const { data: staffs } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  const onSubmit = (data) => {
    const id = `HCTH` + (staffs?.length + 1) * 1;
    const date = formatDate(new Date());
    let newStaffs = staffs;
    const dataAdd = {
      ...data,
      signature: signature,
      avatar: avatar,
      stamp: stamp,
      id: id,
      date_create: date,
      state: true,
      basic_salary: data.basic_salary.toString(),
      card_number: data.card_number.toString(),
      work_days: data.work_days.toString(),
    };
    newStaffs = [...newStaffs, dataAdd];
    postAxios("http://127.0.0.1:4000/api/v1/staff", dataAdd).then((res) => {
      if (res.status === "Fail") return;
      navigate("/admin/staffs");
    });
    // dispatch(setDataUsers(newStaffs));
  };

  const onChangePicture = (e) => {
    if (e.target.getAttribute("id") === "avatar") {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.getAttribute("id") === "signature") {
      setSignature(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.getAttribute("id") === "stamp") {
      setStamp(URL.createObjectURL(e.target.files[0]));
    }
    return e.target.files[0];
  };

  useEffect(() => {
    if (getValues("province")) {
      // setDistricts(provinces.filter(province=>province.code===getValues("province")*1)[0]?.districts);
      const tempDistricts = provinces.filter(
        (province) => province.code === getValues("province") * 1
      )[0]?.districts;
      setDistricts(tempDistricts);
    }
  }, [getValues("province")]);
  useEffect(() => {
    if (getValues("district")) {
      // setDistricts(provinces.filter(province=>province.code===getValues("province")*1)[0]?.districts);
      const tempDistricts = provinces.filter(
        (province) => province.code === getValues("province") * 1
      )[0]?.districts;
      const tempWards = tempDistricts.filter(
        (district) => district.code === getValues("district") * 1
      )[0]?.wards;
      setWards(tempWards);
    }
  }, [getValues("district")]);

  return (
    <div className="addStaffWrapper container-fluid">
      <Redirect data={redirect} />
      <div className="addStaff">
        <h1 className="addStaff__name">Tạo mới hồ sơ</h1>
        <form className="addStaff__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="addStaff__form--top">
            <div className="left">
              <InputStaff
                control={control}
                name="first_name"
                id="first_name"
                label="Họ *"
                width="calc(50% - 20px)"
                placeholder="Nhập họ"
                error={errors?.first_name ? errors?.first_name?.message : ""}
              />
              <InputStaff
                control={control}
                name="last_name"
                id="last_name"
                label="Tên *"
                width="calc(50% - 20px)"
                placeholder="Nhập tên"
                error={errors?.last_name ? errors?.last_name?.message : ""}
              />
              <InputStaff
                control={control}
                name="email"
                id="email"
                label="Email *"
                width="calc(50% - 20px)"
                placeholder="Nhập địa chỉ email"
                error={errors?.email ? errors?.email?.message : ""}
              />
              <InputStaff
                control={control}
                name="phone_number"
                id="phone_number"
                label="Số điện thoại"
                width="calc(50% - 20px)"
                placeholder="Nhập số điện thoại"
              />
              <SelectStaff
                control={control}
                name="country"
                id="country"
                label="Quốc gia"
                placeholder="Chọn quốc gia"
                data={country}
                width="calc(50% - 20px)"
              />
              <SelectStaff
                control={control}
                name="province"
                id="province"
                label="Tỉnh/Thành phố"
                placeholder="Chọn tỉnh thành phố"
                watchPreviousInput={!watch("country")}
                data={provinces}
                width="calc(50% - 20px)"
              />
              <SelectStaff
                control={control}
                name="district"
                id="district"
                label="Quận/Huyện"
                placeholder="Chọn quận huyện"
                data={districts ? districts : []}
                watchPreviousInput={!watch("province")}
                width="calc(50% - 20px)"
              />
              <SelectStaff
                control={control}
                name="ward"
                id="ward"
                label="Phường/Xã"
                placeholder="Chọn phường xã"
                watchPreviousInput={!watch("district")}
                data={wards ? wards : []}
                width="calc(50% - 20px)"
              />
            </div>
            <div className="right">
              <div className="inputImage">
                <span className="inputImage__label">Hình đại diện</span>
                <div className="inputImage__image">
                  {avatar && (
                    <div
                      className="inputImage__image--avatar"
                      style={{
                        backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%), url(${avatar})`,
                      }}
                    ></div>
                  )}
                  <div className="inputImage__image--placeHolder">
                    <svg
                      width="48"
                      height="38"
                      viewBox="0 0 48 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M46.403 5.99531C45.4449 4.9915 44.1217 4.39835 42.616 4.39835H35.0418V4.30709C35.0418 3.16641 34.5856 2.07135 33.8099 1.34131C33.0342 0.565649 31.9848 0.109375 30.8441 0.109375H17.1559C15.9696 0.109375 14.9202 0.565649 14.1445 1.34131C13.3688 2.11698 12.9125 3.16641 12.9125 4.30709V4.39835H5.38403C3.87833 4.39835 2.55513 4.9915 1.59696 5.99531C0.638783 6.95348 0 8.3223 0 9.78238V32.5048C0 34.0105 0.593156 35.3337 1.59696 36.2919C2.55513 37.2501 3.92395 37.8888 5.38403 37.8888H42.616C44.1217 37.8888 45.4449 37.2957 46.403 36.2919C47.3612 35.3337 48 33.9649 48 32.5048V9.78238C48 8.27668 47.4068 6.95348 46.403 5.99531ZM45.6274 32.5048H45.5817C45.5817 33.3261 45.2624 34.0561 44.7148 34.6037C44.1673 35.1512 43.4373 35.4706 42.616 35.4706H5.38403C4.56274 35.4706 3.8327 35.1512 3.28517 34.6037C2.73764 34.0561 2.41825 33.3261 2.41825 32.5048V9.78238C2.41825 8.96109 2.73764 8.23105 3.28517 7.68352C3.8327 7.13599 4.56274 6.8166 5.38403 6.8166H14.1901C14.8745 6.8166 15.4221 6.26907 15.4221 5.58466V4.26147C15.4221 3.75957 15.6046 3.30329 15.924 2.9839C16.2433 2.66451 16.6996 2.482 17.2015 2.482H30.8441C31.346 2.482 31.8023 2.66451 32.1217 2.9839C32.4411 3.30329 32.6236 3.75957 32.6236 4.26147V5.58466C32.6236 6.26907 33.1711 6.8166 33.8555 6.8166H42.6616C43.4829 6.8166 44.2129 7.13599 44.7605 7.68352C45.308 8.23105 45.6274 8.96109 45.6274 9.78238V32.5048Z"
                        fill={`${avatar ? "#FFFFFF" : "#1A48E9"}`}
                      />
                      <path
                        d="M23.9997 9.91992C20.8971 9.91992 18.0682 11.1975 16.0606 13.2051C14.0073 15.2583 12.7754 18.0416 12.7754 21.1443C12.7754 24.2469 14.053 27.0758 16.0606 29.0834C18.1138 31.1367 20.8971 32.3686 23.9997 32.3686C27.1024 32.3686 29.9313 31.091 31.9389 29.0834C33.9921 27.0302 35.2241 24.2469 35.2241 21.1443C35.2241 18.0416 33.9465 15.2127 31.9389 13.2051C29.9313 11.1975 27.1024 9.91992 23.9997 9.91992ZM30.205 27.3952C28.6081 28.9465 26.418 29.9503 23.9997 29.9503C21.5815 29.9503 19.3914 28.9465 17.7944 27.3952C16.1974 25.7982 15.2393 23.6081 15.2393 21.1899C15.2393 18.7716 16.2431 16.5815 17.7944 14.9846C19.3914 13.3876 21.5815 12.4294 23.9997 12.4294C26.418 12.4294 28.6081 13.4332 30.205 14.9846C31.802 16.5815 32.7602 18.7716 32.7602 21.1899C32.8058 23.6081 31.802 25.7982 30.205 27.3952Z"
                        fill={`${avatar ? "#FFFFFF" : "#1A48E9"}`}
                      />
                      <path
                        d="M40.2436 14.3445C41.4783 14.3445 42.4793 13.3436 42.4793 12.1088C42.4793 10.874 41.4783 9.87305 40.2436 9.87305C39.0088 9.87305 38.0078 10.874 38.0078 12.1088C38.0078 13.3436 39.0088 14.3445 40.2436 14.3445Z"
                        fill={`${avatar ? "#FFFFFF" : "#1A48E9"}`}
                      />
                    </svg>
                    <span
                      style={{ color: `${avatar ? "#D8D8D8" : "#989898"}` }}
                    >
                      Chọn ảnh để tải lên
                    </span>
                  </div>
                  <input
                    type="file"
                    {...register("avatar")}
                    accept="image/*"
                    onChange={onChangePicture}
                    id="avatar"
                    className="inputImage__image--input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="addStaff__form--center">
            <div className="top">
              <InputStaff
                control={control}
                name="address"
                id="address"
                label="Địa chỉ"
                width="calc(65%)"
                placeholder="Nhập địa chỉ"
              />
              <InputStaff
                control={control}
                name="code"
                id="code"
                label="Mã số"
                width="calc(32.5% - 20px)"
                placeholder="Nhập mã số"
              />
            </div>
            <div className="bottom">
              <SelectStaff
                control={control}
                name="department"
                data={departments}
                id="department"
                label="Chi nhánh *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập vị trí khu vực làm việc"
                error={errors?.department ? errors?.department?.message : ""}
              />
              <SelectStaff
                control={control}
                name="position"
                id="position"
                label="Bộ phận *"
                data={positions}
                width="calc(32.5% - 20px)"
                placeholder="Chọn bộ phận"
                error={errors?.position ? errors?.position?.message : ""}
              />
              <SelectStaff
                control={control}
                name="role"
                id="role"
                label="Chức vụ *"
                data={roles}
                width="calc(32.5% - 20px)"
                placeholder="Chọn chức vụ"
                error={errors?.role ? errors?.role?.message : ""}
              />
            </div>
          </div>
          <div className="addStaff__form--bottom">
            <span className="title">Thông tin thanh toán</span>
            <div className="formPayment">
              <InputStaff
                control={control}
                name="card_name"
                id="card_name"
                label="Tên chủ thẻ *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập tên chủ thẻ"
                error={errors?.card_name ? errors?.card_name?.message : ""}
              />
              <InputStaff
                control={control}
                name="card_number"
                id="card_number"
                label="Số tài khoản *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập số tài khoản"
                error={errors?.card_number ? errors?.card_number?.message : ""}
              />
              <InputStaff
                control={control}
                name="bank"
                id="bank"
                label="Ngân hàng *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập tên ngân hàng"
                error={errors?.bank ? errors?.bank?.message : ""}
              />

              <InputStaff
                control={control}
                name="bank_department"
                id="bank_department"
                label="Chi nhánh *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập tên chi nhánh"
                error={
                  errors?.bank_department
                    ? errors?.bank_department?.message
                    : ""
                }
              />
              <InputStaff
                control={control}
                name="basic_salary"
                id="basic_salary"
                format="salary"
                label="Lương cơ bản *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập lương cơ bản"
                error={
                  errors?.basic_salary ? errors?.basic_salary?.message : ""
                }
              />

              <InputStaff
                control={control}
                name="work_days"
                id="work_days"
                label="Ngày công thực tế *"
                width="calc(32.5% - 20px)"
                placeholder="Nhập ngày công thực tế"
                error={errors?.work_days ? errors?.work_days?.message : ""}
              />

              <div className="inputImage">
                <span className="inputImage__label">Chèn chữ ký *</span>
                <div
                  className="inputImage__image"
                  style={{
                    border: `${signature ? `none` : `1px dashed #d0d0d0`}`,
                  }}
                >
                  {signature && (
                    <div
                      className="inputImage__image--avatar"
                      style={{
                        backgroundImage: `url(${signature})`,
                        width: `${signature ? `120px` : `calc(32.5% - 20px)`}`,
                      }}
                    ></div>
                  )}
                  {!signature && (
                    <div className="inputImage__image--placeHolder">
                      <svg
                        width="29"
                        height="28"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 9.60931V14.0214M14.5 14.0214V18.4335M14.5 14.0214H18.875M14.5 14.0214H10.125M27.625 14.0214C27.625 15.7596 27.2855 17.4808 26.6259 19.0867C25.9663 20.6926 24.9995 22.1517 23.7808 23.3808C22.562 24.6099 21.1151 25.5849 19.5227 26.2501C17.9303 26.9153 16.2236 27.2576 14.5 27.2576C12.7764 27.2576 11.0697 26.9153 9.47728 26.2501C7.88488 25.5849 6.43799 24.6099 5.21922 23.3808C4.00045 22.1517 3.03367 20.6926 2.37408 19.0867C1.71449 17.4808 1.375 15.7596 1.375 14.0214C1.375 10.5109 2.75781 7.14423 5.21922 4.66196C7.68064 2.17968 11.019 0.785156 14.5 0.785156C17.981 0.785156 21.3194 2.17968 23.7808 4.66196C26.2422 7.14423 27.625 10.5109 27.625 14.0214Z"
                          stroke="#BDBDBD"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span>Chèn chữ ký</span>
                    </div>
                  )}

                  <input
                    type="file"
                    {...register("signature")}
                    accept="image/*"
                    id="signature"
                    onChange={onChangePicture}
                    className="inputImage__image--input"
                  />
                </div>
                <span className="inputImage__image--error">
                  {errors.signature ? errors.signature.message : ""}
                </span>
              </div>

              <div className="inputImage">
                <span className="inputImage__label">Chèn con dấu *</span>
                <div
                  className="inputImage__image"
                  style={{ border: `${stamp ? `none` : `1px dashed #d0d0d0`}` }}
                >
                  {stamp && (
                    <div
                      className="inputImage__image--avatar"
                      style={{
                        backgroundImage: `url(${stamp})`,
                        width: `${stamp ? `120px` : `calc(32.5% - 20px)`}`,
                      }}
                    ></div>
                  )}
                  {!stamp && (
                    <div className="inputImage__image--placeHolder">
                      <svg
                        width="29"
                        height="28"
                        viewBox="0 0 29 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 9.60931V14.0214M14.5 14.0214V18.4335M14.5 14.0214H18.875M14.5 14.0214H10.125M27.625 14.0214C27.625 15.7596 27.2855 17.4808 26.6259 19.0867C25.9663 20.6926 24.9995 22.1517 23.7808 23.3808C22.562 24.6099 21.1151 25.5849 19.5227 26.2501C17.9303 26.9153 16.2236 27.2576 14.5 27.2576C12.7764 27.2576 11.0697 26.9153 9.47728 26.2501C7.88488 25.5849 6.43799 24.6099 5.21922 23.3808C4.00045 22.1517 3.03367 20.6926 2.37408 19.0867C1.71449 17.4808 1.375 15.7596 1.375 14.0214C1.375 10.5109 2.75781 7.14423 5.21922 4.66196C7.68064 2.17968 11.019 0.785156 14.5 0.785156C17.981 0.785156 21.3194 2.17968 23.7808 4.66196C26.2422 7.14423 27.625 10.5109 27.625 14.0214Z"
                          stroke="#BDBDBD"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span>Chèn con dấu</span>
                    </div>
                  )}

                  <input
                    type="file"
                    {...register("stamp")}
                    accept="image/*"
                    id="stamp"
                    name="stamp"
                    onChange={onChangePicture}
                    className="inputImage__image--input"
                  />
                </div>
                <span className="inputImage__image--error">
                  {errors.stamp ? errors.stamp.message : ""}
                </span>
              </div>
              <div className="tempSpace"></div>
            </div>
          </div>
          <div className="addStaff__form--groupButton">
            <button className="submitButton" type="submit">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
