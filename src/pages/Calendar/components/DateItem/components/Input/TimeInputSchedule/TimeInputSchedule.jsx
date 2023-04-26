import { getValue } from "@testing-library/user-event/dist/utils"
import { useReducer } from "react"
import { useController, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  inputHourMeetingEnd,
  inputHourMeetingStart,
  inputMinuteMeetingEnd,
  inputMinuteMeetingStart
} from "../../../../../../../store/Reducer/meetingReducer";
import "./TimeInputSchedule.scss";

export default function TimeInputSchedule({ control, type,dataValue,firstValue, ...props }) {

  const {setValue,getValues}=useFormContext();
  const [,forceRender] = useReducer((s) => s+1, 0)
  window.addEventListener("click",(e)=>{
  
    if(e.target.className!=="timeInputScheduleComponent__autoData--item"&& e.target.className!=="inputEditMeetingTime"){
      document.querySelector(".activeTimeInput")?.classList.remove("activeTimeInput");
    }
    if(e.target.className==="inputEditMeetingTime"){
      
      document.querySelector(".activeTimeInput")?.classList.remove("activeTimeInput");
      e.target.nextSibling.classList.add("activeTimeInput");
    }
     
    
  })

 
  const handleClickAutoDataItem = (e) => {
    e.target.parentNode.classList.remove("activeTimeInput");
    setValue(props.name,e.target.innerHTML)
    forceRender();

  };
  return (
    <div className="timeInputScheduleComponent">
      <input
        type="text"
        className="inputEditMeetingTime"
        {...props}
        autoComplete="off"
        readOnly
        value={getValues(props.name)||""}
      />

      <>
        <div className="timeInputScheduleComponent__autoData">
          {type === "hours" ? (
            Array.from({ length: 24 }, (_, i) => i).map((item, index) => {
              return (
                <span
                  key={index}
                  className="timeInputScheduleComponent__autoData--item"
                  onClick={handleClickAutoDataItem}
                >
                  {item <= 9 ? `0${item}` : item}
                </span>
              );
            })
          ) : (
            <></>
          )}
          {type === "minutes" ? (
            Array.from({ length: 12 }, (_, i) => i + 1).map((item, index) => {
              return (
                <span
                  key={index}
                  className="timeInputScheduleComponent__autoData--item"
                  onClick={handleClickAutoDataItem}
                >
                  {index * 5 <= 9 ? `0${index * 5}` : index * 5}
                </span>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </>
    </div>
  );
}
