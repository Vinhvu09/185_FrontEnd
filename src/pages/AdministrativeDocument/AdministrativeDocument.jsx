import React from 'react'
import AddBoxBorder from '../../components/AddBoxBorder/AddBoxBorder'
import FileItem from '../../components/FileItem/FileItem'
import Redirect from '../../components/Redirect/Redirect'
import "./AdministrativeDocument.scss"
let data = [
    { id: 1, name: 'P.Hành Chính - Tổng Hợp', path: '#' },
    { id: 2, name: 'Quản lý văn thư P.HCTH', path: '#' },
]
export default function AdministrativeDocument() {
    return (
        <div className='administrativeDocument'>
            <div className="container-fluid">
                <div className="administrativeDocument__head">
                    <Redirect data={data} />
                </div>
                <div className="administrativeDocument__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                    <div className="administrativeDocument__main--title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                        Danh mục
                    </div>
                    <div className="administrativeDocument__main--wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <FileItem name="Công văn đến" num="23" isFile isCome prefix={false} route="/admin/administrativeDocument/document-come" />
                        <FileItem name="Công văn đi" num="23" isFile prefix={false} route="/admin/administrativeDocument/document-out" />
                        <AddBoxBorder />
                    </div>
                </div>
            </div>
        </div>
    )
}
