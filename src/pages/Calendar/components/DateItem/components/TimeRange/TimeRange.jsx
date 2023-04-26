import React from 'react'
import './TimeRange.scss';

export default function TimeRange({numHour}) {
    if(numHour<10){
        numHour=`0${numHour}`
    }
  return (
    <div className='timeRange'>
        <div className="timeRange-left">
            <span>{numHour}:00</span>
        </div>
        <div className="timeRange-right">
        </div>
    </div>
  )
}
