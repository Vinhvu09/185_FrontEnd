import React, { useEffect, useRef, useState } from 'react'
import MainButton from '../../components/MainButton/MainButton'
import Redirect from '../../components/Redirect/Redirect'
import SearchBasic from '../../components/SearchBasic/SearchBasic'
import add from '../../assets/svg/add.svg'
import './AdministrativeProfile.scss'
import FileItem from '../../components/FileItem/FileItem'
import PopupCreateFile from '../../components/PopupCreateFile/PopupCreateFile'
import Swal from 'sweetalert2'
let data = [
    { id: 1, name: 'P. Hành chính - Tổng Hợp', path: '/admin/administrativeDocument' },
    { id: 2, name: 'Quản lý hồ sơ P. HC-TH', path: '/admin/administrativeProfile' },
]


export default function AdministrativeProfile() {
    const [isPopup, setIsPopup] = useState(false)
    const [filter, setFilter] = useState('')
    const [dataFilesAdmin, setDataFilesAdmin] = useState(
        [
            { name: 'A', num: 0 },
            { name: 'B', num: 0 },
            { name: 'C', num: 0 },
            { name: 'D', num: 0 },
        ]
    )
    const [dataFilter, setDataFilter] = useState([])
    const handleOpenPopup = (e) => {
        setIsPopup(true)
    }
    useEffect(() => {

        let data = dataFilesAdmin.filter(e => {
            return e.name.toLowerCase().includes(filter.toLowerCase())
        })
        setDataFilter(data)

    }, [filter, dataFilesAdmin])
    return (
        <div className='administrativeProfile'>
            {isPopup && <PopupCreateFile dataFilesAdmin={dataFilesAdmin} setDataFilesAdmin={setDataFilesAdmin} setIsPopup={setIsPopup} recognize="administrative" />}
            <div className="container-fluid">
                <div className="administrativeProfile__head">
                    <Redirect data={data} />
                </div>
                <div className="administrativeProfile__search">
                    <SearchBasic setFilterAdmin={setFilter} />
                    <MainButton icon={add} className="mainButton" onClick={handleOpenPopup}>Thêm thư mục</MainButton>
                </div>
                <div className="administrativeProfile__main">
                    <div className="wrapper">
                        {
                            dataFilter?.map((e, index) => <FileItem name={e.name} num={e.num} key={index} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
