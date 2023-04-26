import React from "react"
import { useDispatch } from "react-redux"
import {
  addEditSchedule,
  inputDateMeetingUpdate,
  inputDescriptionMeetinUpdate,
  inputHourMeetingEnd,
  inputHourMeetingStart,
  inputIdScheduleUpdate,
  inputMinuteMeetingEnd,
  inputMinuteMeetingStart,
  inputTitleMeetingUpdate,
  inputTypeMeeting,
  inputUsersMeetingUpdate,
} from "../../../../../../../store/Reducer/meetingReducer"
import "./WeekScheduleItem.scss"

export default function WeekScheduleItem({ dataSchedule }) {
  const dispatch = useDispatch()
  function getHourFormatHHMM(time) {
    return time.slice(0, 5)
  }

  function getPositionItem(timeStart) {
    const hour = timeStart.slice(0, 2) * 1
    const minute = timeStart.slice(3, 5) * 1
    return hour * 150 + (150 * minute) / 60
  }

  function getHeightItem(timeStart, timeEnd) {
    const minuteTimeStart =
      timeStart.slice(0, 2) * 1 * 60 + timeStart.slice(3, 5) * 1
    const minuteTimeEnd =
      timeEnd.slice(0, 2) * 1 * 60 + timeEnd.slice(3, 5) * 1

    return ((minuteTimeEnd - minuteTimeStart) * 150) / 60
  }

  function checkColorBackground(type) {
    if (type === "ME") {
      return `#E2F9F1`
    }
    if (type === "BU") {
      return `#DDF0FF`
    }
    if (type === "OT") {
      return `#F3F3F3`
    }
  }
  function checkColorBorder(type) {
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
  const handleClickViewDetailSchedule = () => {
    dispatch(addEditSchedule(dataSchedule))
    document.querySelector(".viewDetail").style.display = "flex"

  }
  return (
    <div
      className="weekScheduleItem"
      style={{
        top: `${getPositionItem(dataSchedule.start_at)}px`,
        height: `${getHeightItem(
          dataSchedule.start_at,
          dataSchedule.end_at
        )}px`,
        background: `${checkColorBackground(dataSchedule.type)}`,
        borderLeft: `4px solid ${checkColorBorder(dataSchedule.type)}`,
      }}
      onClick={() => handleClickViewDetailSchedule()}
    >
      <span className="weekScheduleItem__name">{dataSchedule.name}</span>
      <span className="weekScheduleItem__description">
        {getHourFormatHHMM(dataSchedule.start_at)} -{" "}
        {getHourFormatHHMM(dataSchedule.end_at)}
      </span>
    </div >
  )
}
