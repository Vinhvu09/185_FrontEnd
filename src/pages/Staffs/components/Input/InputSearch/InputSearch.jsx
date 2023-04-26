import React from 'react';
import arrowIcon from '../../../../../assets/svg/arrow_down.svg';
import './InputSearch.scss';
export default function InputSearch({ icon = arrowIcon, type = 'text', placeHolder, label }) {
    return (
        <div className='inputSearch'>
            {label &&
                <div className="inputSearch__label">
                    {label}
                </div>
            }
            <div className="inputSearch__input">
                <input type={type} placeholder={placeHolder} />
                {icon && <img src={icon} alt="icon" />}
            </div>
        </div>
    );
}
