import React from 'react'
import './MainButton.scss'
export default function MainButton({ icon, children, component, ...rest }) {

    return (
        <div {...rest}>
            {icon && <img src={icon} alt="svg_icon" />}
            {component &&
                <div className="component">
                    {component}
                </div>
            }
            <div className='mainButton__wrapper'>{children}</div>
        </div>
    )
}
