import React from 'react'
import './FileItem.scss'
import file from '../../assets/svg/mainFile.svg'
import svgCome from '../../assets/svg/docsCome.svg'
import svgGo from '../../assets/svg/docsGo.svg'
import { useNavigate } from 'react-router-dom'
export default function FileItem({ name, num, isFile, isCome, route, prefix = true }) {
    const navigate = useNavigate()
    const handleClickFileItem = () => {
        if (route) {
            navigate(route)
        }
    }
    return (
        <div className='fileName' onClick={handleClickFileItem}>
            {isFile && (isCome ? <img src={svgCome} alt="icon" className='icon --come' /> : <img src={svgGo} alt="icon" className='icon --go' />)}
            <img src={file} alt="icon" />
            <div className="wrapper">
                <div className="name">{prefix ? "Thư mục" : ""} {name}</div>
                <div className="num">{num} mục</div>
            </div>
        </div>
    )
}
