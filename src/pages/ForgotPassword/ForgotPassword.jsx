import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import forgotBackgroundImage from "assets/imgs/login_bg.png";
import InputLogin from "../../components/Input/InputLogin/InputLogin";
import { setLoginError } from "store/Reducer/usersReducer";
import NewPassword from "components/NewPassword/NewPassword";
import readEmail from "assets/svg/read-email.svg";
import "./ForgotPassword.scss";
import { patchAxios } from "api/Axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email(
      "Địa chỉ email không hợp lệ, thử lại theo định dạng “@abc.com” và không có khoảng trắng."
    )
    .required("*Vui lòng nhập địa chỉ email"),
});

export default function ForgotPassword() {
  const { loginError } = useSelector((store) => store.users);
  const [isEmail, setIsEmail] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const resetError = () => {
    dispatch(setLoginError(""));
  };

  const onSubmit = ({ email }) => {
    console.log(email);
    patchAxios("/auth/forgot-password", { email }).then((res) => {
      if (res.status === "error") {
        return dispatch(
          setLoginError("Địa chỉ email không tồn tại, xin vui lòng thử lại.")
        );
      }
      setIsEmail({ email: res.message });
      resetError();
    });
  };

  return (
    <div className="forgot">
      <div className="forgot__left">
        <img src={forgotBackgroundImage} alt="" />
      </div>
      <div className="forgot__right">
        {!isEmail ? (
          <div className="forgot__right-box">
            <div className="forgot__right-title">
              <h1>Quên mật khẩu</h1>
              <p style={{ textAlign: "justify" }}>
                Vui lòng nhập địa chỉ email của bạn để tiếp tục lấy lại mật
                khẩu.
              </p>
            </div>

            <form
              className="forgot__right-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="forgot__right-form-email">
                <InputLogin
                  placeholder="Nhập địa chỉ email"
                  control={control}
                  name="email"
                  id="email"
                  type="email"
                  title="Email"
                  width="100%"
                  error={errors.email ? errors.email.message : ""}
                />
                {loginError && (
                  <div className="error">
                    <span>{loginError}</span>
                  </div>
                )}
              </div>

              <button className="forgot__right-form-btn">Tiếp tục</button>
            </form>

            <div style={{ textAlign: "center" }}>
              <Link to={"/"}>Quay lại</Link>
            </div>
          </div>
        ) : (
          <div className="forgot__right-box">
            <div className="forgot__right-title">
              <h1>Xác nhận</h1>
              <p style={{ textAlign: "justify" }}>
                Hệ thống đã gửi thông tin khôi phục mật khẩu đến địa chỉ email
                {isEmail?.email} của bạn.
              </p>

              <p style={{ textAlign: "justify" }}>
                Vui lòng kiểm tra hòm thư để hoàn thành.
              </p>
            </div>

            <div className="forgot__right-img">
              <img src={readEmail} width="80px" height="80px" alt="readEmail" />
            </div>

            <button
              className="forgot__right-form-btn-done"
              onClick={() => {
                navigate("/login");
              }}
              style={{ width: "100%" }}
            >
              Hoàn thành
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
