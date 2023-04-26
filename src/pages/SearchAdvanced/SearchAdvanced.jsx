import React, { useState } from 'react';
import MainButton from '../../components/MainButton/MainButton';
import Redirect from '../../components/Redirect/Redirect';
import searchIcon from '../../assets/svg/search.svg';
import './SearchAdvanced.scss';
import InputSearch from '../Staffs/components/Input/InputSearch/InputSearch';
import Modal from '../../components/Modal/Modal';

import returnIcon from '../../assets/svg/return.svg';
import dispatchIcon from '../../assets/svg/back&go.svg';
import doubleArrow from '../../assets/svg/doubleArrow.svg';

import closeIcon from '../../assets/svg/close.svg';
import tableArrow from '../../assets/svg/tableArrow.svg';
import arrowDown from '../../assets/svg/arrow_down.svg';
let data = [
    { id: 1, name: 'Ban giám đốc', path: '/admin/director' },
    { id: 2, name: 'Công văn đi', path: '/admin/director/document-come' },
    { id: 3, name: 'Tìm kiếm nâng cao', path: '#' },
];


const table = [
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2767/BC-SVHTT',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
    {
        id: Math.random() * Math.random(),
        isChecked: false,
        signalNum: '2622/C',
        date: '29/08/2022',
        personCompose: 'Nguyen Van A',
        personSign: 'Nguyen Van A',
        info: 'Số 1022/UBND-VHTT ngày 30/06/2022 Trích yếu ý kiến đối với dự thảo danh sách đề xuất'
    },
];

export default function SearchAdvanced() {
    const [tableData, setTableData] = useState(table);
    const [isPopup, setIsPopup] = useState(false);
    return (
        <div className='searchAdvanced'>
            {isPopup &&
                <Modal closePopup={setIsPopup}>
                    <div className="searchAdvanced__popup">
                        <div className="searchAdvanced__popup--close">
                            <img src={closeIcon} alt="svg" onClick={() => setIsPopup(false)} />
                        </div>
                        <div className="searchAdvanced__popup--button">
                            <MainButton icon={dispatchIcon} className="mainButton">Chuyển xử lý</MainButton>
                            <MainButton className="mainButton bigger">Dự thảo văn bản trả lời</MainButton>
                            <MainButton icon={returnIcon} className="mainButton">Trả lại</MainButton>
                        </div>
                        <table className="searchAdvanced__popup--table">
                            <thead>
                                <th>
                                    <div className="thWrapper">
                                        <input type="checkbox" />
                                    </div>
                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Số kí hiệu
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Ngày PH
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Người soạn
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Người ký
                                        <img src={tableArrow} alt="" />
                                    </div>

                                </th>
                                <th>
                                    <div className="thWrapper">
                                        Thông tin công văn
                                        <img src={tableArrow} alt="" />
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {tableData.map((e, index) => {
                                    return (
                                        <tr e={e.id}>
                                            <td>
                                                <input type="checkbox" defaultChecked={e.isChecked} onChange={(event) => {
                                                    const value = event.target.checked;
                                                    setTableData(prev => {
                                                        const data = prev;
                                                        data[index].isChecked = value;
                                                        return data;
                                                    });
                                                }} />
                                            </td>
                                            <td>
                                                {e.signalNum}
                                            </td>
                                            <td>
                                                {e.date}
                                            </td>
                                            <td>
                                                {e.personSign}
                                            </td>
                                            <td>
                                                {e.personCompose}
                                            </td>
                                            <td>
                                                {e.info}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                        <div className="searchAdvanced__popup--paginate">
                            <div className="left">
                                <p>Hiển thị</p>
                                <div className="inputGroup">
                                    <input type="number" defaultValue={6} />
                                    <img src={arrowDown} alt="svg" />
                                </div>
                                <p>trong tổng số 100 dữ liệu</p>
                            </div>
                            <div className="right">
                                <img src={doubleArrow} alt="svg" />
                                <img src={arrowDown} alt="svg" style={{ margin: '0 14px', transform: 'rotate(90deg)' }} />
                                <p className='active'>1</p>
                                <p>2</p>
                                <p>...</p>
                                <p>15</p>
                                <img src={arrowDown} alt="svg" style={{ margin: '0 14px', transform: 'rotate(-90deg)' }} />
                                <img src={doubleArrow} alt="svg" style={{ transform: 'rotate(180deg)' }} />

                            </div>
                        </div>
                    </div>
                </Modal>
            }

            <div className="container-fluid">
                <div className="searchAdvanced__head">
                    <Redirect data={data} />
                    <MainButton className="mainButton bigger" style={{ display: 'flex', width: '250px' }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17L13.2223 13.2156M15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789Z" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        Tìm kiếm nâng cao
                    </MainButton>
                </div>
                <div className="searchAdvanced__content">
                    <h3>Tìm kiếm nâng cao</h3>
                    <div className="searchAdvanced__content--wrapper">
                        <InputSearch label="Nhập loại số" placeHolder="Loại số" />
                        <InputSearch label="Người ký" placeHolder="Nhập tên người ký" />
                        <InputSearch label="Đơn vị soạn" placeHolder="Nhập đơn vị soạn" />
                        <InputSearch label="Người xử lý" placeHolder="Nhập tên người xử lý" />
                        <InputSearch label="Người soạn" placeHolder="Nhập tên người soạn" />
                        <div className="dateGroup">
                            <InputSearch label="Từ ngày" type='date' icon="" />
                            <InputSearch label="Đến ngày" type='date' icon="" />
                        </div>
                        <InputSearch label="Số ký hiệu" placeHolder="Nhập số ký hiệu" />
                        <InputSearch label="Lĩnh vực" placeHolder="Nhập lĩnh vực" />
                        <InputSearch label="Tên loại văn bản" placeHolder="Nhập tên loại văn bản" />
                        <InputSearch label="Trích yếu" placeHolder="Nhập từ khoá tìm kiếm" />
                    </div>
                    <div className="searchAdvanced__button">
                        <MainButton className="mainButton white">
                            Xuất file
                        </MainButton>
                        <MainButton onClick={() => setIsPopup(true)} className="mainButton">
                            Tìm kiếm
                        </MainButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
