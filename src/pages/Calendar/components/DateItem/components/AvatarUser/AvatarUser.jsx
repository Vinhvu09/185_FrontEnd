import React from 'react'
import './AvatarUser.scss';

export default function AvatarUser({avatar,fullName,department}) {

    function getDepartment(department){
        if(department===1){
           return "Phòng Hành Chính - Tổng Hợp"
        }
        if(department===2){
            return "Phòng Tu bổ Di tích"
        }
        if(department===3){
            return "Phòng Lập hồ sơ Di tích"

        }
    }
  return (
    <div className='avatarUser'>
        <img src={avatar} alt="" />
        <div className="avatarUser__info">
            <div className="avatarUser__info--avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="avatarUser__info--detail">
                <h2>{fullName}</h2>
                <span>{getDepartment(department)}</span>
            </div>
        </div>
    </div>
  )
}
