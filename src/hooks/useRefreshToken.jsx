import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAxios } from "../api/Axios";
import { setAuth } from "../store/Reducer/usersReducer";



const useRefreshToken=()=>{
    const {auth}=useSelector(store=>store.users);
    const dispatch=useDispatch();
    const refresh= async()=>{
        const postData={}
        postData.refresh=auth.refresh
        const response=axios.post("users/auth/token/refresh",postData);

        const {access}= response;
        auth.access=access;
        dispatch(setAuth(access));
        return access;  
    }
    return refresh;
}


export default useRefreshToken;