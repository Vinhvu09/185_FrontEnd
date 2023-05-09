import { yupResolver } from "@hookform/resolvers/yup";
import { patchAxios } from "api/Axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import Swal from "sweetalert2";
import * as yup from "yup";

import Redirect from "../../../../components/Redirect/Redirect";
import { provinces } from "../../../../constant/constant";
import { setDataUsers } from "../../../../store/Reducer/usersReducer";
import InputStaff from "../Input/InputStaff/InputStaff";
import InputSwitch from "../Input/InputSwitch/InputSwitch";
import SelectStaff from "../Input/SelectStaff/SelectStaff";
import "./EditStaff.scss";

const country = [{ code: "1", name: "Việt Nam" }];
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

export default function EditStaff() {
  const location = useLocation();
  const [editMeStart, setEditMeStart] = useState(false);
  let editMe;
  if (location?.state) {
    editMe = location?.state?.editMe;
  }
  let redirect;
  if (editMe) {
    if (editMeStart) {
      redirect = [
        { id: 1, name: "Thông tin cá nhân chi tiết" },
        { id: 2, name: "Chỉnh sửa thông tin" },
      ];
    } else {
      redirect = [{ id: 1, name: "Thông tin cá nhân chi tiết" }];
    }
  } else {
    redirect = [
      { id: 1, name: "Quản lý tài khoản", path: "/admin/staffs" },
      { id: 2, name: "Hồ sơ nhân viên", path: "/admin/staffs" },
      { id: 3, name: "Chỉnh sửa thông tin", path: "/admin/editstaff" },
    ];
  }

  const [avatar, setAvatar] = useState("");
  const [statusStaff, setStatusStaff] = useState(null);
  const [signature, setSignature] = useState("");
  const [stamp, setStamp] = useState("");
  const { editUser, data: staffs } = useSelector((store) => store.users);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const newStaffs = staffs.map((staff) => {
      if (staff.id === editUser.id) {
        dispatch(setDataUsers(newStaffs));
        return { ...data, id: editUser.id };
      } else {
        return staff;
      }
    });

    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    form.set("avatar", avatar);
    form.set("signature", signature);
    form.set("stamp", stamp);
    patchAxios("/staff/" + editUser.id, form).then((res) => {
      if (res.status === "success") {
        if (editMe) {
          navigate("/admin/me");
        } else navigate("/admin/staffs");
      }
    });
  };
  const onChangePicture = (e) => {
    if (e.target.getAttribute("id") === "avatar") {
      setAvatar(e.target.files[0]);
    }
    if (e.target.getAttribute("id") === "signature") {
      setSignature(e.target.files[0]);
    }
    if (e.target.getAttribute("id") === "stamp") {
      setStamp(e.target.files[0]);
    }
    return e.target.files[0];
  };
  function resetForm() {
    if (editUser) {
      const { avatar, signature, stamp, ...resetData } = editUser;
      console.log(resetData);
      reset(resetData);
      setValue("avatar", avatar);
      setAvatar(avatar);
      setValue("signature", signature);
      setSignature(signature);
      setValue("stamp", stamp);
      setStamp(stamp);
    }
  }
  useEffect(() => {
    resetForm();
  }, []);

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
  const handleClickDeleteUser = () => {
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

  useEffect(() => {
    if (getValues("province")) {
      const tempDistricts = provinces.filter(
        (province) => province.code === getValues("province") * 1
      )[0]?.districts;
      setDistricts(tempDistricts);
    }
  }, [getValues("province")]);

  useEffect(() => {
    if (getValues("district")) {
      const tempDistricts = provinces.filter(
        (province) => province.code === getValues("province") * 1
      )[0]?.districts;
      const tempWards = tempDistricts.filter(
        (district) => district.code === getValues("district") * 1
      )[0]?.wards;
      setWards(tempWards);
    }
  }, [getValues("district")]);

  const handleClickEditMe = () => {
    setEditMeStart(true);
  };
  return (
    <div className="editStaffWrapper ">
      <Redirect data={redirect} />
      <div className="editStaff">
        <h1 className="editStaff__name">Chỉnh sửa thông tin</h1>
        <form className="editStaff__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="editStaff__form--top">
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
                placeholder="Chọn tỉnh/thành phố"
                watchPreviousInput={!watch("country")}
                data={provinces}
                width="calc(50% - 20px)"
              />
              <SelectStaff
                control={control}
                name="district"
                id="district"
                label="Quận/Huyện"
                placeholder="Chọn quận/huyện"
                watchPreviousInput={!watch("province")}
                data={districts ? districts : []}
                width="calc(50% - 20px)"
              />
              <SelectStaff
                control={control}
                name="ward"
                id="ward"
                label="Phường/Xã"
                placeholder="Chọn phường/xã"
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
                        backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%), url(${
                          avatar instanceof File
                            ? URL.createObjectURL(avatar)
                            : "http://127.0.0.1:4000/" + avatar
                        })`,
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
          <div className="editStaff__form--center">
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
            <div>
              <InputSwitch
                control={control}
                name="isActivate"
                id="isActivate"
                label="Trạng thái"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#EAEBED",
                margin: "32px 0px 16px 0px",
              }}
            ></div>
            <div className="bottom">
              <SelectStaff
                control={control}
                name="department"
                data={departments}
                id="department"
                label="Chi nhánh *"
                width="calc(32.5% - 20px)"
                placeholder="Chọn chi nhánh"
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
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#EAEBED",
              margin: "32px 0px 16px 0px",
            }}
          ></div>
          <div className="editStaff__form--bottom">
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
                        backgroundImage: `url(http://127.0.0.1:4000/${signature})`,
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
                        backgroundImage: `url(http://127.0.0.1:4000/${stamp})`,
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
          <div className="editStaff__form--groupButton">
            {(!editMe || (editMeStart && editMe)) && (
              <>
                {" "}
                <div className="deleteButton" onClick={handleClickDeleteUser}>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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

                  <span className="deleteButton__text">Xoá người dùng</span>
                </div>
                <button className="submitButton" type="submit">
                  Lưu
                </button>{" "}
              </>
            )}
            {editMe && !editMeStart && (
              <button
                className="submitButton"
                type="button"
                style={{ marginLeft: "auto" }}
                onClick={handleClickEditMe}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
