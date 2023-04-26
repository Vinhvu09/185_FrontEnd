import React from 'react'
import './PopupListUser.scss';

export default function PopupListUser({employees}) {


  return (
    <div className='popUpListUser'>
        {employees&&employees.map((item,index)=>{
            if(index>=3){
                return <div key={index} className="popUpListUser__item">
                    <img src={item.avatar} alt="" />
                    <span>{item.full_name}</span>
                </div>
            }
        })}
    </div>
  )
}
