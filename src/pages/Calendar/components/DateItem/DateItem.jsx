import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SwiperCore, { Navigation } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import ScheduleItem from "./components/ScheduleItem/ScheduleItem"
import SliderDayItem from "./components/SliderDayItem/SliderDayItem"
import TimeRange from "./components/TimeRange/TimeRange"
import "./DateItem.scss"

import EditSchedule from "./components/EditSchedule/EditSchedule"

SwiperCore.use([Navigation])




export default function DateItem({ month, year, day, funcSetStartDate }) {

  const { dataSchedules } = useSelector(store => store.meeting)

  const [timeStart, setTimeStart] = useState()
  const [timeEnd, setTimeEnd] = useState()
  function checkYear(year) {
    if (year % 4 === 0 && year % 100 !== 0) {
      return true
    }
    if (year % 400 === 0) {
      return true
    }
    return false
  }
  function countDateInMonth(month, year) {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31
      case 4:
      case 6:
      case 9:
      case 11:
        return 30
      case 2:
        if (checkYear(year)) return 29
        else return 28

      default:
        return 30
    }
  }
  function getDayInWeek(year, month, day) {
    const weekday = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
    const date = new Date(year, month, day)
    return weekday[date.getDay()]
  }



  const handleClickSliderDay = (e) => {
    const listSliderDayItem = document.querySelectorAll(".swiper-slide")
    for (let index = 0; index < listSliderDayItem.length; index++) {
      const element = listSliderDayItem[index]

      if (element === e.target) {
        day = e.target.firstChild.getAttribute("day")
        month = e.target.firstChild.getAttribute("month") * 1 + 1
        year = e.target.firstChild.getAttribute("year")
        let dataString = new Date(`${month}/${day}/${year}`)
        funcSetStartDate(dataString)
      }
    }

  }


  useEffect(() => {
    const tempTimeStart = dataSchedules[0] ? dataSchedules[0].start_at.slice(0, 2) * 1 : 0
    const tempTimeEnd = dataSchedules[dataSchedules.length - 1] ? dataSchedules[dataSchedules.length - 1].end_at.slice(0, 2) * 1 + 1 : 24

    setTimeStart(tempTimeStart)
    setTimeEnd(tempTimeEnd)

  }, [dataSchedules])



  useEffect(() => {
    const swiper = document.querySelector(".swiperDayInMonth").swiper
    swiper.slideTo(day - 1, 1000, false)
  }, [day])


  useEffect(() => {
    const swipers = document.querySelectorAll(".swiperDayInMonth .swiper-slide")
    for (let index = 0; index < swipers.length; index++) {
      const swiper = swipers[index]
      if (swiper.getAttribute("day") === "CN") {
        swiper.style.marginRight = "32px"
      }
    }
  }, [])
  return (
    <div className="dateItem">
      <div className="dateItem__swiper">
        <Swiper
          slidesPerView={20}
          direction="horizontal"
          allowTouchMove={false}
          slideToClickedSlide={true}
          navigation={{
            nextEl: ".dayItemSlider-next",
            prevEl: ".dayItemSlider-prev",
          }}
          className="swiperDayInMonth"
          slidesPerGroup={7}
        >
          {Array.from(
            { length: countDateInMonth(month + 1, year) },
            (_, i) => i + 1
          ).length > 0 &&
            Array.from(
              { length: countDateInMonth(month + 1, year) },
              (_, i) => i + 1
            ).map((item, index) => {
              return (

                <SwiperSlide key={item} onClick={handleClickSliderDay} day={getDayInWeek(year, month, item)}>
                  <SliderDayItem
                    dayOfWeek={getDayInWeek(year, month, item)}
                    activeClassName={item === day ? `activeDay` : ``}

                    day={item}
                    month={month}
                    year={year}
                    key={item}
                  />
                </SwiperSlide>
              )
            })}
        </Swiper>
        <div className="dayItemSlider-next">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#1A48E9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="dayItemSlider-prev">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 7L7 1"
              stroke="#1A48E9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="dateItem__schedule">
        {Array.from(
          { length: timeEnd - timeStart + 1 },
          (_, i) => timeStart + i
        ).map((item, index) => {

          return <TimeRange key={`${day}${month}${year}${item}`} numHour={item}></TimeRange>
        })}
        {dataSchedules.map((item, index) => {
          return (

            <ScheduleItem
              dataSchedule={item}
              key={`${month}${year}${day}${item.id}`}
              timeStart={timeStart}
              MeetingTimeStart={item.start_at}
              MeetingTimeEnd={item.end_at}
              title={item.name}
              description={item.description}
              type={item.type}
              employees={item.employees}
              keyID={`${month}${year}${day}${item.id}`}
              idSchedule={item.id}
              funcSetStartDate={funcSetStartDate}
              month={month}
              year={year}
              day={day}
            ></ScheduleItem>
          )
        })}

      </div>
      <EditSchedule month={month} day={day} year={year} funcSetStartDate={funcSetStartDate} />
      <div className="dateItem__editOverlay">

      </div>
    </div>
  )
}
