import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBackendDataSchedule } from "../../../../../../store/Reducer/meetingReducer"

import "./PopupAddUser.scss"

export default function PopupAddUser({ employees, keyID, idSchedule, dateSelect, funcSetStartDate }) {
  const [users, setUsers] = useState([])
  const { backendDataSchedules } = useSelector((store) => store.meeting)
  const { dataDepartmentUser, usersData } = useSelector((store) => store.department)
  const [employeesAttend, setEmployeesAttend] = useState(employees || [])


  const dispatch = useDispatch()
  const itemEnd = useRef()

  // const getDatas = async () => {
  //   getAxios(`/users?page=1&page_size=1000`).then((res) => {
  //     setUsers(res.results);
  //   });
  // };
  useEffect(() => {
    setUsers(usersData)
    // getDatas();
    // dispatch(inputUsersMeetingUpdate(employees));
  }, [])

  window.addEventListener("click", (e) => {
    if (
      e.target.className?.animVal !== "addUserSVGSchedule" &&
      e.target.className !== "popUpAddUserSchedule__form" &&
      e.target.className !== "rightCheckbox" &&
      e.target.className !== "popUpAddUserSchedule__form--userItemCheck"

    ) {
      document
        .querySelector(".openPopupAddUserSchedule")
        ?.classList.remove("openPopupAddUserSchedule")
    }
  })
  function handleClickCheckbox(e) {
    if (e.target.checked) {
      let id = e.target.getAttribute("data-id") * 1
      let user_code = e.target.getAttribute("data-usercode")
      let full_name = e.target.getAttribute("data-fullname")
      let avatar = e.target.getAttribute("data-avatar")
      const userData = { id, user_code, full_name, avatar }
      setEmployeesAttend(prev => [...prev, userData])

    }
    if (!e.target.checked) {
      let id = e.target.getAttribute("data-id") * 1
      setEmployeesAttend(prev => prev.filter(item => item.id !== id))
    }
  }
  function checkStateCheckbox(id) {
    let checkState = false

    for (let index = 0; index < employeesAttend.length; index++) {
      const element = employeesAttend[index]
      if (element.id * 1 === id * 1) {
        checkState = true
      }
    }
    return checkState
  }
  const handleClickPopupAddUserSave = async () => {
    const editedData = [...backendDataSchedules].map(data => {
      if (data.id === idSchedule) {
        const newData = { ...data }
        newData.employees = employeesAttend

        return newData
      }
      return data
    })
    dispatch(addBackendDataSchedule(editedData))

    const activeDay = document.querySelector(".activeDay")
    let day = activeDay.getAttribute("day")
    let month = activeDay.getAttribute("month") * 1 + 1
    let year = activeDay.getAttribute("year")
    let dataString = new Date(`${month}/${day}/${year}`)
    funcSetStartDate(dataString)
    document
      .querySelector(".openPopupAddUserSchedule")
      ?.classList.remove("openPopupAddUserSchedule")

  }
  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    str = str.replace(/Đ/g, "D")
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
    str = str.replace(/\u02C6|\u0306|\u031B/g, "")
    str = str.replace(/ + /g, " ")
    str = str.trim()
    return str
  }
  function handleChangeSearch(e) {
    setUsers(users.filter(user => removeVietnameseTones(user.full_name).toLowerCase().includes(removeVietnameseTones(e.target.value).toLowerCase())))
    if (!e.target.value) {
      setUsers(usersData)
    }
  }

  return (
    <div className="popUpAddUserSchedule" onClick={(e) => { e.stopPropagation() }}>
      <input type="text" className="popUpAddUserSchedule__search" placeholder="Tìm kiếm..." onChange={(e) => { handleChangeSearch(e) }} />
      <div className="popUpAddUserSchedule__form">
        {users &&
          users.map((item, index) => {
            return (
              <div
                className="popUpAddUserSchedule__form--userItemCheck"
                key={`${index}${keyID}`}
              >
                <div className="left">
                  <div className="avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <span className="name">{item.full_name}</span>
                </div>

                <input
                  type="checkbox"
                  className="rightCheckbox"
                  data-id={item.id}
                  data-usercode={item.user_code}
                  data-fullname={item.full_name}
                  data-avatar={item.avatar}
                  onClick={(e) => handleClickCheckbox(e)}
                  onChange={() => null}
                  checked={checkStateCheckbox(item.id) ? 1 : 0}
                />
              </div>
            )
          })}
        <div className="itemEnd" ref={itemEnd}></div>
      </div>
      <button className="popUpAddUserSchedule__save" onClick={handleClickPopupAddUserSave}>
        Lưu
      </button>
    </div>
  )
}
