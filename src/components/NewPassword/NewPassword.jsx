import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputLogin from "../../components/Input/InputLogin/InputLogin";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import forgotBackgroundImage from "assets/imgs/login_bg.png";
import Swal from "sweetalert2";
import { patchAxios } from "api/Axios";

const schema = yup.object().shape({
  passwordNew: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("*Vui lòng nhập mật khẩu"),
  passwordAgain: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .oneOf([yup.ref("passwordNew"), null], "Mật khẩu ko giống trên"),
});

const NewPassword = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { loginError, data } = useSelector((store) => store.users);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = ({ passwordNew, passwordAgain }) => {
    patchAxios(`/auth/reset-password/${params.id}`, {
      password: passwordNew,
      confirmPassword: passwordAgain,
    }).then((res) => {
      if (res.status === "success") {
        navigate("/");
      }
    });
  };

  return (
    <div className="forgot">
      <div className="forgot__left">
        <img src={forgotBackgroundImage} alt="" />
      </div>
      <div className="forgot__right">
        <div className="forgot__right-box">
          <div className="forgot__right-title">
            <h1>Mật khẩu mới</h1>
          </div>

          <form
            className="forgot__right-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="forgot__right-form-input">
              <div style={{ marginBottom: "24px" }}>
                <InputLogin
                  placeholder="Nhập mật khẩu mới"
                  control={control}
                  name="passwordNew"
                  id="passwordNew"
                  type="password"
                  title="Mật khẩu mới"
                  width="100%"
                  eye={true}
                  error={errors.passwordNew ? errors.passwordNew.message : ""}
                />
              </div>

              <div>
                <InputLogin
                  placeholder="Nhập lại mật khẩu"
                  control={control}
                  name="passwordAgain"
                  id="passwordAgain"
                  type="password"
                  title="Xác nhận mật khẩu"
                  width="100%"
                  eye={true}
                  error={
                    errors.passwordAgain ? errors.passwordAgain.message : ""
                  }
                />
              </div>
            </div>

            <button className="forgot__right-form-btn">Xác nhận</button>
          </form>

          {loginError && (
            <div className="error">
              <span>{loginError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
