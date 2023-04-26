import React, { useEffect, useState } from 'react';
import arrow from '../../assets/svg/arrow_down.svg';
import './Options.scss';
export default function Options({ options, setOptionsFilter, optionsFilter, districtEdit, setDistrictCreate, resultCreate }) {
    // console.log(filter);
    const [isShow, setIsShow] = useState(false);
    const [text, setText] = useState('Chọn quận');
    useEffect(() => {
        let data = options?.filter(district => district.value === districtEdit);
        if (data.length > 0) {
            data.forEach(e => setText(e.district));
        }
    }, [districtEdit]);
    const handleShow = (e) => {
        e.stopPropagation();
        setIsShow(!isShow);
    };
    const handleText = (text, data) => {
        setText(text);
        if (setOptionsFilter) {
            if (data === 'd0') {
                delete optionsFilter.district;
                setOptionsFilter({
                    ...optionsFilter,
                });
            } else {
                setOptionsFilter({
                    ...optionsFilter,
                    district: data,
                });
            }

        }
        if (setDistrictCreate) {
            setDistrictCreate({
                ...resultCreate,
                district: data
            });
        }
    };
    useEffect(() => {
        window.addEventListener('click', () => {
            setIsShow(false);
        });
        return () => {
            window.removeEventListener('click', () => {
                setIsShow(false);
            });
        };
    }, []);
    return (
        <div className='options' onClick={handleShow}>
            <div className="main" >
                <span>{text}</span>
                <img src={arrow} alt="svg_icon" />
            </div>
            <div className={`sub ${isShow ? 'show' : ''}`}>
                <ul>
                    {options?.map(e => {
                        return <li onClick={() => handleText(e.district, e.value)} key={e.id}>{e.district} {e.note ? `(${e.note})` : ''}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}
