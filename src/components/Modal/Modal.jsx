import React from 'react';
import ReactDOM from 'react-dom';
export default function Modal({ children, closePopup }) {
    return ReactDOM.createPortal(
        <div id="modal-wrapper" onClick={() => closePopup(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>,
        document.querySelector('body'),
    );
}
