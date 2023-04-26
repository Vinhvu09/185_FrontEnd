import React, { forwardRef, useEffect, useRef, useState } from 'react'
import cancel from '../../assets/svg/cancel.svg'
// import delete from '../../assets/svg/delete.svg';
import deleteIcon from '../../assets/svg/delete.svg'
import './StatusLoading.scss'

export default function StatusLoading({ icon, name, size, kind, handleDelete, id, knowAs }) {
    let speed = 1
    let percent = speed / Number(size) * 100
    let addPercent = percent / 10
    let interval = useRef()
    const [status, setStatus] = useState(percent)
    useEffect(() => {
        if (status < 100) {
            const timeId = setInterval(() => {
                setStatus(prevState => prevState += addPercent)
            }, 100)
            interval.current = timeId
        } else {
            clearInterval(interval.current)

        }
        return () => {
            clearInterval(interval.current)
        }

    }, [status])
    return (
        <div className="statusLoading">
            <div className="left">
                <img src={icon} alt="" />
            </div>
            <div className={`center ${status > 100 ? 'active' : ''}`}>
                <div className="head">
                    <div className="name">{name}</div>
                    {status < 100 &&
                        <div className="percent">
                            {status > 100 ? '100' : status.toFixed()}%
                        </div>
                    }
                </div>
                {status < 100 &&
                    <div className="line">
                        <div className="lineOverlay" style={{ width: `${status.toFixed()}%` }}></div>
                    </div>
                }

            </div>
            <div className="right" onClick={() => handleDelete(kind, id, knowAs)}>
                <img src={deleteIcon} alt="svg_icon" />
            </div>
        </div>
    )
}

