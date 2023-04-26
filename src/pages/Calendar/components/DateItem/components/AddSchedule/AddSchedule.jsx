import { yupResolver } from "@hookform/resolvers/yup"
import { useReducer } from "react"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import Error from "../../../../../../components/Error/Error"
import { getDepartmentUserStart } from "../../../../../../store/Reducer/departmentReducer"
import {
  addBackendDataSchedule,
  addScheduleStart, resetErrorState, resetMeetingState
} from "../../../../../../store/Reducer/meetingReducer"
import CheckTypeSchedule from "../Input/CheckTypeSchedule/CheckTypeSchedule"
import DateInputSchedule from "../Input/DateInputSchedule/DateInputSchedule"

import InputSchedule from "../Input/InputSchedule/InputSchedule"
import MemberInputSchedule from "../Input/MemberInputSchedule/MemberInputSchedule"
import TextAreaSchedule from "../Input/TextAreaSchedule/TextAreaSchedule"
import TimeInputSchedule from "../Input/TimeInputSchedule/TimeInputSchedule"
import "./AddSchedule.scss"
import { v4 as uuidv4 } from "uuid"
import { setEditUser } from "../../../../../../store/Reducer/usersReducer"
import { useLayoutEffect } from "react"


const today = new Date()
today.setHours(0, 0, 0, 0)
//shema yup
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


export default function AddSchedule({ funcSetStartDate, setOpenAddSchedule }) {

  //hooks

  //redux
  const dispatch = useDispatch()

  //reducers
  const { dataDepartmentUser } = useSelector((store) => store.department)

  const { backendDataSchedules } = useSelector((store) => store.meeting)


  //react hook form
  const methods = useForm({ resolver: yupResolver(schema) })


  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = methods
  // useEffect(() => {
  //   dispatch(getDepartmentUserStart());
  // }, []);

  const handleClickCancel = () => {
    setOpenAddSchedule(false)
  }

  const handleClickOutModal = (e) => {
    if (e.target.matches(".addSchedule")) {
      setOpenAddSchedule(false)
    }
  }


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
      dataSchedule.id = uuidv4()
      const newBackendData = [...backendDataSchedules]
      newBackendData.push(dataSchedule)
      dispatch(addBackendDataSchedule(newBackendData))

      funcSetStartDate(schedule_date)
      setOpenAddSchedule(false)
    }
  }
  useEffect(() => {
    console.log("da vao")
  }, [])



  return (
    <div className="addSchedule" onClick={handleClickOutModal}>

      <div className="addSchedule__main">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="addSchedule__main--close"
          onClick={handleClickCancel}
        >
          <path
            d="M8.40994 7.00019L12.7099 2.71019C12.8982 2.52188 13.004 2.26649 13.004 2.00019C13.004 1.73388 12.8982 1.47849 12.7099 1.29019C12.5216 1.10188 12.2662 0.996094 11.9999 0.996094C11.7336 0.996094 11.4782 1.10188 11.2899 1.29019L6.99994 5.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L5.58994 7.00019L1.28994 11.2902C1.19621 11.3832 1.12182 11.4938 1.07105 11.6156C1.02028 11.7375 0.994141 11.8682 0.994141 12.0002C0.994141 12.1322 1.02028 12.2629 1.07105 12.3848C1.12182 12.5066 1.19621 12.6172 1.28994 12.7102C1.3829 12.8039 1.4935 12.8783 1.61536 12.9291C1.73722 12.9798 1.86793 13.006 1.99994 13.006C2.13195 13.006 2.26266 12.9798 2.38452 12.9291C2.50638 12.8783 2.61698 12.8039 2.70994 12.7102L6.99994 8.41019L11.2899 12.7102C11.3829 12.8039 11.4935 12.8783 11.6154 12.9291C11.7372 12.9798 11.8679 13.006 11.9999 13.006C12.132 13.006 12.2627 12.9798 12.3845 12.9291C12.5064 12.8783 12.617 12.8039 12.7099 12.7102C12.8037 12.6172 12.8781 12.5066 12.9288 12.3848C12.9796 12.2629 13.0057 12.1322 13.0057 12.0002C13.0057 11.8682 12.9796 11.7375 12.9288 11.6156C12.8781 11.4938 12.8037 11.3832 12.7099 11.2902L8.40994 7.00019Z"
            fill="#434547"
          />
        </svg>

        <h1>Tạo lịch mới</h1>
        <FormProvider {...methods}>
          <form
            className="addSchedule__main--form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputSchedule
              control={control}
              name="name"
              id="name"
              title="Tên cuộc hẹn"
              width="100%"
              error={errors.name_meeting ? errors.name_meeting.message : ""}
            />
            <TextAreaSchedule
              control={control}
              name="description"
              id="description"
              title="Nội dung cuộc hẹn"
              width="100%"
              rows="8"
              cols="34"
              error={errors.content_meeting ? errors.content_meeting.message : ""}
            />

            <div className="center">
              <DateInputSchedule
                control={control}
                name="schedule_date"
                id="schedule_date"
                title="Ngày"
                width="30%"
                error={errors.schedule_date ? errors.schedule_date.message : ""}
              />
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

              <CheckTypeSchedule name="type" />
            </div>



            <span className="participants">Người tham gia</span>
            <div className="listInputUser">
              {dataDepartmentUser &&
                dataDepartmentUser.map((item, index) => {
                  return (
                    <MemberInputSchedule
                      key={item.id}
                      name={item.name}
                      users={item.employee_joined_list}
                      width="30%"
                    />
                  )
                })}

            </div>
            {errors[`employees`] && <Error message={errors[`employees`].message} />}

            <div className="groupButton">
              <button className="groupButton__save" type="submit">
                Lưu
              </button>
              <button
                className="groupButton__cancel"
                type="button"
                onClick={handleClickCancel}
              >
                Huỷ
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
