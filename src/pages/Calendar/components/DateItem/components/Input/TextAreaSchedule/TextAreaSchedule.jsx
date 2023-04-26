import React from 'react'
import {useController} from 'react-hook-form';
import './TextAreaSchedule.scss';

export default function TextAreaSchedule({control,...props}) {
    const {field}=useController({control,name:props.name,defaultValue:""});
  return (
    <div className='textAreaScheduleComponent'>
        <span className="textAreaScheduleComponent__title">{props.title}</span>
        <textarea {...field} {...props}/>
        <p className='textAreaScheduleComponent__error'>{`${props.error?props.error:""}`}</p>
    </div>

  )
}
