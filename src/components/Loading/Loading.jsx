import React from 'react';
import './Loading.scss';
export default function Loading() {
    return (
        <div className="loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
