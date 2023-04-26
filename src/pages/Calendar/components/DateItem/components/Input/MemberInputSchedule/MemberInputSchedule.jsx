import { getMergedStatus } from "antd/lib/_util/statusUtils";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addEditSchedule } from "../../../../../../../store/Reducer/meetingReducer";
import "./MemberInputSchedule.scss";
export default function MemberInputSchedule({ name, users, width, state }) {
  const { usersMeetingUpdate, editSchedule } = useSelector((store) => store.meeting);
  const { setValue, getValues, watch } = useFormContext();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [sate, setState] = useState(1);
  const dispatch = useDispatch();
  const [attendEmployee, setAttendEmployee] = useState(watch(`employees`) || []);
  window.addEventListener("click", (e) => {
    if (e.target.className === "memberInputSchedule__input") {
      document
        .querySelector(".activeInputMember")
        ?.classList.remove("activeInputMember");
      e.target.nextSibling.nextSibling.classList.add("activeInputMember");
    }
    if (
      e.target.className !== "memberInputSchedule__input" &&
      e.target.className !==
      "memberInputSchedule__inputMember--userItemCheck" &&
      e.target.className !== "rightCheckbox"
    ) {
      document
        .querySelector(".activeInputMember")
        ?.classList.remove("activeInputMember");
    }
  });
  function handleClickCheckbox(e) {
    if (e.target.checked) {
      let id = e.target.getAttribute("data-id") * 1;
      let user_code = e.target.getAttribute("data-usercode");
      let full_name = e.target.getAttribute("data-fullname");
      let avatar = e.target.getAttribute("data-avatar");

      const userData = { id, user_code, full_name, avatar };

      let employeesNew = getValues('employees') || [];
      employeesNew.push(userData);
      setValue('employees', employeesNew);
      setAttendEmployee(employeesNew);

      // forceUpdate();
    }
    if (!e.target.checked) {
      let id = e.target.getAttribute("data-id") * 1;
      let employeesNew = getValues('employees') || [];
      employeesNew = [...employeesNew].filter(employee => employee.id !== id);
      setAttendEmployee(employeesNew);
      setValue('employees', employeesNew);
      // forceUpdate();  

    }
  }

  function getSameUser(array1, array2) {
    return array1.filter((object1) => {
      return array2.some((object2) => {
        return object1.id * 1 === object2.id * 1;
      });
    });



  }
  function checkStateCheckbox(id) {
    let checkState = false;
    const usersMeetingData = getValues('employees') || [];
    for (let index = 0; index < usersMeetingData.length; index++) {
      const element = usersMeetingData[index];
      if (element.id * 1 === id * 1) {
        checkState = true;
      }
    }
    return checkState;
  }

  useEffect(() => {
    if (editSchedule && state === "edit") {
      setValue('employees', editSchedule?.employees);
      setAttendEmployee(editSchedule?.employees);
    }
  }, [editSchedule]);

  // 
  return (
    <div className="memberInputSchedule" style={{ width: width }}>
      <div className="memberInputSchedule__input">
        <span className="memberInputSchedule__input--text">{name}</span>
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
            fill="#4F5052"
          />
        </svg>
      </div>
      <div className="memberInputSchedule__listImageMember">

        {getSameUser(users, attendEmployee).map((item, index) => {
          return (
            <div
              key={uuidv4()}
              className="memberInputSchedule__listImageMember--image"
              style={{ left: `${index * 24}px`, zIndex: `${index}` }}
            >
              <img src={item.avatar} alt="" />
            </div>
          );
        })}
      </div>

      <div className="memberInputSchedule__inputMember">
        {users &&
          users.map((item) => {
            console.log(item);
            return (
              <div
                className="memberInputSchedule__inputMember--userItemCheck"
                key={uuidv4()}
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
            );
          })}
      </div>
    </div>
  );
}
