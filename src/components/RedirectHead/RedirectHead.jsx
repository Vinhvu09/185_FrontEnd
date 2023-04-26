import React from 'react';
import MainButton from '../MainButton/MainButton';
import Redirect from '../Redirect/Redirect';
import './RedirectHead.scss';
export default function RedirectHead({ data, className, children, icon, ...rest }) {
    return (
        <div className='redirectHead'>
            <Redirect data={data} />
            <MainButton icon={icon} {...rest} className={className}>{children}</MainButton>
        </div>
    );
}
