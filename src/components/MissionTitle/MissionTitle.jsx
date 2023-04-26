import React, { useState } from 'react';
import './MissionTitle.scss';
import arrow from '../../assets/svg/arrow_down.svg';
import CheckboxItem from '../CheckboxItem/CheckboxItem';
export default function MissionTitle({ name, isOpen, toggleCloseMission, ...rest }) {
    return (
        <div className='missionTitle'>
            <div className="left" {...rest}>
                <div className={`img ${isOpen && 'open'}`}>
                    <img src={arrow} alt="arrow_svg" />
                </div>
                <div className="name">{name}</div>
            </div>
            <div className="right">
                <CheckboxItem toggleCloseMission={toggleCloseMission}>
                    Hiện nhiệm vụ đã đóng
                </CheckboxItem>
            </div>
        </div>
    );
}
