import React, { useRef, useState } from 'react';
import MainButton from '../MainButton/MainButton';
import './PopupCreateFile.scss';
import close from '../../assets/svg/close.svg';
import Swal from 'sweetalert2';
export default function PopupCreateFile({ setIsPopup, recognize, setDataFilesAdmin, dataFilesAdmin, dataFilesResto, setDataFilesResto, index }) {
    let inputRef = useRef();
    const [error, setError] = useState('');
    const handlePopupClose = () => {
        setIsPopup(false);
    };
    const handlePopupWrapper = (e) => {
        e.stopPropagation();
    };
    const handleCreate = () => {
        let value = inputRef.current.value;
        if (value) {
            if (recognize === 'administrative') {
                let checked = dataFilesAdmin.some(e => e.name.toLowerCase().includes(value.toLowerCase()));
                if (!checked) {
                    setDataFilesAdmin([...dataFilesAdmin, { name: value, num: 0 }]);
                    Swal.fire({
                        icon: 'success',
                        text: 'Tạo thư mục thành công!',
                        heightAuto: false,
                        customClass: {
                            popup: 'swalHeightCreateFile',
                        },
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsPopup(false);
                } else {
                    setError('Tên thư mục đã tồn tại!');
                }
            }
            if (recognize === 'restorative') {
                console.log('click');
                let checked = dataFilesResto[index].data.some(e => e.name.toLowerCase().includes(value.toLowerCase()));
                if (!checked) {
                    dataFilesResto[index].data = [...dataFilesResto[index].data, { name: value, num: 0 }];
                    setDataFilesResto([...dataFilesResto]);
                    Swal.fire({
                        icon: 'success',
                        text: 'Tạo thư mục thành công!',
                        heightAuto: false,
                        customClass: {
                            popup: 'swalHeightCreateFile',
                        },
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsPopup(false);
                } else {
                    setError('Tên thư mục đã tồn tại!');
                }
            }
        } else {
            setError('Trường này là bắt buộc!');
        }
    };
    return (
        <div className='popupCreateFile' onClick={handlePopupClose}>
            <div className="popupCreateFile__wrapper" onClick={handlePopupWrapper}>
                <label>
                    <div className="label">Tên thư mục</div>
                    <input type="text" ref={inputRef} />
                    <p>{error}</p>
                </label>

                <div className="popupCreateFile__wrapper--button">
                    <MainButton className="mainButton" onClick={handleCreate}>Tạo</MainButton>
                </div>
                <img src={close} alt="close_icon" onClick={handlePopupClose} />
            </div>
        </div>
    );
}
