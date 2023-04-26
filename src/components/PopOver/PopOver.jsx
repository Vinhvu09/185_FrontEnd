import React, { Fragment } from 'react';
import './PopOver.scss';
import checkIcon from '../../assets/svg/checkedWhite.svg';
export default function PopOver({ list, isType, setData, data, ...rest }) {
    return (
        <div className={`popOver ${isType && isType}`} {...rest}>
            {list?.map((e, index) => {
                let isActive = data?.some(item => item === e);
                return (
                    <div className='popOver__wrapper' key={index} onClick={() => {
                        setData(prev => {
                            let cloneData = [...prev];
                            let findIndex = cloneData.indexOf(e);
                            if (findIndex < 0) {
                                cloneData.push(e);
                            } else {
                                cloneData.splice(findIndex, 1);
                            }
                            return cloneData;
                        });
                    }}>
                        <div className="popOver__wrapper--left">
                            {e.avatar && <img src={e.avatar} alt="avatar" />}
                            <p>{e.name}</p>
                        </div>
                        <div className={`popOver__wrapper--right ${isActive && 'active'}`} >
                            <div className="checkBox"></div>
                            <img src={checkIcon} alt="" />
                        </div>
                    </div>
                );
            })}

        </div>
    );
}
