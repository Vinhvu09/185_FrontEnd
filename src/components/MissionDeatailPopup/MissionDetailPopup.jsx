
import React, { useEffect, useState } from 'react';
import arrow from '../../assets/svg/arrowTo.svg';
import close from '../../assets/svg/close.svg';
import file from '../../assets/svg/img_file.svg';
import pdf from '../../assets/svg/pdf.svg';
import download from '../../assets/svg/download.svg';
import calendar from '../../assets/svg/missionCalendar.svg';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
import MainButton from '../MainButton/MainButton';
import MissionCalendarItem from '../MissionCalendarItem/MissionCalendarItem';
import MissionStatusOptions from '../MissionStatusOptions/MissionStatusOptions';
import PeopleList from '../PeopleList/PeopleList';
import StatusLoading from '../StatusLoading/StatusLoading';
import UploadGroup from '../UploadGroup/UploadGroup';
import './MissionDetailPopup.scss';
let list1 = [
    { avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'BbBb' },
    { avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80', name: 'HhHh' },
    { avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80', name: 'DdDd' },
];

let list2 = [
    { avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80', name: 'DdDd' },
    { avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'DdDd' },
];

let list3 = [
    { avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80', name: 'HhHh' },
];


let options = [
    {
        id: 0,
        name: 'Đang giao',
        color: '#E0E0E0',
        value: 'assigning'
    },
    {
        id: 1,
        name: 'Đang thực hiện',
        color: '#FFAF37',
        value: 'processing'

    },
    {
        id: 2,
        name: 'Đang duyệt',
        color: '#1A9AFF',
        value: 'waiting'
    },
    {
        id: 3,
        name: 'Hoàn thành',
        color: '#3CD5A3',
        value: 'completed',
    },
    {
        id: 4,
        name: 'Trễ',
        color: '#E62614',
        value: 'late'
    },
    {
        id: 5,
        name: 'Đóng nhiệm vụ',
        color: '#A56EF4',
        value: 'closed'
    },
];
export default function MissionDetailPopup({ handleClosePopupDetail }) {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenSynthesis, setIsOpenSynthesis] = useState(false);
    const [isOpenRelics, setIsOpenRelics] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenCalendarAnother, setIsOpenCalendarAnother] = useState(false);
    const [statusType, setStatusType] = useState({
        id: 0,
        name: 'Đang giao',
        color: '#E0E0E0',
        value: 'assigning'
    });
    const [isOpenStatusType, setIsOpenStatusType] = useState(false);
    const [getStartDate, setGetStartDate] = useState(null);
    const [getStartHour, setGetStartHour] = useState(null);
    const [getEndDate, setGetEndDate] = useState(null);
    const [getEndHour, setGetEndHour] = useState(null);
    const handleOpenCalendarPopup = (e) => {
        e.stopPropagation();
        setIsOpenCalendar(true);
    };
    const handleCloseCalendar = (e) => {
        e.stopPropagation();
        setIsOpenCalendar(false);
        setIsOpenCalendarAnother(false);
        setIsOpenStatusType(false);
    };
    const handleNextStatusType = () => {
        let id = statusType.id;
        if (id === 5) {
            setStatusType(options[0]);
        } else {
            setStatusType(options[++id]);
        }
    };
    const handleOpenStatusType = (e) => {
        e.stopPropagation();
        setIsOpenStatusType(!isOpenStatusType);
    };
    useEffect(() => {
        if (getStartDate && getStartHour && getEndDate && getEndHour) {
            setIsOpenCalendar(false);
        }
    }, [getStartDate, getStartHour, getEndDate, getEndHour]);

    return (
        <div className='missionDetailPopup' onClick={handleCloseCalendar}>
            <div className="missionDetailPopup__close" onClick={handleClosePopupDetail}>
                <img src={close} alt="close" />
            </div>
            <div className="missionDetailPopup__head">
                <div className="missionDetailPopup__head--left">
                    <div className={`item ${statusType.value}`} style={{ background: statusType.color }} onClick={handleOpenStatusType}>
                        <p>{statusType.name}</p>
                    </div>
                    <div className="next" style={{ background: statusType.color }} onClick={handleNextStatusType}>
                        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.0133 5.88369C5.83388 5.88426 5.65426 5.81439 5.51703 5.67424L1.19853 1.26169C0.923814 0.980993 0.922366 0.524489 1.19529 0.242173C1.46811 -0.0401439 1.91197 -0.0415524 2.18671 0.239027L6.00777 4.1435L9.80401 0.214992C10.0769 -0.067325 10.5208 -0.0687334 10.7953 0.211846C11.0702 0.492425 11.0716 0.948929 10.7986 1.23136L6.50822 5.67123C6.37181 5.81227 6.19264 5.88312 6.0133 5.88369Z"
                                fill={`${statusType.value === 'assigning' ? 'black' : 'white'}`} />
                        </svg>
                    </div>
                    <div className="save">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.32685 17.3209L4.37685 12.4933C4.07946 12.2033 4.07946 11.733 4.37685 11.443L5.4538 10.3926C5.75119 10.1026 6.2334 10.1026 6.53078 10.3926L9.86534 13.6447L17.0076 6.67907C17.305 6.38904 17.7872 6.38904 18.0846 6.67907L19.1615 7.72942C19.4589 8.01946 19.4589 8.48971 19.1615 8.77978L10.4038 17.3209C10.1064 17.611 9.62424 17.611 9.32685 17.3209Z" fill="black" />
                        </svg>
                    </div>
                    {isOpenStatusType && <MissionStatusOptions id={statusType.id} options={options} setStatusType={setStatusType} setIsOpenStatusType={setIsOpenStatusType} />}

                </div>
                <div className="missionDetailPopup__head--right">
                    <div className="timeWrapper">
                        {getStartDate && getStartHour && getEndDate && getEndHour ?
                            <>
                                {isOpenCalendar && <MissionCalendarItem setGetStartDate={setGetStartDate} setGetStartHour={setGetStartHour} setGetEndDate={setGetEndDate} setGetEndHour={setGetEndHour}
                                />}
                                <div className='timeWrapper__time' >
                                    <div className="timeWrapper__time--wrapper" onClick={handleOpenCalendarPopup}>
                                        <p className='date'>Ngày bắt đầu</p>
                                        <p className='time'>
                                            {('0' + getStartHour?.hour).slice('-2')}:{('0' + getStartHour?.minute).slice('-2')} {('0' + getStartDate?.getDate()).slice('-2')}/{('0' + (getStartDate?.getMonth() + 1)).slice('-2')}/{getStartDate?.getFullYear()}
                                        </p>
                                    </div>
                                    <div className="arrow">
                                        <img src={arrow} alt="arrow" />
                                    </div>
                                    <div className="timeWrapper__time--wrapper" onClick={handleOpenCalendarPopup}>
                                        <p className='date'>Ngày kết thúc</p>
                                        <div>
                                            <p className='time --end'>{('0' + getEndHour?.hour).slice('-2')}:{('0' + getEndHour?.minute).slice('-2')} {('0' + getEndDate?.getDate()).slice('-2')}/{('0' + (getEndDate?.getMonth() + 1)).slice('-2')}/{getEndDate?.getFullYear()}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="timeWrapper__img" onClick={handleOpenCalendarPopup}>
                                <img src={calendar} alt="calendar_icon" />
                                {isOpenCalendar && <MissionCalendarItem name="createMission" setGetStartDate={setGetStartDate} setGetStartHour={setGetStartHour} setGetEndDate={setGetEndDate} setGetEndHour={setGetEndHour} />}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="missionDetailPopup__main">
                <div className="missionDetailPopup__main--left">
                    <div className="input">
                        <input type="text" defaultValue={'Báo cáo hồ sơ tháng 2'} />
                    </div>
                    <div className="status">
                        <div style={{ background: statusType?.color }}></div>
                        <p>{statusType?.name}</p>
                    </div>
                    <div className="missionDetailPopup__room">
                        <div className="title">Phòng nhận nhiệm vụ</div>
                        <div className="missionDetailPopup__room--wrapper">
                            <div className="roomWrapper">
                                <CheckboxItem>Phòng HC-TH</CheckboxItem>
                                <PeopleList list={list1} />
                            </div>
                            <div className="roomWrapper">
                                <CheckboxItem>Phòng TBDT</CheckboxItem>
                                <PeopleList list={list2} />
                            </div>
                            <div className="roomWrapper">
                                <CheckboxItem>Phòng LHSDT</CheckboxItem>
                                <PeopleList list={list3} />
                            </div>
                        </div>
                    </div>
                    <div className="missionDetailPopup__des">
                        <label>
                            <div className="title">
                                Mô tả
                            </div>
                            <textarea defaultValue="Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis."></textarea>
                        </label>
                    </div>
                    <div className="missionDetailPopup__file">
                        <div className="title">Đính kèm nhiệm vụ</div>
                        <div className="missionDetailPopup__file--upload" style={{ position: 'relative' }}>
                            <input type="file" />
                            <div className="uploadFile__wrapper">
                                <UploadGroup sub="(JPG, PNG, PDF, Word, Excel) ">Kéo file vào đây hoặc bấm nút chọn tệp</UploadGroup>
                            </div>
                        </div>
                        <div className="title" style={{ marginBottom: '8px' }}>Tệp nhiệm vụ đính kèm</div>
                        <StatusLoading icon={file} name="Hình ảnh văn bản.png" />
                        <StatusLoading icon={pdf} name="Bảng báo cáo hồ sơ tháng 2.pdf" />
                    </div>
                    <div className="missionDetailPopup__file --bottom">
                        <div className="head">
                            <div className="title">Tệp của phòng ban</div>
                            <div className="download">
                                <div className="img">
                                    <img src={download} alt="download" />
                                </div>
                                <p>Tải về tất cả</p>
                            </div>
                        </div>
                        <div className="options">
                            <div className="list" onClick={() => setIsOpenSynthesis(prev => !prev)}>
                                <p>P. Hành Chính - Tổng Hợp</p>
                                {isOpenSynthesis &&
                                    <div className="list__wrapper">
                                        <div className="list__wrapper--name">Trần Đăng Huy</div>
                                        <StatusLoading icon={file} name="Hình ảnh văn bản.png" />
                                        <StatusLoading icon={pdf} name="Bảng báo cáo hồ sơ tháng 2.pdf" />
                                    </div>
                                }

                            </div>
                            <div className="list" onClick={() => setIsOpenRelics(prev => !prev)}>
                                <p>P. Tu Bổ Di Tích</p>
                                {isOpenRelics &&
                                    <div className="list__wrapper">
                                        <div className="list__wrapper--name">Nguyễn Công Anh</div>
                                        <StatusLoading icon={file} name="Hình ảnh văn bản.png" />
                                        <StatusLoading icon={pdf} name="Bảng báo cáo hồ sơ tháng 2.pdf" />
                                    </div>
                                }

                            </div>
                            <div className="list" onClick={() => setIsOpenProfile(prev => !prev)}>
                                <p>P. Lập hồ sơ Di Tích</p>
                                {isOpenProfile &&
                                    <div className="list__wrapper">
                                        <div className="list__wrapper--name">Phạm Minh Thu</div>
                                        <StatusLoading icon={file} name="Hình ảnh văn bản.png" />
                                        <StatusLoading icon={pdf} name="Bảng báo cáo hồ sơ tháng 2.pdf" />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="missionDetailPopup__main--right">
                    <div className="userContentWrapper">
                        <div className="userContent">
                            <div className="userContent__head">
                                <div className="userContent__head--left">
                                    <div className="img">
                                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="avatar" />
                                    </div>
                                    <p className="name">Lâm Thiếu Kỳ</p>
                                </div>
                                <div className="userContent__head--right">
                                    <p className="time">2 tiếng trước</p>
                                </div>
                            </div>
                            <div className="content">
                                Tôi thấy file này không hợp lí!
                            </div>
                        </div>
                        <div className="userContent">
                            <div className="userContent__head">
                                <div className="userContent__head--left">
                                    <div className="img">
                                        <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80" alt="avatar" />
                                    </div>
                                    <p className="name">Trần Đăng Huy</p>
                                </div>
                                <div className="userContent__head--right">
                                    <p className="time">2 tiếng trước</p>
                                </div>
                            </div>
                            <div className="content">
                                Đúng rồi! Tôi cảm thấy quá dài và dư thừa
                            </div>
                        </div>
                    </div>
                    <div className="typeText">
                        <input type="text" placeholder='Viết bình luận tại đây' />
                        <MainButton className="mainButton small">Gửi</MainButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

