import React from 'react'
import { useDispatch } from 'react-redux'
import { addEditSchedule, inputDateMeetingUpdate, inputDescriptionMeetinUpdate, inputHourMeetingEnd, inputHourMeetingStart, inputIdScheduleUpdate, inputMinuteMeetingEnd, inputMinuteMeetingStart, inputTitleMeetingUpdate, inputTypeMeeting, inputUsersMeetingUpdate } from '../../../../../../store/Reducer/meetingReducer'
import './DataItemMonth.scss'

export default function
  ({ schedule }) {
  const dispatch = useDispatch()
  function getHourFormatHHMM(time) {
    return time.slice(0, 5)
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

  const handleClickViewDetailSchedule = (e) => {
    document.querySelector(".viewDetail").style.display = "flex"
    dispatch(addEditSchedule(schedule))

  }
  return (
    <div className='dataItemMonth'
      style={{
        background: `${checkColorBackground(schedule.type)}`,
        borderLeft: `2px solid ${checkColorBorder(schedule.type)}`,
      }}
      onClick={handleClickViewDetailSchedule}
    >
      <span className="dataItemMonth__name">{schedule.name}</span>
      <span className="dataItemMonth__time">   {getHourFormatHHMM(schedule.start_at)} -{" "}
        {getHourFormatHHMM(schedule.end_at)}</span>
    </div>
  )
}
