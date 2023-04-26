import React from "react"
import { useSelector } from "react-redux"
import AvatarUser from "../DateItem/components/AvatarUser/AvatarUser"
import PopupListUser from "../DateItem/components/PopupListUser/PopupListUser"
import "./ViewDetail.scss"

export default function ViewDetail({ edit = true }) {
  const { editSchedule } = useSelector(store => store.meeting)

  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ]

  function checkColorBackground(type) {
    if (type === "ME") {
      return `#3CD5A3`
    }
    if (type === "BU") {
      return `#1A9AFF`
    }
    if (type === "OT") {
      return `#E0E0E0`
    }
  }

  const handleClickOutModal = (e) => {
    if (e.target.matches(".viewDetail")) {
      document.querySelector(".viewDetail").style.display = "none"
    }
  }

  const handleClickCloseViewDetail = () => {
    document.querySelector(".viewDetail").style.display = "none"
  }

  const handleClickUpdate = (e) => {
    if (e.target.className === "viewDetail__main--update") {
      document.querySelector(".editScheduleMain").style.display = "flex"
    }
  }
  return (
    <>
      <div className="viewDetail" onClick={handleClickOutModal}>
        {editSchedule && <div className="viewDetail__main">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="viewDetail__main--close"
            onClick={handleClickCloseViewDetail}
          >
            <path
              d="M8.40994 7.00019L12.7099 2.71019C12.8982 2.52188 13.004 2.26649 13.004 2.00019C13.004 1.73388 12.8982 1.47849 12.7099 1.29019C12.5216 1.10188 12.2662 0.996094 11.9999 0.996094C11.7336 0.996094 11.4782 1.10188 11.2899 1.29019L6.99994 5.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L5.58994 7.00019L1.28994 11.2902C1.19621 11.3832 1.12182 11.4938 1.07105 11.6156C1.02028 11.7375 0.994141 11.8682 0.994141 12.0002C0.994141 12.1322 1.02028 12.2629 1.07105 12.3848C1.12182 12.5066 1.19621 12.6172 1.28994 12.7102C1.3829 12.8039 1.4935 12.8783 1.61536 12.9291C1.73722 12.9798 1.86793 13.006 1.99994 13.006C2.13195 13.006 2.26266 12.9798 2.38452 12.9291C2.50638 12.8783 2.61698 12.8039 2.70994 12.7102L6.99994 8.41019L11.2899 12.7102C11.3829 12.8039 11.4935 12.8783 11.6154 12.9291C11.7372 12.9798 11.8679 13.006 11.9999 13.006C12.132 13.006 12.2627 12.9798 12.3845 12.9291C12.5064 12.8783 12.617 12.8039 12.7099 12.7102C12.8037 12.6172 12.8781 12.5066 12.9288 12.3848C12.9796 12.2629 13.0057 12.1322 13.0057 12.0002C13.0057 11.8682 12.9796 11.7375 12.9288 11.6156C12.8781 11.4938 12.8037 11.3832 12.7099 11.2902L8.40994 7.00019Z"
              fill="#434547"
            />
          </svg>
          <div className="viewDetail__main--title">Thông tin lịch hẹn</div>
          <div className="viewDetail__main--name">
            <div className="left">Tên cuộc hẹn</div>
            <div className="right">
              <div className="right__top">
                <div
                  className="right__top--square"
                  style={{
                    background: `${checkColorBackground(editSchedule.type)}`,
                  }}
                ></div>
                <div className="right__top--name">{editSchedule.name}</div>
              </div>
              <div className="right__bottom">
                <span className="right__bottom--left">
                  {days[new Date(editSchedule.schedule_date).getDay()]},{" "}
                  {new Date(editSchedule.schedule_date).getDate()} tháng{" "}
                  {new Date(editSchedule.schedule_date).getMonth() + 1}
                </span>
                <span className="right__bottom--circle"></span>
                <div className="right__bottom--right">
                  {editSchedule.start_at.slice(0, 2)}:{editSchedule.start_at.slice(3, 5)} - {editSchedule.end_at.slice(0, 2)}:
                  {editSchedule.end_at.slice(3, 5)}
                </div>
              </div>
            </div>
          </div>
          <div className="viewDetail__main--content">
            <div className="left">Nội dung</div>
            <div className="right">
              <div className="right__top">
                Đây là nội dung cuộc họp {editSchedule.name}
              </div>
              <div className="right__bottom">{editSchedule.description}</div>
            </div>
          </div>
          <div className="viewDetail__main--participant">
            <div className="left">Người tham gia</div>
            <div className="right">
              {editSchedule.employees &&
                editSchedule.employees.map((user, index) => {
                  if (index < 3) {
                    return (
                      <div
                        key={index}
                        className="right__avatarUser"
                        style={{ left: `${index * 20}px` }}
                      >
                        <AvatarUser
                          avatar={user.avatar}
                          fullName={user.full_name}
                          department={user.department}
                        />
                      </div>
                    )
                  }
                })}
              {editSchedule.employees.length > 3 && (
                <>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="right__moreUser"
                  >
                    <path
                      d="M16 30.6663C24.1002 30.6663 30.6666 24.0999 30.6666 15.9997C30.6666 7.89948 24.1002 1.33301 16 1.33301C7.89979 1.33301 1.33331 7.89948 1.33331 15.9997C1.33331 24.0999 7.89979 30.6663 16 30.6663ZM9.71427 18.0949C9.15857 18.0949 8.62564 17.8742 8.23271 17.4812C7.83978 17.0883 7.61903 16.5554 7.61903 15.9997C7.61903 15.444 7.83978 14.9111 8.23271 14.5181C8.62564 14.1252 9.15857 13.9044 9.71427 13.9044C10.27 13.9044 10.8029 14.1252 11.1958 14.5181C11.5888 14.9111 11.8095 15.444 11.8095 15.9997C11.8095 16.5554 11.5888 17.0883 11.1958 17.4812C10.8029 17.8742 10.27 18.0949 9.71427 18.0949ZM18.0952 15.9997C18.0952 16.5554 17.8745 17.0883 17.4815 17.4812C17.0886 17.8742 16.5557 18.0949 16 18.0949C15.4443 18.0949 14.9114 17.8742 14.5184 17.4812C14.1255 17.0883 13.9047 16.5554 13.9047 15.9997C13.9047 15.444 14.1255 14.9111 14.5184 14.5181C14.9114 14.1252 15.4443 13.9044 16 13.9044C16.5557 13.9044 17.0886 14.1252 17.4815 14.5181C17.8745 14.9111 18.0952 15.444 18.0952 15.9997ZM22.2857 18.0949C21.73 18.0949 21.1971 17.8742 20.8041 17.4812C20.4112 17.0883 20.1905 16.5554 20.1905 15.9997C20.1905 15.444 20.4112 14.9111 20.8041 14.5181C21.1971 14.1252 21.73 13.9044 22.2857 13.9044C22.8414 13.9044 23.3743 14.1252 23.7673 14.5181C24.1602 14.9111 24.3809 15.444 24.3809 15.9997C24.3809 16.5554 24.1602 17.0883 23.7673 17.4812C23.3743 17.8742 22.8414 18.0949 22.2857 18.0949Z"
                      fill="#393B3D"
                    />
                  </svg>
                  <PopupListUser employees={editSchedule.employees} />
                </>
              )}
            </div>

          </div>
          {edit && <div className="viewDetail__main--update" onClick={handleClickUpdate}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 17 16"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3603 1.62737C14.4202 0.790875 12.896 0.790875 11.9558 1.62737L2.41187 10.1192C2.34646 10.1774 2.29924 10.2495 2.27458 10.3287L1.01952 14.3602C0.967906 14.5255 1.02036 14.7025 1.1566 14.8239C1.29306 14.9452 1.492 14.9918 1.67777 14.9461L6.2088 13.8292C6.29782 13.8073 6.3789 13.7653 6.44431 13.7071L15.988 5.21508C16.9267 4.37802 16.9267 3.02296 15.988 2.18591L15.3603 1.62737ZM3.57749 10.4286L11.3885 3.47849L13.9076 5.71988L6.09638 12.6699L3.57749 10.4286ZM3.07429 11.327L5.08686 13.1178L2.303 13.8041L3.07429 11.327ZM15.2316 4.54201L14.6642 5.04681L12.1449 2.80524L12.7125 2.30044C13.2347 1.8358 14.0814 1.8358 14.6036 2.30044L15.2316 2.85897C15.753 3.32417 15.753 4.077 15.2316 4.54201Z"
                fill="#1a48e9;
"
                stroke="white"
                strokeWidth="0.2"
              />
            </svg>

            <span className="text">Chỉnh sửa</span>
          </div>}

        </div>}

      </div>
    </>
  )
}
