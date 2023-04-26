import React from 'react'
import FileItem from '../../components/FileItem/FileItem'
import MainButton from '../../components/MainButton/MainButton'
import Redirect from '../../components/Redirect/Redirect'
import transferIcon from '../../assets/svg/transfer.svg'
import returnIcon from '../../assets/svg/return.svg'
import './Director.scss'
import TransferDocuments from './components/TransferDocuments'
import { useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import Checkbox from './components/Checkbox'
import tableHeaderIcon from '../../assets/svg/table_header_icon.svg'
import { documents } from './constants'
import useCheckbox from '../../hooks/useCheckbox'
import { useNavigate } from 'react-router-dom'
let data = [
    { id: 1, name: 'Ban giám đốc', path: '#' },
]


export default function Director() {
    const [popUpTransfer, setPopUpTransfer] = useState(false)
    const navigate = useNavigate()
    const { selectedValues, handleClickCheckAll, handleClickCheckbox, checkAll } = useCheckbox(documents)
    const [rect, setRect] = useState({
        top: 0,
        right: 0
    })
    const handleClickTransfer = (e) => {
        e.stopPropagation()
        setPopUpTransfer(true)
        const buttonRect = e.target.getBoundingClientRect()
        setRect({
            top: buttonRect?.top + buttonRect.height + 20,
            right: window.innerWidth - buttonRect?.right - 10
        })
    }
    const [queryConfig, setQueryConfig] = useState({
        limit: 5,
        search: '',
        page: 1,
    })

    return (
        <div className='director'>
            <div className="container-fluid">
                <Redirect data={data} />
                <div className="director__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                    <div className="director__main--docs">
                        <div className="title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                            Danh mục
                        </div>
                        <div className="wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                            <FileItem name="Công văn đến" num="23" isFile isCome route="/admin/director/document-come" prefix={false} />
                            <FileItem name="Công văn đi" num="23" isFile route="/admin/director/document-out" prefix={false} />
                        </div>
                    </div>
                    <div className="director__main--table">
                        <div className="headTable">
                            <div className="title" style={{ fontSize: '20px', fontWeight: 600 }}>
                                Công văn chưa được xử lý
                            </div>
                            <div className="button">
                                <MainButton className="mainButton bigger" icon={transferIcon} onClick={handleClickTransfer}>Chuyển xử lý</MainButton>
                                <MainButton className="mainButton small" icon={returnIcon}>Trả lại</MainButton>
                            </div>
                            {popUpTransfer && <TransferDocuments styleCustom={{ top: rect?.top, right: rect?.right }} setPopUpTransfer={setPopUpTransfer} />}

                        </div>
                        <div className="wrapper-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="5%" align='center'>
                                            <Checkbox handleClickCheckbox={handleClickCheckAll} selectedValues={selectedValues} checkAll={checkAll} />
                                        </th>
                                        <th width="15%" align='center'>
                                            <div>
                                                <span>Ngày đến</span>
                                                <img src={tableHeaderIcon} alt="" />
                                            </div>
                                        </th>
                                        <th width="60%">
                                            <div>
                                                <span>Thông tin công văn</span>
                                                <img src={tableHeaderIcon} alt="" />
                                            </div>
                                        </th>
                                        <th width="20%">
                                            <div>
                                                <span>Tác giả</span>
                                                <img src={tableHeaderIcon} alt="" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documents && documents.map(document => {
                                            return (<tr key={document.id}>
                                                <td>
                                                    <Checkbox value={document.id} handleClickCheckbox={handleClickCheckbox} selectedValues={selectedValues} />
                                                </td>
                                                <td>
                                                    <div> <span>{document.date}</span></div>
                                                </td>
                                                <td>
                                                    <div><span>{document.description}</span>  </div>

                                                </td>
                                                <td>
                                                    <div> <span>{document.author}</span></div>
                                                </td>
                                            </tr>)
                                        })
                                    }


                                </tbody>

                            </table>
                            {/* <Pagination /> */}
                            <div className="bottom-table">
                                <div className="bottom-table__displayInput">
                                    <span className="text">Hiển thị</span>
                                    <input type="number" className="inputDisplay" defaultValue={5} />
                                    <span className="text">trong tổng số 100 dữ liệu</span>
                                </div>
                                <Pagination pageSize={15} queryConfig={queryConfig} setQueryConfig={setQueryConfig} />
                            </div>
                        </div>

                    </div>

                </div>
            </div >
        </div >
    )
}
