import React, { useState } from 'react';
import deleteIcon from '../../assets/svg/delete.svg';
import './MissionStatusItem.scss';
import PeopleList from '../PeopleList/PeopleList';
import MissionDetailPopup from '../MissionDeatailPopup/MissionDetailPopup';
let list = [
    { avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'BbBb' },
    { avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80', name: 'HhHh' },
    { avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'DdDd' },
    { avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80', name: 'DdDd' },
];
export default function MissionStatusItem({ content, hour, date, employees }) {
    const [value, setValue] = useState(content);
    const [isOpenPopupDetail, setIsOpenPopupDetail] = useState(false);
    const handleChangInput = (e) => {
        let value = e.currentTarget.value;
        setValue(value);
    };
    const handleOpenPopupDetail = () => {
        setIsOpenPopupDetail(true);
    };
    const handleClosePopupDetail = (e) => {
        e.stopPropagation();
        setIsOpenPopupDetail(false);
    };
    return (
        <div className='missionStatusItem' onClick={handleOpenPopupDetail}>
            {isOpenPopupDetail &&
                <div className="missionStatusItem__popup" onClick={handleClosePopupDetail}>
                    <MissionDetailPopup handleClosePopupDetail={handleClosePopupDetail} />
                </div>
            }
            <div className="left">
                <div className="square"></div>
                <div className="input">
                    <input type="text" value={value} onChange={handleChangInput} />
                </div>
            </div>
            <div className="right">
                <div className="people">
                    <PeopleList list={list} />
                </div>
                <div className="time">
                    <div className="hour">{hour}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="delete">
                    <img src={deleteIcon} alt="delete_icon" />
                </div>
            </div>
        </div>
    );
}
