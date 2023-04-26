import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationItem.scss';
export default function NotificationItem({ icon, name, time, mainColor, notRead, svg, closePopup }) {
    const navigate = useNavigate();
    return (
        <div className={`notificationItem ${notRead && 'notRead'}`} style={{ '--mainColor': mainColor }} onClick={() => {
            navigate("/admin/notificationDetail");
            closePopup(false);
        }}>
            {icon &&
                <div className="notificationItem__icon" >
                    <img src={icon} alt="icon" />
                </div>
            }
            {svg &&
                <div className="notificationItem__icon" >
                    {svg}
                </div>
            }
            <div className="notificationItem__content">
                <div className="name">{name}</div>
                <div className="time">{time}</div>
            </div>
            <div className="circle"></div>
        </div>
    );
}
