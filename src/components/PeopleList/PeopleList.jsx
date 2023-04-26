import React from 'react';
import './PeopleList.scss';
import add from '../../assets/svg/add_user_schedule.svg';
import dot from '../../assets/svg/more_full.svg';
export default function PeopleList({ list, ...rest }) {
    return (
        <div className='peopleList' {...rest}>
            <div className="peopleList__wrapper">
                <div className="img">
                    <img src={add} alt="add_svg" />
                </div>
                {list?.map((e, index) => {
                    return <div key={index} className="item" style={{ right: (index + 1) * 20 + '%', zIndex: list.length - index }}>
                        <img src={e.avatar} alt="avatar" />
                    </div>;
                })}
            </div>

        </div>
    );
}
