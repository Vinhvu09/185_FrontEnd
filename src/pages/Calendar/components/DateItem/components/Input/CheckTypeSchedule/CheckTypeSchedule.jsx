import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Error from "../../../../../../../components/Error/Error"
import { inputTypeMeeting } from "../../../../../../../store/Reducer/meetingReducer"
import "./CheckTypeSchedule.scss"

export default function CheckTypeSchedule({ name, state }) {
  const dispatch = useDispatch()
  // const { typeMeeting } = useSelector((store) => store.meeting);
  const { setValue, getValues, formState: { errors } } = useFormContext()
  const [typeMeeting, setTypeMeeting] = useState(getValues(`${name}`))
  const { editSchedule } = useSelector(store => store.meeting)
  const handleClickCheckboxType = (e) => {

    let typeMeeting = ""
    if (e.target.nextSibling.nextSibling.innerHTML === "Khác") {
      typeMeeting = "OT"
    }

    if (e.target.nextSibling.nextSibling.innerHTML === "Cuộc họp") {
      typeMeeting = "ME"
    }
    if (e.target.nextSibling.nextSibling.innerHTML === "Công tác") {
      typeMeeting = "BU"
    }
    setValue(`${name}`, typeMeeting)
    setTypeMeeting(getValues(`${name}`))
  }
  useEffect(() => {
    if (editSchedule && state === "edit") {
      setValue(`${name}`, editSchedule.type)
      setTypeMeeting(getValues(`${name}`))
    }
  }, [editSchedule])

  return (
    <div className="checkTypeSchedule">
      <span className="checkTypeSchedule__title">Phân loại</span>
      <div className="checkTypeSchedule__list">
        <div className="checkTypeSchedule__list--checkbox">
          <input
            type="checkbox"
            className="checkboxTypeSchedule"
            onClick={handleClickCheckboxType}
            checked={typeMeeting === "ME" ? 1 : 0}
            onChange={() => null}
          />
          <span className="checkmark" id="checkmark1"></span>
          <span className="text">Cuộc họp</span>
        </div>
        <div className="checkTypeSchedule__list--checkbox">
          <input
            type="checkbox"
            className="checkboxTypeSchedule"
            onClick={handleClickCheckboxType}
            checked={typeMeeting === "BU" ? 1 : 0}
            onChange={() => null}
          />
          <span className="checkmark" id="checkmark2"></span>
          <span className="text">Công tác</span>
        </div>
        <div className="checkTypeSchedule__list--checkbox">
          <input
            type="checkbox"
            className="checkboxTypeSchedule"
            onClick={handleClickCheckboxType}
            checked={typeMeeting === "OT" ? 1 : 0}
            onChange={() => null}
          />
          <span className="checkmark" id="checkmark3"></span>
          <span className="text">Khác</span>
        </div>
      </div>
      {errors[name] && <Error message={errors[name].message} />}
    </div>
  )
}
