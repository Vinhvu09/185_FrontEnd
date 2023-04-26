import React from 'react'
import { Link } from 'react-router-dom'
import redirect_arrow from '../../assets/svg/redirect-arrow.svg'
import './Redirect.scss'
export default function Redirect({ data }) {
    return (
        <div className='redirect'>
            {data.map(e => {
                if (e) {
                    if (Number(e.id) === data.length) {
                        return (
                            <div className='redirect__wrapper' key={e.id}>
                                {e.path ? <Link to={e.path} className="theLast">
                                    <p>{e.name}</p>
                                </Link> : <div className='link'> <p className="theLast">{e.name}</p></div>}
                            </div>
                        )
                    } else
                        return (
                            <div className='redirect__wrapper' key={e.id}>
                                {e.path ? <Link to={e.path}>
                                    <p>{e.name}</p>
                                    <img src={redirect_arrow} alt="svg" />
                                </Link> : <div className='link'>
                                    <p>{e.name}</p>
                                    <img src={redirect_arrow} alt="svg" />
                                </div>}
                            </div>
                        )
                }

            })}
        </div>
    )
}
