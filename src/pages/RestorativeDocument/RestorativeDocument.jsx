import React from 'react'
import AddBoxBorder from '../../components/AddBoxBorder/AddBoxBorder'
import FileItem from '../../components/FileItem/FileItem'
import Redirect from '../../components/Redirect/Redirect'
import "./RestorativeDocument.scss"
let data = [
    { id: 1, name: 'P.Tu bổ di tích', path: '#' },
    { id: 2, name: 'Quản lý văn thư P.TBDT', path: '#' },
]
export default function RestorativeDocument() {
    return (
        <div className='restorativeDocument'>
            <div className="container-fluid">
                <div className="restorativeDocument__head">
                    <Redirect data={data} />
                </div>
                <div className="restorativeDocument__main" style={{ padding: '24px 40px', marginTop: '26px', boxShadow: "0px 6px 12px rgba(28, 73, 143, 0.08)", borderRadius: '6px' }}>
                    <div className="restorativeDocument__main--title" style={{ fontSize: '20px', marginBottom: '32px', fontWeight: 600 }}>
                        Danh mục
                    </div>
                    <div className="restorativeDocument__main--wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <FileItem name="Công văn đến" num="23" isFile isCome route="/admin/restorativeDocument/document-come" prefix={false} />
                        <FileItem name="Công văn đi" num="23" isFile route="/admin/restorativeDocument/document-out" prefix={false} />
                        <AddBoxBorder />
                    </div>
                </div>
            </div>
        </div>
    )
}
