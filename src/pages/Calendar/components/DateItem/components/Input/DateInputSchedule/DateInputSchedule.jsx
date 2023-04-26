import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { days,months } from '../../../../../../../constant/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './DateInputSchedule.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inputDateMeetingUpdate } from '../../../../../../../store/Reducer/meetingReducer';


const locale = {
    localize: {
        day: n => days[n],
        month: n => months[n]
    },
    formatLong: {
        date: () => "mm-dd-yyyy"
    }
};
export default function DateInputSchedule({control,...props}) {
  // const{dateMeetingUpdate}=useSelector(store=>store.meeting);
  const {getValues,setValue,formState:{errors}}=useFormContext();
  const [date,setDate] =useState(getValues(`schedule_date`)|| new Date());
  const dispatch=useDispatch();
  useEffect(()=>{
   
    if(getValues(`schedule_date`)){
      setValue(props.name,getValues(`schedule_date`))
    }else{
      setValue(props.name,new Date())
    }
  },[])
  return (
    <>
    {date && (
      <div className='dateInputScheduleComponent' style={{width:props.width}}>
      <span className='dateInputScheduleComponent__title'>{props.title}</span>
      <div className="dateInputScheduleComponent__display">
      <div className="dateInputScheduleComponent__display--overlay">
          <span>{`Ngày ${date.getDate()} tháng ${date.getMonth()+1}, ${date.getFullYear()}`}</span>
      </div>
      <Controller
        name={props.name}
        control={control}
        defaultValue={getValues(`schedule_date`)|| new Date()}
        selected={getValues(`schedule_date`)|| new Date()}
        render={({ field }) => (
      <DatePicker locale={locale} selected={getValues(`schedule_date`)|| new Date()} 
       onChange={date => {
        setDate(date)
          field.onChange(date);
          setValue(props.name,date)

      }} autoComplete="off"/>
          
        )}
      />

      </div>
    <p className='dateInputScheduleComponent__error'>{`${props.error?props.error:""}`}</p>

  </div>)
    }
   </>
  )
}
