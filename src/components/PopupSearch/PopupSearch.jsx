import React from 'react';
import InputSearch from '../../pages/Staffs/components/Input/InputSearch/InputSearch';
import MainButton from '../MainButton/MainButton';
import './PopupSearch.scss';
export default function PopupSearch({ closePopup, openList }) {
    return (
        <div className="popupSearch">
            <div className="popupSearch__title">
                Tìm kiếm nâng cao
            </div>
            <div className="popupSearch__wrapper">
                <InputSearch label="Số ký hiệu" placeHolder="Nhập số ký hiệu" />
                <InputSearch label="Người xử lý" placeHolder="Nhập tên người xử lý" />
                <InputSearch label="Tên văn bản" placeHolder="Nhập tên văn bản" />
                <InputSearch label="Lĩnh vực" placeHolder="Nhập lĩnh vực" />
                <InputSearch label="Từ ngày" type='date' icon="" />
                <InputSearch label="Đến ngày" type='date' icon="" />
                <InputSearch label="Người soạn" placeHolder="Nhập tên người soạn" />
                <InputSearch label="Người ký" placeHolder="Người ký văn bản" />
            </div>
            <div className="searchAdvanced__button">
                <MainButton onClick={() => closePopup(false)} className="mainButton white">
                    Quay lại
                </MainButton>
                <MainButton onClick={() => openList(true)} className="mainButton">
                    Tìm kiếm
                </MainButton>
            </div>
        </div>
    );
}
