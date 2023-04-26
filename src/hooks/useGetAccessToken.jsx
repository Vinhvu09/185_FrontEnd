import { useSelector } from "react-redux"



const useGetAccessToken=()=>{
    const {auth}=useSelector(store=>store.users);
    return auth.access;
}


export default useGetAccessToken;