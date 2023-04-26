import React, { useState } from 'react';
import './CheckboxItem.scss';
export default function CheckboxItem({ toggleCloseMission, children }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleOpenTab = () => {
        setIsChecked(!isChecked);
        toggleCloseMission(!isChecked);
    };
    return (
        <div className="checkboxItem" onClick={handleOpenTab}>
            <div className={`checkboxItem__square ${isChecked && 'active'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.32685 17.3209L4.37685 12.4933C4.07946 12.2033 4.07946 11.733 4.37685 11.443L5.4538 10.3926C5.75119 10.1026 6.2334 10.1026 6.53078 10.3926L9.86534 13.6447L17.0076 6.67907C17.305 6.38904 17.7872 6.38904 18.0846 6.67907L19.1615 7.72942C19.4589 8.01946 19.4589 8.48971 19.1615 8.77978L10.4038 17.3209C10.1064 17.611 9.62424 17.611 9.32685 17.3209Z" fill="#FFFFFF" />
                </svg>
            </div>
            <div className={`label ${isChecked && 'active'}`}>{children}</div>
        </div>
    );
}
