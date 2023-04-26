import React, { useEffect } from "react"
import "./EditSchedule.scss"
import InputSchedule from "../Input/InputSchedule/InputSchedule"
import TextAreaSchedule from "../Input/TextAreaSchedule/TextAreaSchedule"
import DateInputSchedule from "../Input/DateInputSchedule/DateInputSchedule"
import TimeInputSchedule from "../Input/TimeInputSchedule/TimeInputSchedule"
import CheckTypeSchedule from "../Input/CheckTypeSchedule/CheckTypeSchedule"
import MemberInputSchedule from "../Input/MemberInputSchedule/MemberInputSchedule"
import { useDispatch, useSelector } from "react-redux"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getDepartmentUserStart } from "../../../../../../store/Reducer/departmentReducer"
import {
  addBackendDataSchedule,
  inputDescriptionMeetinUpdate,
  inputTitleMeetingUpdate,
  resetErrorState,
  resetMeetingState,
} from "../../../../../../store/Reducer/meetingReducer"
import Swal from "sweetalert2"
import { updateAxios } from "../../../../../../api/Axios"
import Error from "../../../../../../components/Error/Error"

const today = new Date()
today.setHours(0, 0, 0, 0)
const schema = yup.object().shape({
  name: yup.string().required("* Tên cuộc hẹn không được để trống"),
  description: yup
    .string()
    .required("* Nội dung cuộc hẹn không được để trống"),

  schedule_date: yup
    .date()
    .required("* Ngày tạo cuộc họp không được để trống")
    .min(today, "* Ngày tạo cuộc họp đã qua"),
  type: yup.string().required("* Vui lòng chọn loại cuộc họp"),
  employees: yup.array().of(yup.object()).required("* Vui lòng chọn ít nhất 1 nhân viên").test({ message: "* Vui lòng chọn ít nhất 1 nhân viên", test: arr => arr?.length > 0 })
})

export default function EditSchedule({ funcSetStartDate }) {
  //redux
  const dispatch = useDispatch()

  //useForm

  const methods = useForm({ resolver: yupResolver(schema) })
  const { handleSubmit,
    setError,
    control,
    register,
    reset,
    formState: { errors } } = methods
  //reducer

  const { dataDepartmentUser } = useSelector((store) => store.department)
  const { editSchedule, backendDataSchedules } = useSelector(store => store.meeting)
  useEffect(() => {
    // dispatch(getDepartmentUserStart());

    if (editSchedule) {
      const newDate = new Date(editSchedule.schedule_date)
      const hourMeetingStart = editSchedule.start_at.slice(0, 2)
      const minuteMeetingStart = editSchedule.start_at.slice(3, 5)
      const hourMeetingEnd = editSchedule.end_at.slice(0, 2)
      const minuteMeetingEnd = editSchedule.end_at.slice(3, 5)
      reset({
        name: editSchedule.name,
        description: editSchedule.description,
        schedule_date: newDate,
        hourMeetingStart: hourMeetingStart,
        minuteMeetingStart: minuteMeetingStart,
        hourMeetingEnd: hourMeetingEnd,
        minuteMeetingEnd: minuteMeetingEnd,
        type: editSchedule.type,
        employees: editSchedule.employees
      })

    }
  }, [editSchedule])
  const swalScheduleEdit = Swal.mixin({
    customClass: {
      confirmButton: "sweertAlert__cancelSchedule",
      cancelButton: "sweertAlert__saveSchedule",
    },
    buttonsStyling: false,
  })

  const onSubmit = (data) => {
    dispatch(resetErrorState())
    const { hourMeetingStart, minuteMeetingStart, hourMeetingEnd, minuteMeetingEnd, ...newData } = data
    if (
      !hourMeetingStart ||
      !minuteMeetingStart ||
      !hourMeetingEnd ||
      !minuteMeetingEnd
    ) {
      setError("meeting_time", {
        type: "custom",
        message: "* Nhập thiếu thời gian cuộc họp",
      })
    } else if (
      (hourMeetingStart * 60 + minuteMeetingStart) -
      (hourMeetingEnd * 60 + minuteMeetingEnd) > 0
    ) {
      setError("meeting_time", {
        type: "custom",
        message: "* Thời gian bắt đầu và kết thúc không hợp lý",
      })
    } else if (
      hourMeetingEnd * 60 +
      minuteMeetingEnd -
      (hourMeetingStart * 60 + minuteMeetingStart) <
      15
    ) {
      setError("meeting_time", {
        type: "custom",
        message: "* Cuộc họp tối thiếu phải trong 15 phút",
      })
    } else {
      let dataSchedule = { ...newData }
      const { schedule_date } = dataSchedule
      dataSchedule.schedule_date = `${schedule_date.getFullYear()}-${schedule_date.getMonth() < 10
        ? `0${schedule_date.getMonth() + 1}`
        : schedule_date.getMonth() + 1
        }-${schedule_date.getDate() < 10 ? `0${schedule_date.getDate()}` : schedule_date.getDate()}`
      dataSchedule.start_at = `${hourMeetingStart}:${minuteMeetingStart}:00`
      dataSchedule.end_at = `${hourMeetingEnd}:${minuteMeetingEnd}:00`
      dataSchedule.id = editSchedule.id
      const newBackendData = [...backendDataSchedules]
      const newDataEdited = newBackendData.map((data) => {
        if (data.id === dataSchedule.id) {
          return dataSchedule
        }
        else {
          return data
        }
      })
      // newBackendData.push(dataSchedule);
      dispatch(addBackendDataSchedule(newDataEdited))
      funcSetStartDate(schedule_date)
      const editForm = document.querySelector(".dateItem__editSchedule")
      const scheduleForm = document.querySelector(".dateItem__schedule")
      const editOverlay = document.querySelector(".dateItem__editOverlay")
      editOverlay.style.display = "none"
      if (editForm.style.opacity * 1 === 1) {
        editForm.style.width = "0"
        editForm.style.opacity = 0
        editForm.style.visibility = "hidden"
        scheduleForm.style.width = "100%"
      }
      //  document.querySelector(".addSchedule").style.display = "none";
    }
  }
  window.addEventListener("click", (e) => {
    const editForm = document.querySelector(".dateItem__editSchedule")
    if (editForm?.style?.opacity * 1 === 1) {
      if (e.target.closest(".dateItem__editOverlay")) {

        swalScheduleEdit
          .fire({
            html: `<svg className="sweertAlert__iconWarningEditSchedule"width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect width="52" height="52" rx="26" fill="#E13F3F"/>
         <g clip-path="url(#clip0_1896_137514)">
         <path d="M30.0832 35.4688C30.0832 37.9673 28.0271 40 25.4998 40C22.9726 40 20.9165 37.9673 20.9165 35.4688C20.9165 32.9702 22.9726 30.9375 25.4998 30.9375C28.0271 30.9375 30.0832 32.9702 30.0832 35.4688ZM21.447 12.4273L22.2262 27.8335C22.2628 28.557 22.8668 29.125 23.5995 29.125H27.4002C28.1329 29.125 28.7369 28.557 28.7735 27.8335L29.5527 12.4273C29.5919 11.6508 28.9658 11 28.1794 11H22.8203C22.0339 11 21.4078 11.6508 21.447 12.4273Z" fill="white"/>
         </g>
         <defs>
         <clipPath id="clip0_1896_137514">
         <rect width="11" height="29" fill="white" transform="translate(20 11)"/>
         </clipPath>
         </defs>
         </svg>
          <p className="sweertAlert__titleEditSchedule" style="font-weight:600;font-size:24px;color:#393b3d;margin-top:8px;">Chỉnh sửa chưa được lưu</p>
          <span className="sweertAlert__contentEditSchedule" style="font-weight:400;font-size:16px;color:#393b3d;margin-top:8px;">Chỉnh sửa của bạn chưa được lưu, bạn có muốn<br/>tiếp tục</span>

          `,

            showCancelButton: true,
            confirmButtonText: "Trở về",
            cancelButtonText: "Tiếp tục",
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
            } else if (result.dismiss === Swal.DismissReason.cancel) {


              const editForm = document.querySelector(
                ".dateItem__editSchedule"
              )
              const scheduleForm = document.querySelector(
                ".dateItem__schedule"
              )
              const editOverlay = document.querySelector(".dateItem__editOverlay")
              editOverlay.style.display = "none"
              if (editForm.style.opacity * 1 === 1) {
                editForm.style.width = "0"
                editForm.style.opacity = 0
                editForm.style.visibility = "hidden"
                scheduleForm.style.width = "100%"
                dispatch(resetMeetingState())
              }

            }
          })



      }
    }
  })

  const handleClickCancel = () => {
    const editForm = document.querySelector(".dateItem__editSchedule")
    const scheduleForm = document.querySelector(".dateItem__schedule")
    const editOverlay = document.querySelector(".dateItem__editOverlay")
    editOverlay.style.display = "none"
    editForm.style.width = "0"
    editForm.style.opacity = 0
    editForm.style.visibility = "hidden"
    scheduleForm.style.width = "100%"
  }



  return (
    <>
      <div className="dateItem__editSchedule">
        <FormProvider {...methods}>
          <form
            className="dateItem__editSchedule--form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputSchedule
              control={control}
              name="name"
              id="name"
              title="Tên cuộc hẹn"
              width="100%"

              error={errors.name ? errors.name.message : ""}
            />
            <TextAreaSchedule
              control={control}
              name="description"
              id="description"
              title="Nội dung cuộc hẹn"
              width="100%"
              rows="8"
              cols="34"
              error={errors.description ? errors.description.message : ""}
            />
            <DateInputSchedule
              control={control}
              name="schedule_date"
              id="schedule_date"
              title="Ngày"
              width="100%"
              error={errors.schedule_date ? errors.schedule_date.message : ""}
            />
            {errors.meeting_date && (
              <p className="date_item_errors">{errors.meeting_date.message}</p>
            )}
            <div className="meetingTime">
              <span className="meetingTime__title">Thời gian</span>

              <div className="meetingTime__time">
                <span className="meetingTime__time--left">Từ</span>
                <div className="meetingTime__time--right">
                  <TimeInputSchedule
                    control={control}
                    name="hourMeetingStart"
                    id="hourMeetingStart"
                    type="hours"
                  />

                  <span>giờ</span>
                  <TimeInputSchedule
                    control={control}
                    name="minuteMeetingStart"
                    id="minuteMeetingStart"
                    type="minutes"
                  />

                  <span>phút</span>
                </div>
              </div>
              <div className="meetingTime__time">
                <span className="meetingTime__time--left">Đến</span>
                <div className="meetingTime__time--right">
                  <TimeInputSchedule
                    control={control}
                    name="hourMeetingEnd"
                    id="hourMeetingEnd"
                    type="hours"
                  />
                  <span>giờ</span>
                  <TimeInputSchedule
                    control={control}
                    name="minuteMeetingEnd"
                    id="minuteMeetingEnd"
                    type="minutes"
                  />
                  <span>phút</span>
                </div>
              </div>
              {errors[`meeting_time`] && <Error message={errors[`meeting_time`].message} />}

            </div>

            <CheckTypeSchedule name="type" state="edit" />

            {dataDepartmentUser &&
              dataDepartmentUser.map((item, index) => {
                return (
                  <MemberInputSchedule
                    key={item.name}
                    name={item.name}
                    users={item.employee_joined_list}
                    state="edit"
                  />
                )
              })}
            {errors.meeting_users && (
              <p className="date_item_errors">{errors.meeting_users.message}</p>
            )}

            <div className="groupButton">
              <button
                className="groupButton__cancel"
                type="button"
                onClick={handleClickCancel}
              >
                Huỷ
              </button>
              <button className="groupButton__save" type="submit">
                Lưu
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </  >
  )
}
