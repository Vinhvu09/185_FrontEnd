import React from 'react'
import { useEffect } from 'react'
import AddBoxBorder from '../../components/AddBoxBorder/AddBoxBorder'
import FileItem from '../../components/FileItem/FileItem'
import Redirect from '../../components/Redirect/Redirect'
import "./Document.scss"
let data = [
    { id: 1, name: 'P. Lập hồ sơ di tích', path: '#' },
    { id: 2, name: 'Quản lý văn thư P.LHSDT', path: '#' },
]
export default function Document() {

    return (
        <div className='document'>
            <div className="container-fluid">
                <div className="document__head">
                    <Redirect data={data} />
                </div>
                <div className="document__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                    <div className="document__main--title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                        Danh mục
                    </div>
                    <div className="document__main--wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <FileItem name="Công văn đến" num="23" isFile isCome prefix={false} route="/admin/document/document-come" />
                        <FileItem name="Công văn đi" num="23" isFile prefix={false} route="/admin/document/document-out" />
                        <AddBoxBorder />
                    </div>
                </div>
            </div>
        </div>
    )
}