import React, { useEffect } from "react";
import "./Header.scss";
import logo from "../../assets/imgs/logo.png";
import avatar from "../../assets/imgs/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../store/Reducer/usersReducer";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxios } from "../../api/Axios";
import { getDepartmentUserStart } from "../../store/Reducer/departmentReducer";
import returnIcon from "../../assets/svg/back&go.svg";
import circleCheck from "../../assets/svg/circle_check.svg";
import exclamatory from "../../assets/svg/warning_circle.svg";
import docs from "../../assets/svg/docs.svg";
import clock from "../../assets/svg/Alarm.svg";
import task from "../../assets/svg/Task.svg";

import { useState } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";

const roles = [
  { code: 1, name: "Super Admin" },
  { code: 2, name: "Nhân viên" },
];
export default function Header() {
  const { profile } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowNoti, setIsShowNoti] = useState(false);
  const [isRealAll, setIsReadAll] = useState(false);
  const [readEvery, setReadEvery] = useState(false);
  const [numberNoti, setNumberNoti] = useState(2);
  const [isFull, setIsFull] = useState(true);
  const handleReadAll = (e) => {
    e.stopPropagation();
    setReadEvery(true);
    setIsReadAll(true);
    setNumberNoti(0);
  };

  const handleSignOut = () => {
    getAxios("/auth/logout").then((res) => {
      if (res.status === "success") {
        dispatch(resetState());
        Cookies.remove("refresh");
        Cookies.remove("savePassword");
        Cookies.remove("saveCode");
      }
      navigate("/");
    });
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsShowNoti(false);
    });
    return () => {
      window.removeEventListener("click", () => {
        setIsShowNoti(false);
      });
    };
  }, []);

  return (
    <div className="header">
      <div className="main-wrapper">
        <div className="header__left">
          <Link to="/admin">
            <div className="header__left--logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          <span className="header__left--name">
            TRUNG TÂM BẢO TỒN VÀ PHÁT HUY GIÁ TRỊ LỊCH SỬ <br />
            VĂN HÓA HỒ CHÍ MINH
          </span>
        </div>
        <div className="header__right">
          <div
            className="header__right--icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowNoti((prev) => !prev);
            }}
          >
            {isShowNoti && (
              <div
                className="headerNotification"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="notificationGeneral --bell">
                  <div className="notificationGeneral__head">
                    <p>Thông báo</p>
                    <Link
                      to="/admin/notification"
                      onClick={() => setIsShowNoti(false)}
                    >
                      Xem tất cả
                    </Link>
                  </div>
                  <div className="notificationGeneral__tab">
                    <div className="left">
                      <div
                        className={`tabItem ${isFull && "active"}`}
                        onClick={() => setIsFull(true)}
                      >
                        <p>Tất cả</p>
                      </div>
                      <div
                        className={`tabItem ${!isFull && "active"}`}
                        onClick={() => setIsFull(false)}
                      >
                        <p>Chưa đọc</p>
                      </div>
                    </div>
                    <div className="right">
                      <div
                        className={`readGroup ${isRealAll && "active"}`}
                        onClick={handleReadAll}
                      >
                        <svg
                          width="19"
                          height="10"
                          viewBox="0 0 19 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.456 0.454973C10.6673 0.253806 10.9485 0.142593 11.2402 0.144801C11.5319 0.147008 11.8114 0.262464 12.0196 0.466805C12.2279 0.671145 12.3486 0.948389 12.3563 1.24003C12.364 1.53168 12.2581 1.81491 12.061 2.02997L6.07597 9.51497C5.97305 9.62582 5.84885 9.71478 5.71077 9.77652C5.57269 9.83827 5.42357 9.87154 5.27235 9.87434C5.12112 9.87714 4.97087 9.84941 4.8306 9.79282C4.69033 9.73623 4.56292 9.65193 4.45597 9.54497L0.486968 5.57597C0.376438 5.47298 0.287785 5.34878 0.226297 5.21078C0.164809 5.07278 0.131747 4.92381 0.129081 4.77276C0.126416 4.6217 0.154203 4.47166 0.210785 4.33158C0.267366 4.19149 0.351583 4.06424 0.458411 3.95742C0.565239 3.85059 0.69249 3.76637 0.832572 3.70979C0.972654 3.65321 1.1227 3.62542 1.27375 3.62809C1.42481 3.63075 1.57378 3.66381 1.71178 3.7253C1.84977 3.78679 1.97398 3.87544 2.07697 3.98597L5.21797 7.12547L10.426 0.487973C10.4353 0.476392 10.4453 0.465373 10.456 0.454973ZM9.07597 8.16497L10.456 9.54497C10.5629 9.6517 10.6902 9.7358 10.8303 9.79225C10.9705 9.84871 11.1205 9.87636 11.2716 9.87356C11.4226 9.87076 11.5716 9.83757 11.7095 9.77596C11.8475 9.71435 11.9716 9.62559 12.0745 9.51497L18.0625 2.02997C18.17 1.92378 18.2551 1.79699 18.3126 1.65719C18.3701 1.51738 18.3988 1.36743 18.397 1.21628C18.3952 1.06514 18.363 0.915895 18.3023 0.77747C18.2416 0.639046 18.1536 0.514278 18.0436 0.410617C17.9336 0.306956 17.8038 0.226528 17.662 0.174137C17.5202 0.121746 17.3693 0.0984646 17.2183 0.105685C17.0674 0.112905 16.9194 0.150479 16.7832 0.216161C16.6471 0.281843 16.5256 0.374288 16.426 0.487973L11.2165 7.12547L10.489 6.39647L9.07447 8.16497H9.07597Z"
                            fill="#1A48E9"
                          />
                        </svg>
                        <p>Đánh dấu đã đọc tất cả</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="notificationGeneral__list"
                    closePopup={setIsShowNoti}
                  >
                    {isFull && (
                      <>
                        <NotificationItem
                          closePopup={setIsShowNoti}
                          notRead={!readEvery}
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
                          closePopup={setIsShowNoti}
                          icon={circleCheck}
                          mainColor="rgba(60, 213, 163, 0.15)"
                          name="Thông báo chuyển trạng thái của nhiệm vụ"
                          time="15 phút trước"
                        />
                        <NotificationItem
                          closePopup={setIsShowNoti}
                          icon={exclamatory}
                          mainColor=" rgba(230, 38, 20, 0.15)"
                          name="Thông báo chuyển trạng thái của nhiệm vụ"
                          time="15 phút trước"
                        />
                        <NotificationItem
                          closePopup={setIsShowNoti}
                          icon={clock}
                          mainColor=" rgba(26, 154, 255, 0.15)"
                          name="Thông báo chuyển trạng thái của nhiệm vụ"
                          time="15 phút trước"
                        />
                        <NotificationItem
                          closePopup={setIsShowNoti}
                          notRead={!readEvery}
                          icon={docs}
                          mainColor="rgba(255, 175, 55, 0.15)"
                          name="Thông báo chuyển trạng thái của nhiệm vụ"
                          time="15 phút trước"
                        />
                        <NotificationItem
                          closePopup={setIsShowNoti}
                          icon={task}
                          mainColor="rgba(224, 224, 224, 0.4)"
                          name="Thông báo chuyển trạng thái của nhiệm vụ"
                          time="15 phút trước"
                        />
                      </>
                    )}
                    {!isFull &&
                      (!readEvery ? (
                        <>
                          <NotificationItem
                            closePopup={setIsShowNoti}
                            notRead={!readEvery}
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
                            closePopup={setIsShowNoti}
                            notRead={!readEvery}
                            icon={docs}
                            mainColor="rgba(255, 175, 55, 0.15)"
                            name="Thông báo chuyển trạng thái của nhiệm vụ"
                            time="15 phút trước"
                          />
                        </>
                      ) : (
                        <div className="emptyBell">
                          <div className="img">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.5303 14.4697L19.5 12.4395V9.75C19.4977 7.89138 18.8063 6.09964 17.5595 4.72124C16.3127 3.34284 14.5991 2.4757 12.75 2.2875V0.75H11.25V2.2875C9.40093 2.4757 7.68732 3.34284 6.44053 4.72124C5.19373 6.09964 4.50233 7.89138 4.5 9.75V12.4395L2.46975 14.4697C2.32909 14.6104 2.25004 14.8011 2.25 15V17.25C2.25 17.4489 2.32902 17.6397 2.46967 17.7803C2.61032 17.921 2.80109 18 3 18H8.25V18.5828C8.23369 19.5342 8.56905 20.4583 9.19184 21.1778C9.81462 21.8973 10.681 22.3617 11.625 22.482C12.1464 22.5337 12.6728 22.4757 13.1704 22.3117C13.6681 22.1478 14.1259 21.8815 14.5144 21.53C14.9029 21.1785 15.2136 20.7495 15.4264 20.2707C15.6392 19.792 15.7494 19.2739 15.75 18.75V18H21C21.1989 18 21.3897 17.921 21.5303 17.7803C21.671 17.6397 21.75 17.4489 21.75 17.25V15C21.75 14.8011 21.6709 14.6104 21.5303 14.4697ZM14.25 18.75C14.25 19.3467 14.0129 19.919 13.591 20.341C13.169 20.7629 12.5967 21 12 21C11.4033 21 10.831 20.7629 10.409 20.341C9.98705 19.919 9.75 19.3467 9.75 18.75V18H14.25V18.75ZM20.25 16.5H3.75V15.3105L5.78025 13.2803C5.92091 13.1396 5.99996 12.9489 6 12.75V9.75C6 8.1587 6.63214 6.63258 7.75736 5.50736C8.88258 4.38214 10.4087 3.75 12 3.75C13.5913 3.75 15.1174 4.38214 16.2426 5.50736C17.3679 6.63258 18 8.1587 18 9.75V12.75C18 12.9489 18.0791 13.1396 18.2197 13.2803L20.25 15.3105V16.5Z"
                                fill="#1A48E9"
                              />
                            </svg>
                          </div>
                          <div className="text">Không có thông báo mới !</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5303 14.4697L19.5 12.4395V9.75C19.4977 7.89138 18.8063 6.09964 17.5595 4.72124C16.3127 3.34284 14.5991 2.4757 12.75 2.2875V0.75H11.25V2.2875C9.40093 2.4757 7.68732 3.34284 6.44053 4.72124C5.19373 6.09964 4.50233 7.89138 4.5 9.75V12.4395L2.46975 14.4697C2.32909 14.6104 2.25004 14.8011 2.25 15V17.25C2.25 17.4489 2.32902 17.6397 2.46967 17.7803C2.61032 17.921 2.80109 18 3 18H8.25V18.5828C8.23369 19.5342 8.56905 20.4583 9.19184 21.1778C9.81462 21.8973 10.681 22.3617 11.625 22.482C12.1464 22.5337 12.6728 22.4757 13.1704 22.3117C13.6681 22.1478 14.1259 21.8815 14.5144 21.53C14.9029 21.1785 15.2136 20.7495 15.4264 20.2707C15.6392 19.792 15.7494 19.2739 15.75 18.75V18H21C21.1989 18 21.3897 17.921 21.5303 17.7803C21.671 17.6397 21.75 17.4489 21.75 17.25V15C21.75 14.8011 21.6709 14.6104 21.5303 14.4697ZM14.25 18.75C14.25 19.3467 14.0129 19.919 13.591 20.341C13.169 20.7629 12.5967 21 12 21C11.4033 21 10.831 20.7629 10.409 20.341C9.98705 19.919 9.75 19.3467 9.75 18.75V18H14.25V18.75ZM20.25 16.5H3.75V15.3105L5.78025 13.2803C5.92091 13.1396 5.99996 12.9489 6 12.75V9.75C6 8.1587 6.63214 6.63258 7.75736 5.50736C8.88258 4.38214 10.4087 3.75 12 3.75C13.5913 3.75 15.1174 4.38214 16.2426 5.50736C17.3679 6.63258 18 8.1587 18 9.75V12.75C18 12.9489 18.0791 13.1396 18.2197 13.2803L20.25 15.3105V16.5Z"
                fill="#434547"
              />
            </svg>
            {numberNoti > 0 && <div className="numberNoti">{numberNoti}</div>}
          </div>
          <div className="header__right--info">
            <div className="avatar">
              <img src={avatar} alt="" />
            </div>
            <div className="information">
              <div className="information__name">{`${profile?.first_name} ${profile?.last_name}`}</div>
              <div className="information__position">
                {
                  roles.find((role) => profile?.jobInfo?.role === role.code)
                    ?.name
                }
              </div>
            </div>
            <div className="popUp">
              <div className="popUp__item">
                <div className="popUp__item--icon">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="16" height="16" fill="white" />
                    <circle
                      cx="8.5"
                      cy="5.5"
                      r="2.15"
                      stroke="#1A48E9"
                      strokeWidth="0.7"
                    />
                    <path
                      d="M4.36656 12.15C4.54272 10.2984 6.10222 8.85 8 8.85H9C10.8978 8.85 12.4573 10.2984 12.6334 12.15H4.36656Z"
                      stroke="#1A48E9"
                      strokeWidth="0.7"
                    />
                  </svg>
                </div>
                <div
                  className="popUp__item--name"
                  onClick={() => navigate("/admin/me")}
                >
                  Hồ sơ của bạn
                </div>
              </div>
              <div className="popUp__item" onClick={handleSignOut}>
                <div className="popUp__item--icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="16" height="16" fill="white" />
                    <path
                      d="M12 8H6.88M12 8L9.44 5.33333V10.6667L12 8ZM6.56 12H4V4H6.56"
                      stroke="#1A48E9"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="popUp__item--name">Đăng xuất</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
