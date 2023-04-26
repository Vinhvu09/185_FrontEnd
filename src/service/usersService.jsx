import { authUserLogin } from "../api/Axios";
import Cookies from "js-cookie";


const usersService = {
  checkUserLogin(data) {
    return new Promise((resolve, reject) => {
      authUserLogin("users/auth/login", data).then((res) => {
        if(!res){
          return reject("Không thể kết nối đến server");

        }
        else if (res.non_field_errors) {
          return reject("Tài khoản hoặc mật khẩu không đúng");
        } else {
          const { access,refresh } = res;
          const {user_code,password}=data;
          Cookies.set("refresh", refresh, {
            expires: 7,
          });
          return resolve({access,refresh,user_code,password});
        }
      });
    });
  },

};

export default usersService;
