import React from 'react';
import './MissionStatusOption.scss';
let options = [
    {
        id: 1,
        name: 'Đang giao',
        color: '#E0E0E0',
        value: 'assigning'
    },
    {
        id: 2,
        name: 'Đang thực hiện',
        color: '#FFAF37',
        value: 'processing'

    },
    {
        id: 3,
        name: 'Đang duyệt',
        color: '#1A9AFF',
        value: 'waiting'
    },
    {
        id: 4,
        name: 'Hoàn thành',
        color: '#3CD5A3',
        value: 'completed',
    },
    {
        id: 5,
        name: 'Trễ',
        color: '#E62614',
        value: 'late'
    },
    {
        id: 6,
        name: 'Đóng nhiệm vụ',
        color: '#A56EF4',
        value: 'closed'
    },
];

export default function MissionStatusOptions({ options, setStatusType, setIsOpenStatusType, id }) {
    const handleSetStatusType = (data) => {
        setStatusType(data);
        setIsOpenStatusType(false);
    };
    return (
        <div className='missionStatusOptions'>
            {options?.map(e => {
                return <div className={`missionStatusOptions__item ${id === e.id ? 'active' : ''}`} key={e.id} onClick={() => handleSetStatusType(e)}>
                    <div className="square" style={{ backgroundColor: e.color }}></div>
                    <div className="content">
                        {e.name}
                    </div>
                </div>;
            })}

        </div>
    );
}
