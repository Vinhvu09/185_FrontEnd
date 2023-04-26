import React from 'react'
import { useController } from 'react-hook-form'
import './InputSchedule.scss';

export default function InputSchedule({control,...props}) {
    const {field}=useController({control,name:props.name,defaultValue:""});
  return (
    <div className='inputScheduleComponent'>
        <span className='inputScheduleComponent__title'>{props.title}</span>
        <input {...field} {...props} autoComplete="off"/>
        <p className='inputScheduleComponent__error'>{`${props.error?props.error:""}`}</p>

    </div>
  )
}
