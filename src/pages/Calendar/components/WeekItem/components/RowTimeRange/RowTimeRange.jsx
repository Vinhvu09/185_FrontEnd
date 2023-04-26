import React from 'react'
import './RowTimeRange.scss';
export default function RowTimeRange({hour}) {

    function getTimeRangeDisplay(hour){
        if(hour*1 <10){
            return `0${hour}:00`
        }
        else
        return `${hour}:00`
    }
  return (
    <div className='rowTimeRange'>
        <div className="rowTimeRange__left">
        {getTimeRangeDisplay(hour)}

        </div>
        <div className="rowTimeRange__right">

        </div>
    </div>
  )
}
