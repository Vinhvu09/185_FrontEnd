import React from "react";
import MonthItemDate from "./components/MonthItemDate/MonthItemDate";
import "./MonthItem.scss";

export default function MonthItem({date}) {
  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  function checkYear(year) {
    if (year % 4 === 0 && year % 100 !== 0) {
      return true;
    }
    if (year % 400 === 0) {
      return true;
    }
    return false;
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
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      case 2:
        if (checkYear(year)) return 29;
        else return 28;

      default:
        return 30;
    }
  }
  return (
    <div className="monthItem">
      <div className="monthItem__days">
        {days.map((day, index) => {
          return (
            <div className="monthItem__days--item" key={index}>
              {day}
              <div className={`borderRight ${day==="Thứ 7"?"displayNone":""}`}></div>
            </div>
          );
        })}
      </div>
      <div className="monthItem__dates">
            {
                Array.from(Array(countDateInMonth(date.getMonth()+1,date.getFullYear())).keys()).map((index)=>{
                    return <MonthItemDate key={index} dateNum={index+1} startDate={date} />
                })
            }
      </div>
    </div>
  );
}
