import "./UserInformation.scss";
import UserAvatar from "../../assets/imgs/avatar1.png";
import circleCheck from "../../assets/svg/circle_check.svg";
import exclamatory from "../../assets/svg/warning_circle.svg";
import docs from "../../assets/svg/docs.svg";
import clock from "../../assets/svg/Alarm.svg";
import task from "../../assets/svg/Task.svg";
import MonthItem from "../Calendar/components/MonthItem/MonthItem";
import ViewDetail from "../Calendar/components/ViewDetail/ViewDetail";
import { Link, useNavigate } from "react-router-dom";
import NotificationItem from "../../components/NotificationItem/NotificationItem";
export default function UserInformation() {
  const navigate = useNavigate();
  const handleClickViewInforDetails = () => {
    navigate("/admin/editstaff");
  };
  const handleClickViewAllCalendar = () => {
    navigate("/admin/calendar");
  };
  return (
    <div className="user-information">
      <div className="user-information-left">
        <div className="information">
          <div className="userInfoHeader">
            <span className="--title">THÔNG TIN CÁ NHÂN</span>
            <span className="--details" onClick={handleClickViewInforDetails}>
              Chi tiết
            </span>
          </div>
          <div className="information__wrapper">
            <div className="information__wrapper--left">
              <img src={UserAvatar} alt="User Avatar" />
              <h3>Nguyễn Công Anh</h3>
              <span>ID: LHSDT01</span>
            </div>
            <div className="information__wrapper--right">
              <table>
                <tr>
                  <td>Chức vụ:</td>
                  <td>Nhân viên</td>
                </tr>
                <tr>
                  <td>Phòng ban:</td>
                  <td>Lập hồ sơ di tích</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>nguyenconganh@gmail.com</td>
                </tr>
                <tr>
                  <td>Số điện thoại:</td>
                  <td>84 955232133</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="calendar">
          <div className="userInfoHeader">
            <div className="--title">LỊCH CỦA BẠN</div>
            <div className="--details" onClick={handleClickViewAllCalendar}>
              Xem tất cả
            </div>
          </div>
          <MonthItem date={new Date()} />
          <ViewDetail edit={false} />
        </div>
      </div>
      <div className="user-information-right">
        <div className="userInfoHeader">
          <p className="--title">THÔNG BÁO</p>
          <Link to="/admin/notification" className="--details">
            Xem tất cả
          </Link>
        </div>
        <div className="userInfoRightNoti">
          <NotificationItem
            notRead={true}
            svg={
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66797 17.9259L6.40871 13.1852M6.40871 6.07408H20.6309H6.40871ZM20.6309 6.07408L15.8902 1.33334L20.6309 6.07408ZM20.6309 6.07408L15.8902 10.8148L20.6309 6.07408ZM15.8902 17.9259H1.66797H15.8902ZM1.66797 17.9259L6.40871 22.6667L1.66797 17.9259Z"
                  stroke="#A56EF4"
                  stroke-width="2.37037"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            mainColor="rgba(165, 110, 244, 0.15)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
          <NotificationItem
            icon={circleCheck}
            mainColor="rgba(60, 213, 163, 0.15)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
          <NotificationItem
            icon={exclamatory}
            mainColor=" rgba(230, 38, 20, 0.15)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
          <NotificationItem
            icon={clock}
            mainColor=" rgba(26, 154, 255, 0.15)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
          <NotificationItem
            notRead={true}
            icon={docs}
            mainColor="rgba(255, 175, 55, 0.15)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
          <NotificationItem
            icon={task}
            mainColor="rgba(224, 224, 224, 0.4)"
            name="Thông báo chuyển trạng thái của nhiệm vụ"
            time="15 phút trước"
          />
        </div>
      </div>
    </div>
  );
}
