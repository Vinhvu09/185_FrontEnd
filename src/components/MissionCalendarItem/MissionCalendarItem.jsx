import React, { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import { days, months } from "../../constant/constant";
import './MissionCalendarItem.scss';
const locale = {
    localize: {
        day: (n) => days[n],
        month: (n) => months[n],
    },
    formatLong: {
        date: () => "mm-dd-yyyy",
    },
};
export default function MissionCalendarItem({ setGetStartDate, setGetStartHour, setGetEndDate, setGetEndHour }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [startHour, setStartHour] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [isActiveTime, setIsAcTiveTime] = useState(0);
    const timeRef = useRef([{ hour: 0, minute: 0 }]);
    while (timeRef.current[timeRef.current.length - 1].hour < 24) {
        let data = timeRef.current[timeRef.current.length - 1].minute;
        if (data + 15 === 60) {
            timeRef.current.push({ hour: timeRef.current[timeRef.current.length - 1].hour + 1, minute: 0 });
        } else {
            timeRef.current.push({ hour: timeRef.current[timeRef.current.length - 1].hour, minute: data + 15 });
        }
    }
    useEffect(() => {
        if (endDate && startHour && endHour && startDate) {
            setGetStartDate(startDate);
            setGetEndDate(endDate);
            setGetStartHour(startHour);
            setGetEndHour(endHour);
        }
    }, [startDate, endDate, startHour, endHour]);
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const handleDeleteStart = () => {
        setStartHour(null);
    };
    const handleDeleteEnd = () => {
        setEndHour(null);
    };
    const handleTime = (index, data) => {
        setIsAcTiveTime(index);
        if (startHour) {
            setEndHour(data);
        } else {
            setStartHour(data);
        }
    };
    return (
        <div className='missionCalendarItem' onClick={(e) => e.stopPropagation()}>
            <div className="missionCalendarItem__head">
                <div className="missionCalendarItem__head--left">
                    {startDate &&
                        <div className='wrapper'>
                            <div className="wrapper__left">
                                <div>{`${('0' + startDate.getDate()).slice(-2)}/${('0' + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}`}</div>
                            </div>
                            <div className="wrapper__right">
                                {startHour ?
                                    <div className='wrapper__right--item'>
                                        <div>{('0' + startHour.hour).slice(-2)} giờ {('0' + startHour.minute).slice(-2)} phút</div>
                                        {startDate && startHour ?
                                            <div className='svg' onClick={handleDeleteStart}>
                                                <CloseSvg />
                                            </div>
                                            :
                                            ''}
                                    </div>
                                    :
                                    <p>Thêm thời gian</p>
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className="missionCalendarItem__head--right">
                    {endDate ?
                        <div className='container'>
                            <div className='container__date'>{`${('0' + endDate.getDate()).slice(-2)}/${('0' + (endDate.getMonth() + 1)).slice(-2)}/${endDate.getFullYear()}`}</div>
                            <img src="" alt="" />
                        </div>
                        :
                        <p>Ngày kết thúc</p>
                    }
                    {endHour ?
                        <div className="container">
                            <div className='container__hour'>{('0' + endHour.hour).slice(-2)} giờ {('0' + endHour.minute).slice(-2)} phút</div>
                            {endDate && endHour ?
                                <div className='svg' onClick={handleDeleteEnd}>
                                    <CloseSvg />
                                </div>
                                :
                                ''}
                        </div>
                        :
                        <p>Thêm thời gian</p>
                    }

                </div>
            </div>
            <div className="missionCalendarItem__main">
                <div className="missionCalendarItem__main--left">
                    <DatePicker
                        locale={locale}
                        selected={endDate ? endDate : startDate}
                        onChange={onChangeDate}
                        endDate={endDate}
                        startDate={startDate}
                        selectsRange
                        inline
                    />
                </div>
                <div className="missionCalendarItem__main--right">
                    {timeRef.current.map((e, index) => {
                        return <div key={index} className={`timeItem ${index === isActiveTime ? 'active' : ''}`} onClick={() => {
                            handleTime(index, e);
                        }}>
                            <p>{('0' + e.hour).slice(-2)}:{('0' + e.minute).slice(-2)}</p>
                        </div>;
                    })}
                </div>
            </div>

        </div>
    );
};


function CloseSvg() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.581 0 0 3.582 0 8C0 12.418 3.581 16 8 16C12.419 16 16 12.418 16 8C16 3.582 12.419 0 8 0ZM11.707 10.293C11.8945 10.4805 11.9998 10.7348 11.9998 11C11.9998 11.2652 11.8945 11.5195 11.707 11.707C11.5195 11.8945 11.2652 11.9998 11 11.9998C10.7348 11.9998 10.4805 11.8945 10.293 11.707L8 9.414L5.707 11.707C5.61435 11.8002 5.50419 11.8741 5.38285 11.9246C5.26152 11.9751 5.13141 12.001 5 12.001C4.86859 12.001 4.73848 11.9751 4.61715 11.9246C4.49581 11.8741 4.38565 11.8002 4.293 11.707C4.20005 11.6142 4.12632 11.504 4.07601 11.3827C4.0257 11.2614 3.9998 11.1313 3.9998 11C3.9998 10.8687 4.0257 10.7386 4.07601 10.6173C4.12632 10.496 4.20005 10.3858 4.293 10.293L6.586 8L4.293 5.707C4.10549 5.51949 4.00015 5.26518 4.00015 5C4.00015 4.73482 4.10549 4.48051 4.293 4.293C4.48051 4.10549 4.73482 4.00015 5 4.00015C5.26518 4.00015 5.51949 4.10549 5.707 4.293L8 6.586L10.293 4.293C10.4805 4.10549 10.7348 4.00015 11 4.00015C11.2652 4.00015 11.5195 4.10549 11.707 4.293C11.8945 4.48051 11.9998 4.73482 11.9998 5C11.9998 5.26518 11.8945 5.51949 11.707 5.707L9.414 8L11.707 10.293Z" fill="#1A48E9" />
        </svg>

    );
}