import React, { useEffect } from 'react'
import './SliderDayItem.scss';

export default function SliderDayItem({dayOfWeek,day,activeClassName,month,year}) {
    if(day<10){
        day=`0${day}`;
    }


  return (
    <div className={`sliderDayItem ${activeClassName}`} month={month} year={year} day={day}>
        <span className="sliderDayItem-dayOfWeek">{dayOfWeek}</span>
        <div className="sliderDayItem-day">{day}</div> 
      {dayOfWeek==="CN"?<div className="sundayItem"></div> :<></>}  
    </div>
  )
}
