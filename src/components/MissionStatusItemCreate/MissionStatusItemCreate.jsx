import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import deleteIcon from '../../assets/svg/cancel.svg';
import calendar from '../../assets/svg/missionCalendar.svg';
import { peopleList } from '../../constant/constant';
import MissionCalendarItem from '../MissionCalendarItem/MissionCalendarItem';
import PeopleList from '../PeopleList/PeopleList';
import PopOver from '../PopOver/PopOver';
import './MissionStatusItemCreate.scss';
export default function MissionStatusItemCreate({ setIsOpen }) {
    const [isCalendar, setIsCalendar] = useState(false);
    const [isTime, setIsTime] = useState(false);
    const [getStartDate, setGetStartDate] = useState('');
    const [getEndDate, setGetEndDate] = useState('');
    const [getStartHour, setGetStartHour] = useState('');
    const [getEndHour, setGetEndHour] = useState('');
    const [isPopupPeople, setIsPopupPeople] = useState(false);
    const [myList, setMyList] = useState([]);
    console.log(getEndHour?.hour);
    const date = useMemo(() => {
        let result = '';
        if (getEndDate) {
            result = ('0' + getEndDate?.getDate()).slice(-2) + '/' + ('0' + (getEndDate?.getMonth() + 1)).slice(-2) + '/' + (getEndDate?.getFullYear());
        }
        return result;
    }, [getEndDate]);
    const handleShowCalendar = (e) => {
        e.stopPropagation();
        setIsCalendar(true);
    };
    const handleAction = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        window.addEventListener('click', () => {
            setIsCalendar(false);
        });
        return () => {
            window.removeEventListener('click', () => {
                setIsCalendar(false);
            });
        };
    }, []);
    useEffect(() => {
        if (getStartDate && getEndDate && getStartHour && getEndHour) {
            setIsCalendar(false);
            setIsTime(true);
        }
    }, [getStartDate, getEndDate, getStartHour, getEndHour]);
    return (
        <div className='missionStatusItemCreate inProgress'>
            <div className="left">
                <div className="square"></div>
                <div className="input">
                    <input type="text" placeholder='Nhập tiêu đề nhiệm vụ...' />
                </div>
            </div>
            <div className="right">
                <div className="people" onClick={(e) => {
                    e.stopPropagation();
                    setIsPopupPeople(prev => !prev);
                }}>
                    <PeopleList list={myList} />
                    {isPopupPeople && <PopOver list={peopleList} setData={setMyList} isType="avatar" data={myList} onClick={(e) => e.stopPropagation()} />}
                </div>
                {isTime &&
                    <div className="time">
                        <div className="hour">{`${('0' + getEndHour?.hour).slice(-2)}:${('0' + getEndHour?.minute).slice(-2)}`}</div>
                        <div className="date">{date}</div>
                    </div>
                }
                {!isTime &&
                    <div className="calendar" onClick={handleShowCalendar}>
                        <img src={calendar} alt="calendar_icon" />
                        {isCalendar && <MissionCalendarItem setGetStartDate={setGetStartDate} setGetEndDate={setGetEndDate} setGetStartHour={setGetStartHour} setGetEndHour={setGetEndHour} />}
                    </div>
                }

                <div className="missionStatusItemCreate__options">
                    <p onClick={handleAction}>Lưu</p>
                    <img src={deleteIcon} alt="delete_icon" onClick={handleAction} />
                </div>
            </div>
        </div>
    );
}
