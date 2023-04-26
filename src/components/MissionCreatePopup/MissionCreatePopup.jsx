import React from 'react';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import PeopleList from '../PeopleList/PeopleList';
import calendar from '../../assets/svg/missionCalendar.svg';
import arrow from '../../assets/svg/arrowTo.svg';
import './MissionCreatePopup.scss';
import UploadGroup from '../UploadGroup/UploadGroup';
import MainButton from '../MainButton/MainButton';
import { peopleList } from '../../constant/constant';

import { useState } from 'react';
import MissionCalendarItem from '../MissionCalendarItem/MissionCalendarItem';
import PopOver from '../PopOver/PopOver';
import { useEffect } from 'react';


export default function MissionCreatePopup({ setIsPopup }) {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [getStartDate, setGetStartDate] = useState(null);
    const [getStartHour, setGetStartHour] = useState(null);
    const [getEndDate, setGetEndDate] = useState(null);
    const [getEndHour, setGetEndHour] = useState(null);
    const [isPopupPeople, setIsPopupPeople] = useState(false);
    const [myList, setMyList] = useState([]);
    const handleClosePopup = () => {
        setIsPopup(false);
    };
    const handleCloseCalendarPopup = (e) => {
        e.stopPropagation();
        setIsOpenCalendar(false);
        setIsPopupPeople(false);

    };
    const handleOpenCalendarPopup = (e) => {
        e.stopPropagation();
        setIsOpenCalendar(true);
    };
    const handleClearTime = () => {
        setGetStartDate(null);
        setGetStartHour(null);
        setGetEndDate(null);
        setGetEndHour(null);
    };

    return (
        <div className='missionCreatePopup' onClick={handleCloseCalendarPopup}>
            <h3>Tạo nhiệm vụ mới</h3>
            <div className="missionCreatePopup__main">
                <label className='missionCreatePopup__main--group'>
                    <div className="title">Tên nhiệm vụ</div>
                    <input type="text" />
                </label>
                <label className='missionCreatePopup__main--group'>
                    <div className="title">Mô tả</div>
                    <textarea></textarea>
                </label>
                <div className="missionCreatePopup__main--group --mission">
                    <div className="title">Phòng nhận nhiệm vụ</div>
                    <div className="wrapper">
                        <div className="group__left">
                            <CheckboxItem>Phòng hành chính tổng hợp</CheckboxItem>
                            <CheckboxItem>Phòng tu bổ di tích</CheckboxItem>
                            <CheckboxItem>Phòng Lập Hồ Sơ Di Tích</CheckboxItem>
                        </div>
                        <div className="peopleReceive" onClick={(e) => {
                            e.stopPropagation();
                            setIsPopupPeople(prev => !prev);
                        }}>
                            <p>Người nhận</p>
                            <PeopleList list={myList} />
                            {isPopupPeople && <PopOver list={peopleList} setData={setMyList} isType="avatar" data={myList} onClick={(e) => e.stopPropagation()} />}
                        </div>
                    </div>
                </div>
                <div className="missionCreatePopup__main--group --time">
                    <div className="title">Thời gian</div>
                    <div className="timeWrapper">
                        {getStartDate && getStartHour && getEndDate && getEndHour ?
                            <div className='timeWrapper__time'>
                                <div className="timeWrapper__time--wrapper">
                                    <p className='date'>Ngày bắt đầu</p>
                                    <p className='time'>
                                        {('0' + getStartHour.hour).slice('-2')}:{('0' + getStartHour.minute).slice('-2')} {('0' + getStartDate.getDate()).slice('-2')}/{('0' + (getStartDate.getMonth() + 1)).slice('-2')}/{getStartDate.getFullYear()}
                                    </p>
                                </div>
                                <div className="arrow">
                                    <img src={arrow} alt="arrow" />
                                </div>
                                <div className="timeWrapper__time--wrapper">
                                    <p className='date'>Ngày kết thúc</p>
                                    <div onClick={handleClearTime}>
                                        <p className='time --end'>{('0' + getEndHour.hour).slice('-2')}:{('0' + getEndHour.minute).slice('-2')} {('0' + getEndDate.getDate()).slice('-2')}/{('0' + (getEndDate.getMonth() + 1)).slice('-2')}/{getEndDate.getFullYear()}</p>
                                        <div className="img">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 0C3.581 0 0 3.582 0 8C0 12.418 3.581 16 8 16C12.419 16 16 12.418 16 8C16 3.582 12.419 0 8 0ZM11.707 10.293C11.8945 10.4805 11.9998 10.7348 11.9998 11C11.9998 11.2652 11.8945 11.5195 11.707 11.707C11.5195 11.8945 11.2652 11.9998 11 11.9998C10.7348 11.9998 10.4805 11.8945 10.293 11.707L8 9.414L5.707 11.707C5.61435 11.8002 5.50419 11.8741 5.38285 11.9246C5.26152 11.9751 5.13141 12.001 5 12.001C4.86859 12.001 4.73848 11.9751 4.61715 11.9246C4.49581 11.8741 4.38565 11.8002 4.293 11.707C4.20005 11.6142 4.12632 11.504 4.07601 11.3827C4.0257 11.2614 3.9998 11.1313 3.9998 11C3.9998 10.8687 4.0257 10.7386 4.07601 10.6173C4.12632 10.496 4.20005 10.3858 4.293 10.293L6.586 8L4.293 5.707C4.10549 5.51949 4.00015 5.26518 4.00015 5C4.00015 4.73482 4.10549 4.48051 4.293 4.293C4.48051 4.10549 4.73482 4.00015 5 4.00015C5.26518 4.00015 5.51949 4.10549 5.707 4.293L8 6.586L10.293 4.293C10.4805 4.10549 10.7348 4.00015 11 4.00015C11.2652 4.00015 11.5195 4.10549 11.707 4.293C11.8945 4.48051 11.9998 4.73482 11.9998 5C11.9998 5.26518 11.8945 5.51949 11.707 5.707L9.414 8L11.707 10.293Z" fill="#1A48E9" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="timeWrapper__img" onClick={handleOpenCalendarPopup}>
                                <img src={calendar} alt="calendar_icon" />
                                {isOpenCalendar && <MissionCalendarItem name="createMission" setGetStartDate={setGetStartDate} setGetStartHour={setGetStartHour} setGetEndDate={setGetEndDate} setGetEndHour={setGetEndHour} />}
                            </div>
                        }
                    </div>
                </div>
                <div className="missionCreatePopup__main--group --files">
                    <div className="title">Thêm tệp tin</div>
                    <div className="input">
                        <UploadGroup sub="JPG, PNG hoặc PDF, Word, Excel">Chọn một tệp tin hoặc kéo và thả ở đây</UploadGroup>
                        <input type="file" multiple />
                    </div>
                </div>
                <div className="missionCreatePopup__main--group --button">
                    <MainButton onClick={handleClosePopup} className="mainButton white small">Hủy</MainButton>
                    <MainButton onClick={handleClosePopup} className="mainButton small">Lưu</MainButton>
                </div>
            </div>
        </div>
    );
}
