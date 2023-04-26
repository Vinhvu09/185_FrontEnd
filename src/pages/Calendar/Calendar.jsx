import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux"
import addIcon from "../../assets/svg/add.svg"
import nextButton from "../../assets/svg/nextButton.svg"
import prevButton from "../../assets/svg/prevButton.svg"
import MainButton from "../../components/MainButton/MainButton"
import Redirect from "../../components/Redirect/Redirect"
import { days, months } from "../../constant/constant"
import {
  getDataSchedules,
  getDataSchedulesStart,
  inputDateMeetingUpdate,
  resetMeetingState,
} from "../../store/Reducer/meetingReducer"
import "./Calendar.scss"
import AddSchedule from "./components/DateItem/components/AddSchedule/AddSchedule"
import DateItem from "./components/DateItem/DateItem"
import MonthItem from "./components/MonthItem/MonthItem"
import EditScheduleMain from "./components/ViewDetail/components/EditScheduleMain/EditScheduleMain"
import ViewDetail from "./components/ViewDetail/ViewDetail"
import WeekItem from "./components/WeekItem/WeekItem"
const locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  formatLong: {
    date: () => "mm-dd-yyyy",
  },
}
const redirect = [
  { id: 1, name: "Quản lý tài khoản", path: "/admin/staffs" },
  { id: 2, name: "Lịch trình", path: "/admin/calendar" },
]

export default function Calendar() {
  const [startDate, setStartDate] = useState(new Date())
  const [isActive, setIsActive] = useState("date")
  const [openAddSchedule, setOpenAddSchedule] = useState(false)
  // const {isSaved}= useSelector(store=> store.meeting);
  const { backendDataSchedules, dataSchedules, editSchedule } = useSelector(store => store.meeting)
  const dispatch = useDispatch()
  const increaseMonth = () => {
    let month = startDate.getMonth() + 2
    let year = startDate.getFullYear()
    if (month > 12) {
      month = 1
      year += 1
    }

    let dataString = new Date(`${month}/1/${year}`)
    setStartDate(dataString)
  }
  const decreaseMonth = () => {
    let month = startDate.getMonth()
    let year = startDate.getFullYear()
    if (month < 1) {
      month = 12
      year -= 1
    }

    let dataString = new Date(`${month}/1/${year}`)
    setStartDate(dataString)
  }
  const handleTab = (e) => {
    let data = e.target.dataset.id
    setIsActive(data)
  }

  useEffect(() => {
    const date = startDate.getDate() < 10
      ? `0${startDate.getDate()}`
      : startDate.getDate()
    const month =
      startDate.getMonth() + 1 < 10
        ? `0${startDate.getMonth() + 1}`
        : startDate.getMonth() + 1
    const year = startDate.getFullYear()
    let newDataSchedules = [...backendDataSchedules]

    newDataSchedules = [...newDataSchedules].filter(item => item.schedule_date === `${year}-${month}-${date}`)
    dispatch(getDataSchedules(newDataSchedules))
  }, [startDate])

  const handleClickAddSchedule = () => {
    setOpenAddSchedule(true)

  }
  return (
    <div className="calendar">
      <div className="container-fluid">
        <div className="calendar__head">
          <Redirect data={redirect} />
          <MainButton
            icon={addIcon}
            className="mainButton"
            onClick={handleClickAddSchedule}
          >
            Tạo lịch
          </MainButton>
        </div>
        <div className="calendar__options">
          <div className="input">
            <div className="wrapper">
              <div className="display">
                <p>Tháng {startDate?.getMonth() + 1}</p>
                <span>-</span>
                <p>{startDate?.getFullYear()}</p>
              </div>
              <DatePicker
                locale={locale}
                selected={startDate}
                onChange={(date) => {
                  document
                    .querySelector(".activeDay")
                    ?.classList.remove("activeDay")
                  setStartDate(date)
                }}
              />
            </div>
            <div className="button">
              <div className="item" onClick={decreaseMonth}>
                <img src={prevButton} alt="svg__button" />
              </div>
              <div className="item" onClick={increaseMonth}>
                <img src={nextButton} alt="svg__button" />
              </div>
            </div>
          </div>
          <div className="tab">
            <div
              className={`item ${isActive === "month" && "active"}`}
              data-id="month"
              onClick={handleTab}
            >
              Tháng
            </div>
            <div
              className={`item ${isActive === "week" && "active"}`}
              data-id="week"
              onClick={handleTab}
            >
              Tuần
            </div>
            <div
              className={`item ${isActive === "date" && "active"}`}
              data-id="date"
              onClick={handleTab}
            >
              Ngày
            </div>
          </div>
          <div className="status">
            <div className="item">
              <div className="circle --green"></div>
              <div className="name">Cuộc họp</div>
            </div>
            <div className="item">
              <div className="circle --blue"></div>
              <div className="name">Công tác</div>
            </div>
            <div className="item">
              <div className="circle --grey"></div>
              <div className="name">Khác</div>
            </div>
          </div>
        </div>
      </div>
      <div className="calendar__main">
        {isActive === "date" && (
          <DateItem
            dataSchedules={dataSchedules}
            month={startDate.getMonth()}
            year={startDate.getFullYear()}
            day={startDate.getDate()}
            funcSetStartDate={setStartDate}
          />
        )}
        {isActive === "week" && (
          <WeekItem date={startDate} funcSetStartDate={setStartDate} />
        )}
        {isActive === "month" && <MonthItem date={startDate} />}
      </div>
      {openAddSchedule && <AddSchedule funcSetStartDate={setStartDate} setOpenAddSchedule={setOpenAddSchedule} />}
      <EditScheduleMain funcSetStartDate={setStartDate} />
      <ViewDetail />
    </div>
  )
}
