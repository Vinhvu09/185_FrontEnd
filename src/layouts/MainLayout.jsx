import { getAxios } from "api/Axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { setProfile } from "store/Reducer/usersReducer";
import Header from "../components/Header/Header";
import MainNav from "../components/MainNav/MainNav";
import "./MainLayout.scss";
export default function MainLayout() {
  let param = useLocation();
  const { access } = useSelector((store) => store.users.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getAxios("/auth/profile").then((res) => {
      if (res.status === "success") {
        dispatch(setProfile(res.data));
      }
    });
  }, []);

  if (param.pathname === "/admin") return <Navigate to="/admin/staffs" />;

  return (
    <>
      <div style={{ backgroundColor: "#fafafa" }}>
        <Header />
        <div className="outlet main-wrapper">
          <MainNav />
          <div className="outlet__item">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
