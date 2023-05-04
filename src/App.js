import { useEffect } from "react";
import "react-quill/dist/quill.core.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainLayout from "./layouts/MainLayout";
import AdministrativeDocument from "./pages/AdministrativeDocument/AdministrativeDocument";
import AdministrativeProfile from "./pages/AdministrativeProfile/AdministrativeProfile";
import AdministrativeRevenue from "./pages/AdministrativeRevenue/AdministrativeRevenue";
import Calendar from "./pages/Calendar/Calendar";
import Director from "./pages/Director/Director";
import Document from "./pages/Document/Document";
import Documentary from "./pages/Documentary";
import GeneralProfile from "./pages/GeneralProfile/GeneralProfile";
import Login from "./pages/Login/Login";
import MissionAdministrative from "./pages/MissionAdministrative/MissionAdministrative";
import MissionProfile from "./pages/MissionProfile/MissionProfile";
import MissionRestore from "./pages/MissionRestore/MissionRestore";
import MissionSynthesis from "./pages/MissionSynthesis/MissionSynthesis";
import OfficialDispatch from "./pages/OfficialDispatch/OfficialDispatch";
import RelicsCreate from "./pages/Relics/components/RelicsCreate/RelicsCreate";
import RelicsDetail from "./pages/Relics/components/RelicsDetail/RelicsDetail";
import RelicsEdit from "./pages/Relics/components/RelicsEdit/RelicsEdit";
import Relics from "./pages/Relics/Relics";
import RestorativeDocument from "./pages/RestorativeDocument/RestorativeDocument";
import RestorativeProfile from "./pages/RestorativeProfile/RestorativeProfile";
import AddStaff from "./pages/Staffs/components/AddStaff/AddStaff";
import EditStaff from "./pages/Staffs/components/EditStaff/EditStaff";
import Staffs from "./pages/Staffs/Staffs";
import InfoStaff from "./pages/Staffs/components/InfoStaff/InfoStaff";
import UserInformation from "./pages/UserInformation";
import { resetState } from "./store/Reducer/usersReducer";
import NotificationDetail from "./pages/NotificationDetail/NotificationDetail";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import SearchAdvanced from "./pages/SearchAdvanced/SearchAdvanced";
import PageNotExist from "pages/404/PageNotExist";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import NewPassword from "components/NewPassword/NewPassword";

function App() {
  const { access } = useSelector((store) => store.users.auth);

  console.log(access);

  return (
    <>
      {!access ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password/:id" element={<NewPassword />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              index
              element={<Navigate to="admin"></Navigate>}
            ></Route>
            <Route path="/admin" element={<MainLayout />}>
              <Route path="me" element={<UserInformation />}></Route>
              <Route
                path=":department/:documentaryId"
                element={<Documentary />}
              ></Route>
              <Route
                path=":department/:documentaryId/:officialDispatchId"
                element={<OfficialDispatch />}
              ></Route>
              <Route path="notification" element={<NotificationPage />} />
              <Route
                path="notificationDetail"
                element={<NotificationDetail />}
              />
              <Route path="staffs" element={<Staffs />}></Route>
              <Route path="infostaff" element={<InfoStaff />}></Route>
              <Route path="addstaff" element={<AddStaff />}></Route>
              <Route path="editstaff" element={<EditStaff />}></Route>
              <Route path="director" element={<Director />}></Route>
              <Route
                path="director/searchAdvanced"
                element={<SearchAdvanced />}
              ></Route>
              <Route path="generalProfile" element={<GeneralProfile />}></Route>
              <Route path="calendar" element={<Calendar />}></Route>
              <Route path="mission">
                <Route path="synthesis" element={<MissionSynthesis />}></Route>
                <Route
                  path="administrative"
                  element={<MissionAdministrative />}
                ></Route>
                <Route path="restore" element={<MissionRestore />}></Route>
                <Route path="profile" element={<MissionProfile />} />
              </Route>
              <Route path="document" element={<Document />}></Route>
              <Route
                path="administrativeDocument"
                element={<AdministrativeDocument />}
              />
              <Route
                path="administrativeProfile"
                element={<AdministrativeProfile />}
              />
              <Route
                path="administrativeRevenue"
                element={<AdministrativeRevenue />}
              />
              <Route
                path="restorativeDocument"
                element={<RestorativeDocument />}
              />
              <Route
                path="restorativeProfile"
                element={<RestorativeProfile />}
              />
              <Route path="relics">
                <Route index element={<Relics />} />
                <Route path="edit" element={<RelicsEdit />} />
                <Route path="detail" element={<RelicsDetail />} />
                <Route path="create" element={<RelicsCreate />} />
              </Route>
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
