import React from "react";
import ColumnDateItem from "./components/ColumnDateItem/ColumnDateItem";
import DataDateItem from "./components/DataDateItem/DataDateItem";
import RowTimeRange from "./components/RowTimeRange/RowTimeRange";
import "./WeekItem.scss";
export default function Week({ date,funcSetStartDate }) {

  function getSundayInWeek(date) {
    const firstSundayNumber = date.getDate() - date.getDay();
    return new Date(date.setDate(firstSundayNumber));
  }
  const handleClickNextWeek=()=>{
    funcSetStartDate(new Date(getSundayInWeek(date).setDate(getSundayInWeek(date).getDate()+7)))
  }

  const handleClickPreviousWeek=()=>{
    funcSetStartDate(new Date(getSundayInWeek(date).setDate(getSundayInWeek(date).getDate()-7)))
  }
  return (
    <div className="weekItem">
      <div className="weekItem__listDay">
        <div className="weekItem__listDay--next" 
            onClick={handleClickNextWeek}
            >
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
        <div className="weekItem__listDay--previous"
            onClick={handleClickPreviousWeek}
            >
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
        {Array.from(Array(7).keys()).map((index) => {
          return (
            <ColumnDateItem DateItem index={index} date={date} key={index}/>
          );
        })}
     
      </div>
      <div className="weekItem__list">
      <div className="weekItem__list--listData">
        {Array.from(Array(7).keys()).map((index) => {
          return (
            <DataDateItem index={index} date={date} key={index}/>
          );
        })}
          
        </div>
        <div className="weekItem__list--listTimeRange">
        {
            Array.from(Array(24).keys()).map((index)=>{
              return <RowTimeRange key={index} hour={index}/>;
            }
            )
          }
        </div>
      </div>
       
    </div>
  );
}
