import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addIcon from '../../assets/svg/add.svg';
import MissionCreatePopup from '../../components/MissionCreatePopup/MissionCreatePopup';
import MissionStatus from '../../components/MissionStatus/MissionStatus';
import MissionTitle from '../../components/MissionTitle/MissionTitle';
import RedirectHead from '../../components/RedirectHead/RedirectHead';
import { fetchMissionList } from '../../store/Reducer/missionReducer';
import './MissionSynthesis.scss';
let data = [
    { id: 1, name: 'Quản lí tài khoản', path: '/admin/staffs' },
    { id: 2, name: 'Nhiệm vụ', path: '#' },
    { id: 3, name: 'Tổng hợp', path: '#' },
];

const missionData = {
    Assigning: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đang giao',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang giao',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang giao',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang giao',
                end_date: Date.now()
            },
        ]
    },
    Processing: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đang thực hiện',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang thực hiện',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang thực hiện',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang thực hiện',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang thực hiện',
                end_date: Date.now()
            },
        ]
    },
    Waiting: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đang chờ duyệt',
                end_date: Date.now()
            },
        ]
    },
    Completed: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đã hoàn thành',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã hoàn thành',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã hoàn thành',
                end_date: Date.now()
            },
        ]
    },
    Late: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã trễ',
                end_date: Date.now()
            },
        ]
    },
    Closed: {
        missions: [
            {
                name: 'Đây là tiêu đề nhiệm vụ đã đóng',
                end_date: Date.now()
            },
            {
                name: 'Đây là tiêu đề nhiệm vụ đã đóng',
                end_date: Date.now()
            },
        ]
    },
};

export default function MissionSynthesis() {
    const [isOpenStatus, setIsOpen] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isOpenMissionClosed, setIsOpenMissionClosed] = useState(false);
    const { missions } = useSelector(store => store.mission);
    let dispatch = useDispatch();
    const handleOpenStatus = () => {
        setIsOpen(!isOpenStatus);
    };
    const handleOpenPopup = (e) => {
        e.stopPropagation();
        setIsPopup(true);
    };
    useEffect(() => {
        dispatch(fetchMissionList());
    }, []);
    useEffect(() => {
        window.addEventListener('click', () => {
            setIsPopup(false);
        });
        return () => {
            window.removeEventListener('click', () => {
                setIsPopup(false);
            });
        };
    }, []);
    return (
        <div className='missionSynthesis'>
            {isPopup &&
                <div className='missionPopup'>
                    <MissionCreatePopup setIsPopup={setIsPopup} />
                </div>
            }
            <div className="container-fluid">
                <div className="missionSynthesis__head">
                    <RedirectHead onClick={handleOpenPopup} data={data} className="mainButton" icon={addIcon}>Tạo nhiệm vụ</RedirectHead>
                </div>
                <div className="missionSynthesis__main">
                    <MissionTitle name="Tổng hợp" isOpen={isOpenStatus} toggleCloseMission={setIsOpenMissionClosed} onClick={handleOpenStatus} />
                    {isOpenStatus &&
                        <div className="container-fluid">
                            <MissionStatus name="Đang giao" status="assigning" data={missionData?.Assigning?.missions} />
                            <MissionStatus name="Đang xử lí" status="processing" data={missionData?.Processing?.missions} />
                            <MissionStatus name="Chờ duyệt" status="waiting" data={missionData?.Waiting?.missions} />
                            <MissionStatus name="Hoàn thành" status="completed" data={missionData?.Completed?.missions} />
                            <MissionStatus name="Trễ" status="late" data={missionData?.Late?.missions} />
                            {isOpenMissionClosed && <MissionStatus name="Đã đóng" status="closed" data={missionData?.Closed?.missions} />}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
