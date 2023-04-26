import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getRefreshToken, postAxios } from "../../api/Axios";
import loginBackgroundImage from "../../assets/imgs/login_bg.png";
import InputLogin from "../../components/Input/InputLogin/InputLogin";
import {
  getAuthStart,
  setAuth,
  setLoginError,
} from "../../store/Reducer/usersReducer";
import "./Login.scss";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  user_code: yup.string().required("* Mã số là bắt buộc"),
  password: yup.string().required("* Mật khẩu là bắt buộc"),
});
export default function Login() {
  const { loginError } = useSelector((store) => store.users);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  // const getSaveCode = Cookies.get("saveCode");
  // const getSavePassword = Cookies.get("savePassword");
  const onSubmit = (data) => {
    // dispatch(getAuthStart(data))
    postAxios("/auth/login", data).then((res) => {
      if (res.status === "error") {
        return dispatch(setLoginError("Tài khoản hoặc mật khẩu không đúng"));
      }

      dispatch(setAuth({ access: res.token }));
      // if (rememberMe) {
      //   Cookies.set("saveCode", data.user_code, {
      //     expires: 1,
      //   });
      //   Cookies.set("savePassword", data.password, {
      //     expires: 1,
      //   });
      // }
    });
  };

  useEffect(() => {
    // if (getSaveCode && getSavePassword) {
    //   setValue("user_code", getSaveCode);
    //   setValue("password", getSavePassword);
    //   setRememberMe(true);
    // }
  }, []);

  // useLayoutEffect(() => {
  //   if (!auth?.access) {
  //     if (Cookies.get("refresh")) {
  //       getRefreshToken();
  //     }
  //   }
  // }, []);
  return (
    <div className="login">
      <div className="login__left">
        <img src={loginBackgroundImage} alt="" />
      </div>
      <div className="login__right">
        <span className="login__right--title">
          <p>Đăng nhập</p>
        </span>
        <form className="login__right--form" onSubmit={handleSubmit(onSubmit)}>
          <InputLogin
            placeholder="Nhập mã số của bạn"
            control={control}
            name="user_code"
            id="user_code"
            type="text"
            title="Mã số"
            width="100%"
            error={errors.user_code ? errors.user_code.message : ""}
            autoComplete="off"
          />

          <InputLogin
            placeholder="Nhập mật khẩu của bạn"
            control={control}
            name="password"
            id="password"
            type="password"
            eye={true}
            title="Mật khẩu"
            width="100%"
            error={errors.password ? errors.password.message : ""}
            autoComplete="off"
          />

          <div className="login__right--mode">
            <div className="login__right--mode-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login__right--mode-checkbox"
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                id="rememberMe"
              />
              <label htmlFor="rememberMe" style={{ cursor: "pointer" }}>
                {" "}
                Ghi nhớ mật khẩu
              </label>
            </div>
            <Link className="login__right--mode-forgot" to={"/forgot-password"}>
              Quên mật khẩu
            </Link>
          </div>

          {loginError && (
            <div className="error">
              <span>{loginError}</span>
            </div>
          )}
          <button className="btn-login">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
